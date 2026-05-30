# 🌾 Farmer-Customer E-commerce Platform

A MERN-based full-stack web application that simplifies agricultural commerce by connecting **Farmers**, **Delivery Partners**, and **Customers** through a unified and intelligent digital platform.

## 🎥 Project Demo
👉 [Click here to watch the Execution Demo](https://youtu.be/SIFXMVjeBPc)

## 📌 About the Project

In traditional Agri-commerce, farmers rely heavily on intermediaries to sell their produce, which reduces profits and limits transparency. This platform eliminates intermediaries by providing a direct digital connection between all stakeholders.

The system integrates a **CNN (Convolutional Neural Network)** model that automatically recognizes and labels product images uploaded by farmers, reducing manual effort and improving accuracy.

## 🚀 Key Features

### 👨‍🌾 Farmer Module
- Register and Login securely
- Upload product images with price and quantity
- CNN model auto-labels uploaded products
- Assign delivery partners to orders
- View transaction history and earnings

### 🛒 Customer Module
- Register and Login
- Browse categorized products
- Add to cart and place orders via dummy payment gateway
- Track orders in real-time
- View order history

### 🚚 Delivery Partner Module
- Register and Login
- View assigned orders
- Update delivery status: Picked Up → Shipped → In Transit → Out for Delivery → Delivered
- Real-time status reflected to customers

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, HTML, CSS, Bootstrap, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| AI Model | CNN (Convolutional Neural Network) |
| IDE | Visual Studio Code |

## ⚙️ System Requirements

### Software
- Node.js and npm
- MongoDB
- VS Code

### Hardware Minimum
- RAM: 4GB
- Processor: Intel i3 or equivalent
- Hard Disk: 160GB

## 📁 Project Structure

```
Farmer-Customer-E-commerce-Platform/
│
├── F2CFrontend/     → React.js Frontend Source Code
├── F2CBackend/      → Node.js + Express.js Backend Source Code
└── README.md
```

## 🔧 How to Run the Project

### Clone the Repository
```
git clone https://github.com/SaiGayathri-5/Farmer-Customer-E-commerce-Platform.git
cd Farmer-Customer-E-commerce-Platform
```

### Run the Backend
```
cd F2CBackend/BACKEND
npm install
npm start
```

### Run the Frontend
```
cd F2CFrontend/FRONTEND
npm install
npm start
```

### Open in Browser
```
http://localhost:3000
```

## 🤖 CNN Model
The CNN model file is too large for GitHub. Download it here:
👉 [Download CNN Model from Google Drive](PASTE_YOUR_GOOGLE_DRIVE_LINK_HERE)

Place the downloaded file here after cloning:
```
F2CBackend/BACKEND/python-predictor/model/fruit_veg_classifier_model.h5
```

## 🔮 Future Enhancements

- Real Payment Gateway Integration
- Mobile Application for Android and iOS
- Multi-Language Support
- GPS-Based Live Delivery Tracking
- Blockchain for Transaction Transparency
- Advanced Analytics Dashboard
- AI-Based Dynamic Pricing for Farmers
- Automated Alerts for Stock and Delivery Updates

## 💡 Problem Statement

Traditional Agri-commerce models have no direct digital platform for farmers, no real-time tracking, manual product entry, fragmented communication, and dependency on intermediaries. This platform solves all of these problems.

⭐ If you find this project useful, please give it a star! ⭐
