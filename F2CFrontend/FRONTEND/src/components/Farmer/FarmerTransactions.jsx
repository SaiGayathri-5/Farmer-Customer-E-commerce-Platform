import { PackageCheck } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../AxiosApi';

const FarmerTransactions = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const storedData = JSON.parse(localStorage.getItem("data"));
        const farmerId = storedData?._id;

        if (!farmerId) {
          console.error("Farmer ID not found in local storage");
          return;
        }

        const response = await api.get(`/orders/farmer/${farmerId}/payments`);
        setTransactions(response.data.data || []);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const handleLogout = () => {
    alert('Farmer logged out successfully');
    navigate('/');
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

      {/* Transactions */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Transaction History</h2>
          {transactions.length === 0 ? (
            <p className="text-center text-gray-600">No transactions found.</p>
          ) : (
            <div className="overflow-x-auto bg-white rounded shadow-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-green-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Transaction ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Total (₹)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map(txn => (
                    <tr key={txn._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{txn._id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{txn.products?.[0]?.name || "N/A"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{txn.items?.[0]?.quantity || 0}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{txn.totalAmount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(txn.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-700">
                        {txn.paymentStatus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

export default FarmerTransactions;
