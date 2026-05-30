import asyncHandler from "../middlewares/AsyncHandler";
import { CookieOptions, Request, Response } from "express";
import { Router } from "express";
import {
  dbUserCheckV2,
  dbUserDelete,
  validate,
} from "../middlewares/Validator";
import {
  idValidater,
  addUserValidator,
  editUserValidator,
  roleValidater,
  loginValidator,
  roleParamsValidater,
  roleWithQParamsValidater,
  forgotPasswordValidator,
} from "../validators";
import config from "../config";
import { IBaseUser, User, Farmer, DeliveryBoy } from "../models";
import { Role, RoleEnum } from "../types";
import bcrypt from "bcrypt";
import { BadRequest } from "../customErrors";
import {
  generateJwtToken,
  getModelByRole,
  getUserByRole,
  removeFile,
  uploadLocal,
} from "../constants/lib";
import CONFIG from "../config";
import { Model } from "mongoose";
import { ObjectId } from "mongodb";
import Excel from "exceljs";

const router = Router();

type AddUser = IBaseUser & {
  role: Role;
  category?: string;
  child?: string;
};

type ParamsWithId = {
  id: string;
};

type UserFilter = {
  role: Role;
  name?: string;
  email?: string;
  limit: string;
  password?: string;
  child?: string;
  page: string;
};

type BulkUser = {
  name: string;
  email: string;
  password: string;
};

type ChangePassword = {
  newPassword: string;
  role: Role;
};

type UserFilterDropdown = {
  q: string;
  role: Role;
};

router.get(
  "/me",
  asyncHandler(async (req: Request, res: Response) => {
    const { _id: userId, role } = req.user;

    const model = getModelByRole(role);

    if (!model) {
      throw new BadRequest("Invalid role");
    }

    const user = await model.findById(userId, {
      name: 1,
      email: 1,
      role: 1,
      createdAt: 1,
      updatedAt: 1,
      address:1,
      mobileNumber:1
    });
    

    if (!user) {
      throw new BadRequest(`User with id ${userId} not found`);
    }

    res.json(user);
  
    
  })
);

router.get(
  "/",
  validate(roleParamsValidater),
  asyncHandler(async (req: Request, res: Response) => {
    const { role, name, email } = req.query as unknown as UserFilter;

    let filterQuery: any = {};

    if (name) {
      filterQuery.name = { $regex: name, $options: "i" };
    }

    if (email) {
      filterQuery.email = { $regex: email, $options: "i" };
    }

    const modelToUse = getModelByRole(role);

    if (!modelToUse) {
      throw new BadRequest("Invalid role");
    }

    const users = await modelToUse.aggregate([
      { $match: filterQuery },
      { $sort: { createdAt: -1 } }, // Sorting in descending order
      {
        $lookup: {
          from: "subjects",
          localField: "assignedSubject",
          foreignField: "_id",
          as: "assignedSubject",
        },
      },
      {
        $lookup: {
          from: "teachers",
          localField: "assignedTeacher",
          foreignField: "_id",
          as: "assignedTeacher",
        },
      },  
      {
        $project: { password: 0 } // 🔴 Excludes the password field from the response
      }
    ]);

    res.json({
      data: users,
      total: users.length, // Return total number of records
    });

    console.log(users, "Fetched all user data");
  })
);


// get / filter users
router.get(
  "/dropdown",
  validate(roleWithQParamsValidater),
  asyncHandler(async (req: Request, res: Response) => {
    const { q, role } = req.query as UserFilterDropdown;

    let toQuery = {};

    if (q) {
      toQuery = {
        ...toQuery,
        name: {
          $regex: q,
          $options: "i",
        },
        email: {
          $regex: q,
          $options: "i",
        },
      };
    }

    const modelToUse = getModelByRole(role);

    if (!modelToUse) {
      throw new BadRequest("Invalid role");
    }

    const users = await modelToUse.aggregate([
      { $match: toQuery },
      { $sort: { createdAt: -1 } },
      { $project: { _id: 1, name: 1 } },
    ]);

    res.json(users);
  })
);

// login route
router.post(
  "/login",
  validate(loginValidator),
  asyncHandler(async (req: Request, res: Response) => {
    const { email, password, role } = req.body as AddUser;

    const user: any = await getUserByRole(role, { email });

    if (!user) {
      throw new BadRequest(`No ${role} found with email ${email}`);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new BadRequest("Invalid password");
    }

    const token = generateJwtToken(user as IBaseUser, role);

    res.cookie("token", token, CONFIG.COOKIE_SETTINGS as CookieOptions);

    const toSendUser = {
      name: user.name,
      email: user.email,
      _id: user._id,
      role: role,
      subjectId: user.assignSubject,
    };

    res.json({ msg: "Logged in successfully", user: toSendUser });
  })
);

// login route
router.post(
  "/change-password",
  validate(forgotPasswordValidator),
  asyncHandler(async (req: Request, res: Response) => {
    const { newPassword, role } = req.body as ChangePassword;
    const { email } = req.user;

    const user = await getUserByRole(role, { email });

    if (!user) {
      throw new BadRequest(`No ${role} found with email ${email}`);
    }

    const isMatch = await bcrypt.compare(newPassword, user.password);

    if (isMatch) {
      throw new BadRequest(
        "New password cannot be the same as the old password"
      );
    }

    const password = await bcrypt.hash(newPassword, config.SALT_ROUNDS);

    await user.updateOne({ password });

    res.json({ msg: "Password changed successfully" });
  })
);

// add route
router.post(
  "/bulk",
  uploadLocal.single("file"),
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const file = req.file;

      if (!file) throw new BadRequest("No file uploaded");

      const workbook = new Excel.Workbook();
      const fileType = file.originalname.split(".")[1];

      if (fileType === "csv") {
        await workbook.csv.readFile(file.path);
      } else if (fileType === "xls" || fileType === "xlsx") {
        await workbook.xlsx.readFile(file.path);
      } else {
        throw new BadRequest("Invalid file type must be xlsx, xls or csv");
      }

      const worksheet = workbook.getWorksheet(1);

      if (!worksheet) throw new BadRequest("No worksheet found");

      const cols = [
        "name",
        "email",
        "password",
        "mobileNumber",
        "role",
        "address",
      ];

      const user: BulkUser[] = [];

      const providers = await Farmer.find({}, { _id: 1, name: 1 });

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return;

        const user = {} as BulkUser;

        row.eachCell((cell, colNumber) => {
          const keyName = cols[colNumber - 1] as keyof BulkUser;
          const value = cell.value as string;

          if (keyName === "password") {
            user[keyName] = bcrypt.hashSync(value, config.SALT_ROUNDS);
            return;
          }
        });
      });
      res.json({ msg: "Bulk upload completed successfully" });
      await removeFile(req.file);
    } catch (error) {
      console.log(error);
      await removeFile(req.file);
      throw error;
    }
  })
);

router.post(
  "/",
  uploadLocal.single("file"),
  validate(addUserValidator),
  dbUserCheckV2(true),
  asyncHandler(async (req: Request, res: Response) => {
    const { name, email, role, mobileNumber, address } = req.body;
      req.body as AddUser;

    let { password } = req.body as AddUser;
    let msg = "";

    password = await bcrypt.hash(password, config.SALT_ROUNDS);
    msg+=`${role}`
    switch (role) {
      case RoleEnum.DELIVERY:
        await DeliveryBoy.create({ name, email, password,role, mobileNumber, address });
        msg = "DeliveryBoy created successfully";
        break;
      case RoleEnum.FARMER:
        await Farmer.create({ name, email, password,role,address,mobileNumber});
        msg = "Farmer created successfully";
        break;
      case RoleEnum.USER:
        await User.create({ name, email, password, role, address, mobileNumber });
        msg = "User created successfully ";
        break;
      default:
        throw new BadRequest("Invalid role");
    }

    res.json({ msg });
  })
);

router.put(
  "/:id",
  validate(idValidater),
  validate(editUserValidator),
  dbUserCheckV2(),
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as ParamsWithId;
    let { name, email, password,role, mobileNumber, address } = req.body;

    if (password) {
      password = await bcrypt.hash(password, config.SALT_ROUNDS);
      req.body.password = password;
    }

    switch (role) {
      case RoleEnum.DELIVERY:
        await DeliveryBoy.findByIdAndUpdate(id, { ...req.body });
        break;
      case RoleEnum.FARMER:
        await User.findByIdAndUpdate(id, { ...req.body });
        break;
      case RoleEnum.USER:
        await User.findByIdAndUpdate(id, { ...req.body });
        break;
      default:
        throw new BadRequest("Invalid role");
    }

    res.json({ msg: "User updated successfully" });
  })
);

// delete route
router.delete(
  "/:id",
  validate(idValidater),
  validate(roleParamsValidater),
  dbUserDelete(true),
  asyncHandler(async (_: Request, res: Response) => {
    res.json({ msg: "User deleted successfully" });
  })
);





export default router;
