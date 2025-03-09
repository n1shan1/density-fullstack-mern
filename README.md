# E-Commerce Application

A full-stack e-commerce application with React frontend, Node.js backend, and separate admin panel.

## Project Structure

```
e-commerce-app/
├── frontend/     # Customer-facing React application
├── backend/      # Node.js API server
└── admin/        # Admin panel for store management
```

## Technology Stack

### Frontend

- React.js with Vite
- Modern JavaScript (ES6+)
- Responsive design

### Backend

- Node.js & Express
- MongoDB with Mongoose
- JWT Authentication
- Payment processing (Razorpay & Stripe)
- File uploads with Multer & Cloudinary

### Admin Panel

- React.js with Vite
- Dashboard for inventory and order management

## Features

- User authentication & authorization
- Product browsing and searching
- Shopping cart functionality
- Secure checkout process
- Payment integration (Razorpay & Stripe)
- Order management & tracking
- Admin dashboard
- Image uploads
- Responsive design

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   STRIPE_SECRET_KEY=your_stripe_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```
4. Start the development server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the development server:
   ```
   npm run dev
   ```

### Admin Panel Setup

1. Navigate to the admin directory:
   ```
   cd admin
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## API Documentation

### Auth Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get user profile (protected)

### Product Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Create a product (admin only)
- `PUT /api/products/:id` - Update a product (admin only)
- `DELETE /api/products/:id` - Delete a product (admin only)

### Order Endpoints

- `POST /api/orders` - Create a new order
- `GET /api/orders` - Get all orders (admin only)
- `GET /api/orders/user` - Get logged-in user's orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id` - Update order status (admin only)

## Deployment

The application can be deployed to various platforms:

- Frontend: Vercel, Netlify, AWS S3
- Backend: Heroku, AWS EC2, Digital Ocean
- Database: MongoDB Atlas

## Author

- [Nishant Dev](https://github.com/n1shan1)

## License

MIT
