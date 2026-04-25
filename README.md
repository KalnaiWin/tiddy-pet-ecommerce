# 🏪🐶🐱 Tiddy Pet Shop (MERN Stack + Stripe)
A MERN stack pet e-commerce platform with role-based access (Admin, Shipper, Customer) 

<img width="3800" height="5164" alt="Group 2 (2)" src="https://github.com/user-attachments/assets/f7ae1a78-f18b-46bd-992b-82949797c397" />

## 🌍 Live Demo
Deploy: https://tiddy-pet-ecommerce-frontend.onrender.com

Video Demo: ...

## 🧠 Challenges & What I Learned

- Designing a role-based authorization system (RBAC)
- Managing complex order lifecycle states (Pending → Picking → Shipping → Delivered)
- Integrating Stripe Checkout
- Implementing Redis caching for cart performance optimization
- Handling async global state with Redux
- Building a scalable backend folder structure

## 🚀 Features

🔐 Authentication & Authorization
- JWT-based authentication
- Role-Based Access Control (Admin, Shipper, Customer)
- Protected routes on both frontend and backend

🛍 Customer Features
- Browse and search products
- Add / remove items from cart
- Cart caching with Redis
- Stripe payment checkout
- View order history
- Manage personal profile

🛠 Admin Features
- Dashboard analytics overview
- User account management
- Product CRUD operations
- Order management system
- Monitor platform activity

🚚 Shipper Features
- View assigned orders
- Update order status (Picking → Shipping → Delivered)
- Track delivery history
- Manage shipping workflow

## 🛠 Tech Stack

### Frontend
- React
- Redux
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express
- MongoDB
- Mongoose

### Other
- JWT ( Authentication )
- Stripe ( Payment  )
- Arcjet (Rate limiting & bot protection)
- Redis ( Caching Cart )

### Test
- Postman

## 🏗 Architecture
- RESTful API handles authentication, products, and order management
- RBAC middleware controls role permissions
- Stripe handles payment processing and order confirmation
- Redis caches cart data for performance optimization
- MongoDB stores users, products, and order lifecycle data
- Redux manages frontend

## 📦 Installation

### 1. Clone the repository

git clone https://github.com/yourusername/project-name.git

### 2. Install dependencies

Backend:
cd backend
npm install

Frontend:
cd frontend
npm install

## 🔑 Environment Variables

Create a `.env` file in `/backend`:

PORT=3000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
STRIPE_SECRET_KEY=your_stripe_secret
ARCJET_SECRET=your_arcjet_secret
REDIS_URL=your_redis_connection


### 4. Run the project

Backend + Frontend:
npm run dev

## 📸 Screenshots

## 👨‍💼 Admin Role

# 📊 Analytics Dashboard

<img width="3796" height="1938" alt="image" src="https://github.com/user-attachments/assets/22ab1538-1476-486d-81ed-63803f588e4d" />

# 👥 Account Management

<img width="3797" height="1925" alt="image" src="https://github.com/user-attachments/assets/47726659-4de5-4fb1-870a-ea8454887c49" />

# 📦 Product Management

<img width="3805" height="1944" alt="image" src="https://github.com/user-attachments/assets/9827ab65-1b7d-4a8c-b6c2-984cc858bf13" />

# 📦 Order Management

<img width="3797" height="1940" alt="image" src="https://github.com/user-attachments/assets/68126d78-8864-427a-845d-ca2418fddb21" />
<img width="3799" height="1933" alt="image" src="https://github.com/user-attachments/assets/7c6dbdf8-ad19-4bd2-8026-934f9dfc2b3f" />


## 👤 Customer Role

# 👤 Profile

<img width="3801" height="1943" alt="image" src="https://github.com/user-attachments/assets/1cb9acbe-1c2f-4a66-bd1c-08b883fe11dc" />

# 📜 Order History

<img width="3795" height="1938" alt="image" src="https://github.com/user-attachments/assets/e31993b9-688c-4884-b0c7-cc4542ac3b02" />

# 🛒 Shopping Cart

<img width="3794" height="1931" alt="image" src="https://github.com/user-attachments/assets/88317504-3167-4baa-a28c-7aa2f6aa71a2" />

# Payment by Stripe

<img width="3839" height="1952" alt="image" src="https://github.com/user-attachments/assets/fa1383d4-e1f4-4923-9a72-a7aff1d4a0d6" />

<img width="3838" height="1935" alt="image" src="https://github.com/user-attachments/assets/e77f26d4-d065-4c20-94af-163112372fd3" />



## 🚚 Shipper Role

# 👤 Profile

<img width="3799" height="1940" alt="image" src="https://github.com/user-attachments/assets/a6f9ea56-7d2e-4f9a-846c-ee3259a14b12" />

# 📦 Assigned Orders

<img width="3840" height="1350" alt="image" src="https://github.com/user-attachments/assets/2cec8dcc-219d-4ab8-addd-1866183995e6" />

# 📦 Picking Orders

<img width="3836" height="1399" alt="image" src="https://github.com/user-attachments/assets/270f9104-5f52-4b32-8bc1-f609e26a00c3" />

# 🚚 Shipping Orders

<img width="3835" height="1368" alt="image" src="https://github.com/user-attachments/assets/1b5e668e-ba6c-43ac-9cf6-e91d6c1f7895" />

# 📜 Delivery History
<img width="3840" height="1547" alt="image" src="https://github.com/user-attachments/assets/62105908-5ea8-45fd-bfb5-499a48d6819e" />

## 👨‍💻 Author

NHBP GitHub: https://github.com/KalnaiWin

