import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PackageCheck, Truck, ListChecks, UserCheck } from 'lucide-react';

const DeliveryPartnerHomepage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert('Delivery Partner logged out successfully');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-green-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/deliveryHomepage" className="text-2xl font-bold flex items-center gap-2">
            <PackageCheck className="w-6 h-6" /> FarmConnect
          </Link>
          <div className="space-x-6">
            <Link to="/delivery/products" className="hover:text-green-200">Products Assigned</Link>
            <Link to="/delivery/profile" className="hover:text-green-200">Profile</Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded-md text-white hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-24 bg-gradient-to-r from-green-700 via-green-800 to-green-900 text-white text-center relative">
        <h1 className="text-5xl font-extrabold mb-6 drop-shadow-md">Welcome, Delivery Partner!</h1>
        <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
          View your assigned orders, update delivery status, and keep customers informed in real‑time.
        </p>
        <div className="absolute inset-0 opacity-20 flex items-end justify-start p-4 pointer-events-none">
          <Truck className="w-32 h-32 text-green-200" />
        </div>
      </section>

      {/* What you can do */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Can You Do on FarmConnect?</h2>
          <div className="max-w-4xl mx-auto space-y-8 text-lg text-gray-700">
            <div className="flex items-start gap-4">
              <ListChecks className="w-12 h-12 text-green-700" />
              <p><strong>View Assigned Products:</strong> Instantly see all produce assigned to you, complete with pickup location, customer address, and special handling notes.</p>
            </div>
            <div className="flex items-start gap-4">
              <Truck className="w-12 h-12 text-green-700" />
              <p><strong>Update Order Status:</strong> Mark orders as picked up, in transit, or delivered. Customers and farmers receive real‑time notifications.</p>
            </div>
            <div className="flex items-start gap-4">
              <UserCheck className="w-12 h-12 text-green-700" />
              <p><strong>Manage Your Profile:</strong> Keep your contact info, vehicle details, and availability up to date for seamless assignments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">FarmConnect</h3>
              <p className="text-green-200">Connecting farms, partners, and customers through technology.</p>
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

export default DeliveryPartnerHomepage;
