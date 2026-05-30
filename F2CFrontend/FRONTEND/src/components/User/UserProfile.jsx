import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User2, Mail, Phone, MapPin, Pencil } from 'lucide-react';
import api from '../../../AxiosApi';

const UserProfile = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    profileImage: ''
  });

  const userId = JSON.parse(localStorage.getItem('data'))?._id;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/users/me`);
        setProfile(response.data); // Adjust if your response shape is different
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('data');
    alert('User logged out successfully');
    navigate('/');
  };

  const handleUpdateClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSave = async () => {
    try {
      await api.put(`/users/${userId}`, profile);
      alert('Profile updated successfully');
      setShowModal(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
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
            <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700">Logout</button>
          </div>
        </div>
      </nav>

      {/* Profile Section */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg text-center">
          <img
            src={profile.profileImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF02Jj8T2t7PdkytAw42HDuuSz7yXguKn8Lg&s'}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto border-4 border-green-600 mb-4"
          />
          <h2 className="text-3xl font-bold text-gray-800 mb-6">User Profile</h2>

          <div className="space-y-4 text-lg text-gray-700 text-left">
            <p className="flex items-center gap-2"><User2 className="text-green-700" /> <strong>Name:</strong> {profile.name}</p>
            <p className="flex items-center gap-2"><Mail className="text-green-700" /> <strong>Email:</strong> {profile.email}</p>
            <p className="flex items-center gap-2"><Phone className="text-green-700" /> <strong>Phone:</strong> {profile.mobileNumber}</p>
            <p className="flex items-center gap-2"><MapPin className="text-green-700" /> <strong>Address:</strong> {profile.address}</p>
            {profile.createdAt && (
              <p className="flex items-center gap-2">
                <MapPin className="text-green-700" />
                <strong>Account Created At:</strong>{' '}
                {new Date(profile.createdAt).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            )}

          </div>

          <button
            onClick={handleUpdateClick}
            className="mt-6 bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full shadow-md flex items-center gap-2 mx-auto"
          >
            <Pencil className="w-4 h-4" /> Update Profile
          </button>
        </div>
      </section>

      {/* Modal for Editing Profile */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Update Profile</h3>
            <input type="text" placeholder="Name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="w-full border p-2 mb-2 rounded" />
            <input type="email" placeholder="Email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="w-full border p-2 mb-2 rounded" />
            <input type="text" placeholder="Phone" value={profile.mobileNumber} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="w-full border p-2 mb-2 rounded" />
            <input type="text" placeholder="Address" value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} className="w-full border p-2 mb-2 rounded" />
            {/* <label className="block text-sm font-medium text-gray-700 mb-1">Upload Profile Picture:</label> */}
            {/* <input type="file" accept="image/*" className="mb-4" onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setProfile({ ...profile, profileImage: reader.result });
                };
                reader.readAsDataURL(file);
              }
            }} /> */}
            <div className="flex justify-end space-x-2">
              <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}

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

export default UserProfile;
