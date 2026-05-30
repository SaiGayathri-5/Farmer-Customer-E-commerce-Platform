import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserCheck, PackageCheck, Truck, User } from 'lucide-react';
import api from '../../../AxiosApi';

const AssignProducts = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [deliveryPartners, setDeliveryPartners] = useState([]);
  const farmerId = JSON.parse(localStorage.getItem("data"))?._id;

  useEffect(() => {
    const fetchOrdersAndPartners = async () => {
      try {
        const ordersRes = await api.get(`/orders?farmerId=${farmerId}`);
        const partnersRes = await api.get(`/users/dropdown?role=DELIVERY`);

        setOrders(ordersRes.data.data);
        setDeliveryPartners(partnersRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOrdersAndPartners();
  }, [farmerId]);

  const handleLogout = () => {
    alert('Farmer logged out successfully');
    navigate('/');
  };

  const assignPartner = async (orderId, partnerId) => {
    try {
      const response = await api.post('/orders/assign-delivery', {
        orderId,
        deliveryPartnerId: partnerId,
      });

      const updatedOrder = response.data.order;

      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    } catch (error) {
      console.error('Error assigning delivery partner:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-green-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/farmerHomepage" className="text-2xl font-bold flex items-center gap-2">
            <PackageCheck className="w-6 h-6" /> FarmConnect
          </Link>
          <div className="space-x-6">
            <Link to="/farmer/products" className="hover:text-green-200">Manage Products</Link>
            <Link to="/farmer/assignproducts" className="hover:text-green-200">Assign Products</Link>
            <Link to="/farmer/transactions" className="hover:text-green-200">Transaction History</Link>
            <Link to="/farmer/profile" className="hover:text-green-200">Profile</Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded-md text-white hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center gap-2">
            <Truck className="w-8 h-8 text-green-600" /> Assign Delivery Partners
          </h2>

          {orders.length === 0 ? (
            <p className="text-center text-gray-600">No orders to assign.</p>
          ) : (
            <div className="space-y-6">
              {orders.map(order => (
                <div
                  key={order._id}
                  className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row justify-between md:items-center gap-4 border-l-4 border-green-600"
                >
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <PackageCheck className="text-green-600" /> Order ID: {order._id}
                    </h3>
                    <p className="text-gray-700"><strong>Product:</strong> {order.items[0]?.productId.name}</p>
                    <p className="text-gray-700"><strong>Quantity:</strong> {order.items[0]?.quantity}</p>
                    <p className="text-gray-700 flex items-center gap-2">
                      <User className="text-gray-500" /> Customer: {order.userId?.name || "Guest"}
                    </p>
                    <p className="text-gray-700 flex items-center gap-2">
                      <UserCheck className="text-gray-500" />
                      Assigned To: {
                        order.deliveryPartnerId?._id
                          ? deliveryPartners.find(dp => dp._id === order.deliveryPartnerId._id)?.name || "Already Assigned"
                          : <span className="text-red-500">Not Assigned</span>
                      }
                    </p>
                  </div>
                  <div>
                    <select
                      onChange={(e) => assignPartner(order._id, e.target.value)}
                      value={order.deliveryPartnerId?._id || ''}
                      className="p-2 border rounded text-gray-700"
                    >
                      <option value="">Assign Delivery Partner</option>
                      {deliveryPartners.map(partner => (
                        <option key={partner._id} value={partner._id}>
                          {partner.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">FarmConnect</h3>
              <p className="text-green-200">
                Bridging the gap between farmers and consumers through technology and innovation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-green-200 hover:text-white">Home</Link></li>
                <li><Link to="/products" className="text-green-200 hover:text-white">Products</Link></li>
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
                <li>Email: info@farmconnect.com</li>
                <li>Phone: +1 (123) 456-7890</li>
                <li>Address: 123 Farm Street, Agriculture City</li>
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

export default AssignProducts;
