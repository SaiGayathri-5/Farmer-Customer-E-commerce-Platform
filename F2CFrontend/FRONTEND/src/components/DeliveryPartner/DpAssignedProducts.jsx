import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../../AxiosApi';

const AssignedProducts = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  const deliveryData = JSON.parse(localStorage.getItem("data") || '{}');
  const deliveryBoyId = deliveryData?._id;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const assignedRes = await api.get(`/orders/deliveryboyorders/${deliveryBoyId}`);
        const completedRes = await api.get(`/orders/deliveryboycompletedorders/${deliveryBoyId}`);

        setOrders(assignedRes.data.orders || []);
        setCompletedOrders(completedRes.data.orders || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    if (deliveryBoyId) fetchOrders();
  }, [deliveryBoyId]);

  const handleLogout = () => {
    localStorage.removeItem('deliveryBoyId');
    alert('Logged out successfully');
    navigate('/');
  };

  const handleOpenModal = (order) => {
    setActiveOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setActiveOrder(null);
  };

  const handleStatusChange = (e) => setSelectedStatus(e.target.value);

  const filteredOrders =
    selectedStatus === 'all'
      ? orders
      : orders.filter((o) => o.status?.toLowerCase() === selectedStatus.toLowerCase());

  const handleStatusUpdate = async () => {
    try {
      await api.put(`/orders/delivery-status`, {
        orderId: activeOrder._id,
        status: activeOrder.status,
      });

      setOrders((prev) =>
        prev.map((o) =>
          o._id === activeOrder._id ? { ...o, status: activeOrder.status } : o
        )
      );
      handleCloseModal();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 via-white to-green-50">
      {/* Navbar */}
      <nav className="bg-green-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/deliveryHomepage" className="text-2xl font-bold">FarmConnect</Link>
          <div className="space-x-6">
            <Link to="/delivery/products" className="hover:text-green-200">Products Assigned</Link>
            <Link to="/delivery/profile" className="hover:text-green-200">Profile</Link>
            <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700">Logout</button>
          </div>
        </div>
      </nav>

      {/* Filter */}
      <div className="max-w-5xl mx-auto px-4 my-8">
        <label className="block mb-2 text-lg font-semibold text-gray-800">Filter by Status:</label>
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className="border border-green-300 p-2 rounded w-full md:w-64"
        >
          <option value="all">All</option>
          <option value="assigned">Assigned</option>
          <option value="picked up">Picked Up</option>
          <option value="in transit">In Transit</option>
        </select>
      </div>

      {/* Assigned/In-Progress Orders */}
      <section className="py-4 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-green-800">Assigned Orders</h2>
          {filteredOrders.length > 0 ? (
            <div className="space-y-6">
              {filteredOrders.map((order) => (
                <div key={order._id} className="bg-white p-6 shadow-md rounded-xl border border-green-200">
                  <h3 className="text-xl font-semibold text-green-700">Order ID: {order._id}</h3>
                  {order.items.map((item) => (
                    <div key={item._id} className="pl-4 mt-2 border-l-4 border-green-500">
                      <p><strong>Product ID:</strong> {item.productId}</p>
                      <p><strong>Quantity:</strong> {item.quantity}</p>
                      <p><strong>Price:</strong> ₹{item.price}</p>
                      <p><strong>Farmer Mobile:</strong> {item.farmerid?.mobileNumber || 'N/A'}</p>
                      <p><strong>Farmer Address:</strong> {item.farmerid?.address || 'N/A'}</p>
                    </div>
                  ))}
                  <p className="mt-2"><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                  <p><strong>Status:</strong> <span className="text-green-800">{order.status}</span></p>
                  <p><strong>Payment:</strong> {order.paymentMethod} - {order.paymentStatus}</p>
                  <button
                    onClick={() => handleOpenModal(order)}
                    className="mt-4 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-full"
                  >
                    Update Status
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No orders found.</p>
          )}
        </div>
      </section>

      {/* Completed Orders */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6 text-green-900">Completed Orders</h2>
          {completedOrders.length > 0 ? (
            <div className="space-y-6">
              {completedOrders.map((order) => (
                <div key={order._id} className="bg-gray-100 p-6 shadow-md rounded-xl border border-gray-300">
                  <h3 className="text-xl font-semibold text-gray-800">Order ID: {order._id}</h3>
                  {order.items.map((item) => (
                    <div key={item._id} className="pl-4 mt-2 border-l-4 border-green-400">
                      <p><strong>Product ID:</strong> {item.productId}</p>
                      <p><strong>Quantity:</strong> {item.quantity}</p>
                      <p><strong>Price:</strong> ₹{item.price}</p>
                      <p><strong>Farmer Mobile:</strong> {item.farmerid?.mobileNumber || 'N/A'}</p>
                      <p><strong>Farmer Address:</strong> {item.farmerid?.address || 'N/A'}</p>
                    </div>
                  ))}
                  <p className="mt-2"><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                  <p><strong>Status:</strong> <span className="text-green-600 font-semibold">{order.status}</span></p>
                  <p><strong>Payment:</strong> {order.paymentMethod} - {order.paymentStatus}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No completed orders found.</p>
          )}
        </div>
      </section>

      {/* Modal */}
      {showModal && activeOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Update Status for Order: {activeOrder._id}</h3>
            <select
              value={activeOrder.status}
              onChange={(e) =>
                setActiveOrder({ ...activeOrder, status: e.target.value })
              }
              className="border p-2 rounded w-full mb-4"
            >
              <option value="Assigned">Assigned</option>
              <option value="Picked-Up">Picked Up</option>
              <option value="In-transit">In Transit</option>
              <option value="Delivered">Delivered</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleStatusUpdate} className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-green-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} FarmConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AssignedProducts;
