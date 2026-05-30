import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import api from '../../../AxiosApi';

const UserMyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = JSON.parse(localStorage.getItem('data'))?._id;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get(`/orders/${userId}`);
        setOrders(response.data.data); 
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('data');
    alert('User logged out successfully');
    navigate('/');
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
            <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700">Logout</button>
          </div>
        </div>
      </nav>

      {/* Orders Section */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">My Orders</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading orders...</p>
        ) : orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white p-6 rounded-lg shadow border-l-4 border-green-600 flex flex-col gap-4"
              >
                <div>
                  <p className="text-gray-700"><strong>Order ID:</strong> {order._id}</p>
                  <p className="text-gray-700"><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                  <p className="text-gray-700"><strong>Payment Method:</strong> {order.paymentMethod}</p>
                  <p className="text-gray-700"><strong>Payment Status:</strong> {order.paymentStatus}</p>
                  <p className="text-gray-700"><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-800">Items:</h4>
                  <ul className="space-y-2">
                    {order.items.map((item) => (
                      <li key={item._id} className="border p-3 rounded-md flex justify-between items-center">
                        <div>
                          <p className="text-gray-800 font-medium">{item.productId.name}</p>
                          <p className="text-gray-600 text-sm">Price: ₹{item.price}</p>
                          <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                        </div>
                        <img
                          src={`http://localhost:8000/static/uploads/${item.productId.image}`} // ✅ Update to production URL if needed
                          alt={item.productId.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-right">
                  <p className={`px-4 py-1 rounded-full text-sm font-semibold w-fit mx-auto ${
                    order.status === 'Delivered'
                      ? 'bg-green-200 text-green-800'
                      : order.status === 'In Transit'
                      ? 'bg-yellow-200 text-yellow-800'
                      : 'bg-gray-200 text-gray-800'
                  }`}>
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">You have no orders yet.</p>
        )}
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
                <li><Link to="/about" className="text-green-200 hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="text-green-200 hover:text-white">Contact</Link></li>
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
            <p>&copy; {new Date().getFullYear()} FarmConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserMyOrders;
