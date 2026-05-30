import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, PackageCheck } from 'lucide-react';
import api from '../../../AxiosApi'; // make sure path is correct

const FarmerProfile = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    profileImage: ''
  });

  const farmerId = JSON.parse(localStorage.getItem('data'))?._id;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/users/me`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching farmer profile:', error);
      }
    };

    if (farmerId) {
      fetchProfile();
    }
  }, [farmerId]);

  const handleLogout = () => {
    localStorage.removeItem('data');
    alert('Farmer logged out successfully');
    navigate('/');
  };

  const handleSave = async () => {
    try {
      await api.put(`/users/${farmerId}`, profile);
      alert('Profile updated successfully');
      setShowModal(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
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
            <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700">Logout</button>
          </div>
        </div>
      </nav>

      {/* Profile Display */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
          <img
            src={profile.profileImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF02Jj8T2t7PdkytAw42HDuuSz7yXguKn8Lg&s'}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto border-4 border-green-600 mb-6"
          />
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Farmer Profile</h2>

          <div className="space-y-4 text-lg text-gray-700 text-left">
            <div className="flex items-center gap-3">
              <User className="text-green-700" /> <span><strong>Name:</strong> {profile.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-green-700" /> <span><strong>Email:</strong> {profile.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-green-700" /> <span><strong>Phone:</strong> {profile.mobileNumber}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-green-700" /> <span><strong>Address:</strong> {profile.address}</span>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="mt-8 bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full shadow-md"
          >
            Update Profile
          </button>
        </div>
      </section>

      {/* Update Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-center text-green-700">Update Profile</h3>
            <div className="space-y-4">
              <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Name" className="w-full border p-2 rounded" />
              <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} placeholder="Email" className="w-full border p-2 rounded" />
              <input type="text" value={profile.mobileNumber} onChange={(e) => setProfile({ ...profile, mobileNumber: e.target.value })} placeholder="Phone" className="w-full border p-2 rounded" />
              <input type="text" value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} placeholder="Address" className="w-full border p-2 rounded" />
              {/* <input type="url" value={profile.profileImage} onChange={(e) => setProfile({ ...profile, profileImage: e.target.value })} placeholder="Profile Image URL" className="w-full border p-2 rounded" /> */}
              <div className="flex justify-between mt-4">
                <button onClick={() => setShowModal(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
                <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-green-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">FarmConnect</h3>
              <p className="text-green-200">Bridging the gap between farmers and consumers through technology and innovation.</p>
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

export default FarmerProfile;
