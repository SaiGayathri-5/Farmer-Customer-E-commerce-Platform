import { Router, Request, Response } from "express";
import asyncHandler from "../middlewares/AsyncHandler";
import { Product } from "../models/product.model";
import { BadRequest } from "../customErrors";
import { uploadFile, uploadLocal } from "../constants/lib";

const router = Router();

// 🔍 Get All Products (Admin or Customer)
router.get(
  "/",
  asyncHandler(async (_req: Request, res: Response) => {
    const products = await Product.find();
    res.json(products);
  })
);

// 🔍 Get Products by Farmer
router.get(
  "/:userId",
  asyncHandler(async (req: Request, res: Response) => {
    const farmerId = req.params.userId;
    if (!farmerId) throw new BadRequest("Farmer ID is required");

    const products = await Product.find({ farmerId });
    res.json(products);
  })
);

// ➕ Add New Product
router.post(
  "/",
  uploadLocal.single('image'), // 👈 Middleware to handle 'image' file field
  asyncHandler(async (req: Request, res: Response) => {
    const { name, description, price, quantity, category, farmerId } = req.body;

    if (!name || !description || !price || !quantity || !category || !farmerId || !req.file) {
      throw new BadRequest("All fields are required");
    }

    const image = req.file.filename; // 👈 Get the uploaded file's name

    const newProduct = await Product.create({
      name,
      description,
      price,
      quantity,
      category,
      farmerId,
      image,
    });

    res.status(201).json({ msg: "Product created", product: newProduct });
  })
);
// ✏️ Update Product
router.put(
  "/update",
  uploadLocal.single('image'), // 👈 Multer middleware
  asyncHandler(async (req: Request, res: Response) => {
    const { id, name, description, price, quantity, category } = req.body;

    if (!id || !name || !description || !price || !quantity || !category) {
      throw new BadRequest("Missing required fields");
    }

    const updateFields: any = {
      name,
      description,
      price,
      quantity,
      category,
    };

    // If a new image is uploaded, include it in the update
    if (req.file) {
      updateFields.image = req.file.filename;
    }

    const updated = await Product.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updated) throw new BadRequest("Product not found");

    res.json({ msg: "Product updated", product: updated });
  })
);


// ❌ Delete Product
router.delete(
  "/remove",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.body;

    if (!id) throw new BadRequest("Product ID is required");

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) ("Product not found");

    res.json({ msg: "Product removed", product: deleted });
  })
);

export default router;
