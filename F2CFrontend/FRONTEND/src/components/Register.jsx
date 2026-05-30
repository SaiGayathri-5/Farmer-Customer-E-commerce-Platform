import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../AxiosApi';

const Register = () => {
  const [role, setRole] = useState('USER');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
      role,
      mobileNumber,
      address,
    };

    try {
      const response = await api.post('/users/', userData);

      if (response.status === 201 || response.status === 200) {
        toast.success(response.data.msg || 'Registration successful!');
        // Optional: redirect to login after delay
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error(response.data?.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-600 to-green-900 text-white relative">
      {/* Background Design */}
      <svg className="absolute top-0 left-0 w-full h-full z-0" viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="200" fill="rgba(255, 255, 255, 0.1)" />
        <circle cx="400" cy="300" r="150" fill="rgba(255, 255, 255, 0.15)" />
        <circle cx="1200" cy="600" r="250" fill="rgba(255, 255, 255, 0.05)" />
        <line x1="0" y1="0" x2="1440" y2="900" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" />
        <line x1="1440" y1="0" x2="0" y2="900" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" />
      </svg>

      {/* Navigation */}
      <nav className="bg-transparent text-white p-4 shadow-md z-10 relative">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-3xl font-extrabold text-white">FarmConnect</Link>
          <div className="space-x-6">
            <Link to="/login" className="hover:text-green-200">Login</Link>
            <Link to="/register" className="bg-white text-green-800 px-4 py-2 rounded-md hover:bg-green-100">Register</Link>
          </div>
        </div>
      </nav>

      {/* Register Form */}
      <div className="flex items-center justify-center py-16 z-10 relative">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-96">
          <h2 className="text-4xl font-extrabold text-center mb-6 text-green-700">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                className="text-black w-full px-4 py-3 mt-2 border-2 border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="text-black w-full px-4 py-3 mt-2 border-2 border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="text-black w-full px-4 py-3 mt-2 border-2 border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="mobileNumber" className="block text-gray-700">Mobile Number</label>
              <input
                type="tel"
                id="mobileNumber"
                className="text-black w-full px-4 py-3 mt-2 border-2 border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                pattern="[0-9]{10}"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="address" className="block text-gray-700">Address</label>
              <textarea
                id="address"
                className="text-black w-full px-4 py-3 mt-2 border-2 border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="role" className="block text-gray-700">Register as</label>
              <select
                id="role"
                className="text-black w-full px-4 py-3 mt-2 border-2 border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="USER">User</option>
                <option value="FARMER">Farmer</option>
                <option value="DELIVERY">Delivery Partner</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-3 rounded-md hover:bg-green-800 transition duration-200"
            >
              Register
            </button>
          </form>

          <p className="text-center mt-4">
            Already have an account? <Link to="/login" className="text-green-600 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
