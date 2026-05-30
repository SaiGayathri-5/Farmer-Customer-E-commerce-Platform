import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import api from '../../../AxiosApi';

const UserTrackOrders = () => {
  const navigate = useNavigate();
  const [trackingData, setTrackingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const UserId = JSON.parse(localStorage.getItem('data'))?._id;

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        const response = await api.get(`/orders/${UserId}`);
        setTrackingData(response.data.data); // assuming API returns { data: [...] }
      } catch (error) {
        console.error('Error fetching tracking data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (UserId) {
      fetchTrackingData();
    }
  }, [UserId]);

  const handleLogout = () => {
    alert('User logged out successfully');
    localStorage.clear();
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
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Track Your Orders</h2>
        {loading ? (
          <p className="text-center text-gray-600">Loading orders...</p>
        ) : trackingData.length > 0 ? (
          <div className="space-y-10">
            {trackingData.map((order) => {
              const allStatuses = [
                'Pending',
                'Accepted',
                'Assigned',
                'Delivery',
                'Out for Delivery',
                'Delivered'
              ];
              const currentIndex = allStatuses.indexOf(order.status);

              return (
                <div key={order._id} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-600">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-green-800">Order ID: {order._id}</h3>
                    <p className="text-gray-600">Payment: {order.paymentMethod} ({order.paymentStatus})</p>
                    <p className="text-gray-600">Total Amount: ₹{order.totalAmount}</p>
                    <p className="text-gray-500 text-sm">Placed on: {new Date(order.createdAt).toLocaleString()}</p>
                  </div>

                  {/* Status Timeline */}
                  <div className="flex space-x-4 overflow-x-auto mb-6">
                    {allStatuses.map((status, index) => (
                      <div
                        key={index}
                        className={`text-sm font-semibold px-4 py-2 rounded-full border whitespace-nowrap transition
                          ${index < currentIndex ? 'bg-green-600 text-white border-green-600' :
                            index === currentIndex ? 'bg-yellow-500 text-white border-yellow-500' :
                            'bg-gray-100 text-gray-700 border-gray-300'}
                        `}
                      >
                        {status}
                      </div>
                    ))}
                  </div>

                  {/* Item List
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item._id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <img
                          src={`https://your-image-url.com/${item.productId.image}`}
                          alt={item.productId.name}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <div>
                          <p className="font-semibold text-lg">{item.productId.name}</p>
                          <p className="text-gray-600">Price: ₹{item.price}</p>
                          <p className="text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div> */}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-600">No orders to track.</p>
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

export default UserTrackOrders;
