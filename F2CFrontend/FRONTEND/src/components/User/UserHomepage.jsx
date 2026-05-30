import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, MapPinned, UserCircle, LayoutGrid } from "lucide-react";

const UserHomepage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 via-white to-green-50">
      {/* Navbar */}
      <nav className="bg-green-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/userHomepage" className="text-2xl font-bold flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" /> FarmConnect
          </Link>
          <div className="space-x-6">
            <Link to="/user/products" className="hover:text-green-200">View Products</Link>
            <Link to="/user/track" className="hover:text-green-200">Track Orders</Link>
            <Link to="/user/orders" className="hover:text-green-200">My Orders</Link>
            <Link to="/user/cart" className="hover:text-green-200">Cart</Link>
            <Link to="/user/profile" className="hover:text-green-200">Profile</Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-green-700 via-green-800 to-green-900 text-white text-center">
        <h1 className="text-5xl font-extrabold mb-6">Welcome to FarmConnect!</h1>
        <p className="text-xl max-w-2xl mx-auto opacity-90">
          Browse fresh farm produce, track your orders in real time, and enjoy a direct connection with farmers.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">What You Can Do as a Customer</h2>
          <div className="grid md:grid-cols-2 gap-8 text-lg text-gray-700">
            <div className="flex items-start gap-4">
              <LayoutGrid className="w-10 h-10 text-green-700 mt-1" />
              <p><strong>View Products:</strong> Explore a wide range of fresh vegetables, fruits, and more directly from local farms.</p>
            </div>
            <div className="flex items-start gap-4">
              <MapPinned className="w-10 h-10 text-green-700 mt-1" />
              <p><strong>Track Orders:</strong> Monitor the delivery status of your orders from dispatch to doorstep in real time.</p>
            </div>
            <div className="flex items-start gap-4">
              <ShoppingCart className="w-10 h-10 text-green-700 mt-1" />
              <p><strong>My Orders:</strong> Access your past and current orders, review details, and reorder with ease.</p>
            </div>
            <div className="flex items-start gap-4">
              <UserCircle className="w-10 h-10 text-green-700 mt-1" />
              <p><strong>Manage Profile:</strong> Keep your personal information up to date to ensure a seamless experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">FarmConnect</h3>
              <p className="text-green-200">Connecting farms and homes through fresh, local produce.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-green-200 hover:text-white">Home</Link></li>
                <li><Link to="/" className="text-green-200 hover:text-white">About Us</Link></li>
                <li><Link to="/" className="text-green-200 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Join As</h3>
              <ul className="space-y-2">
                <li><Link to="/register/farmer" className="text-green-200 hover:text-white">Farmer</Link></li>
                <li><Link to="/register/delivery" className="text-green-200 hover:text-white">Delivery Partner</Link></li>
                <li><Link to="/register/customer" className="text-green-200 hover:text-white">Customer</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-green-200">
                <li>Email: support@farmconnect.com</li>
                <li>Phone: +1 (123) 456-7890</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-green-800 mt-8 pt-6 text-center text-green-300">
            <p>© {new Date().getFullYear()} FarmConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserHomepage;
