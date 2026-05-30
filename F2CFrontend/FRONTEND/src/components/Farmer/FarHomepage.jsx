import { PackageCheck } from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FarmerHomepage = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Here you would usually clear the session or token
    console.log("Logging out...");
    alert("Farmer logged out successfully");
    navigate('/'); // Navigate to the homepage after logout
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
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

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-green-700 via-green-800 to-green-900 text-white text-center relative">
        <h1 className="text-5xl font-extrabold leading-tight mb-6 drop-shadow-md">
          Welcome, Farmer!
        </h1>
        <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
          Effortlessly manage your products, track earnings, and stay connected to the marketplace.
        </p>
       
        {/* Background design (farming icons, subtle) */}
        <div className="absolute inset-0 opacity-30">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 absolute left-0 bottom-0 opacity-20 text-green-200" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.69 2 6 4.69 6 8C6 10.03 7.67 12.18 9.82 13.08L9 14H8V12H9V8.09C9 7.2 9.78 6.5 10.63 6.5C11.47 6.5 12 6.95 12 7.5V12H13V9.7C13 9.05 13.5 8.5 14.13 8.5C14.74 8.5 15 8.91 15 9.3V12H15.73C16.72 11.68 17.52 10.79 18 9.76C18.73 8.39 19 6.89 19 5.5C19 2.42 16.88 0 14 0C12.75 0 11.51.51 10.65 1.33C9.79 2.15 9.47 3.45 9.89 4.57C9.61 4.73 9.36 4.98 9.1 5.23C9.09 5.21 9.08 5.18 9.07 5.16C8.41 5.79 8.11 6.74 8.12 7.74C8.12 9.07 9.16 9.91 10.42 9.91C11.63 9.91 12.5 9.04 12.5 7.93C12.5 6.78 13.29 5.85 14.33 5.85C15.33 5.85 16 6.64 16 7.6C16 9.03 14.97 10.25 13.67 10.25C12.97 10.25 12.46 9.77 12.43 9.01C12.41 8.36 12.83 8 13.39 8C13.91 8 14.25 8.37 14.25 8.88C14.25 9.36 13.81 9.71 13.34 9.68L13 9.5C13.5 8.8 14 8 14 7.5C14 5.85 12.93 5 11.5 5C10.07 5 9 6.07 9 7.5V8C9 8.52 9.39 9 9.88 9H10.58C11.14 9 11.5 8.65 11.5 8.09C11.5 7.53 11.14 7.19 10.58 7.19C10.07 7.19 9.88 6.98 9.88 6.46C9.88 5.94 10.07 5.69 10.58 5.69C11.14 5.69 11.5 5.34 11.5 4.86C11.5 4.38 10.92 4 10.42 4H9.67C9.28 4 9 4.19 8.88 4.5C8.68 4.9 8.75 5.47 9.12 5.68L10 6.26C9.89 6.07 9.74 5.94 9.5 5.87C8.91 5.68 8.39 5.49 7.88 5.35C7.23 5.15 6.52 5.11 5.89 5.24C5.26 5.37 4.79 5.65 4.57 6.06C4.35 6.46 4.35 6.92 4.57 7.33C4.79 7.73 5.26 8.01 5.89 8.14C6.52 8.27 7.23 8.23 7.88 8.03C8.39 7.89 8.91 7.7 9.5 7.51C9.74 7.44 9.89 7.31 10 7.12L10.01 7.11C9.99 7.04 10 6.97 10 6.9V6.68C10 6.15 10.14 5.63 10.42 5.24C10.72 4.85 11.14 4.66 11.57 4.58C12 4.5 12.4 4.53 12.75 4.67C13.13 4.8 13.42 5.03 13.64 5.36C13.89 5.71 14 6.09 14 6.46C14 6.88 13.83 7.27 13.55 7.51C13.08 7.83 12.46 8.2 11.79 8.47C11.44 8.64 11.09 8.8 10.75 8.98C10.42 9.15 10.07 9.31 9.73 9.46C9.25 9.7 8.72 9.82 8.17 9.84C7.63 9.87 7.14 9.91 6.75 9.91C6.37 9.91 6.06 9.81 5.81 9.7C5.57 9.58 5.37 9.46 5.22 9.35C4.94 9.19 4.6 9.03 4.26 8.89C3.91 8.76 3.56 8.62 3.22 8.46L3 8.25Z" />
          </svg>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Can a Farmer Do on FarmConnect?</h2>
    <div className="max-w-4xl mx-auto text-center">
      <p className="text-gray-700 text-lg leading-relaxed mb-6">
        As a registered farmer on **FarmConnect**, you gain access to a suite of powerful tools to manage your farm's operations and reach consumers directly. After logging in, here's what you can do:
      </p>

      <div className="space-y-6">
        <div className="flex justify-center items-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-700 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <p className="text-gray-700 text-lg leading-relaxed">
            **Add Products**: Easily upload your farm's fresh produce with images. Our platform's advanced **CNN (Convolutional Neural Network)** automatically analyzes and identifies the produce from the image, accurately labeling it as vegetables, fruits, or other goods. This feature saves you time and ensures accurate listings.
          </p>
        </div>

        <div className="flex justify-center items-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-700 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <p className="text-gray-700 text-lg leading-relaxed">
            **Manage Products**: Once your products are listed, you can easily manage them — update product details, quantities, prices, and availability. Keep track of your inventory and ensure your customers always have access to fresh farm goods.
          </p>
        </div>

        <div className="flex justify-center items-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-700 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 3v18l15-9-15-9z" />
          </svg>
          <p className="text-gray-700 text-lg leading-relaxed">
            **Transaction History**: Stay informed by viewing your transaction history. You can track past sales, monitor earnings, and manage payments — all in one place. Transparency is key, and our platform ensures that you always have a clear overview of your transactions.
          </p>
        </div>

        <div className="flex justify-center items-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-700 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 11h12M10 16h12M10 6h12M7 13H5a2 2 0 01-2-2V7a2 2 0 012-2h2m3 0h2a2 2 0 012 2v6a2 2 0 01-2 2h-2" />
          </svg>
          <p className="text-gray-700 text-lg leading-relaxed">
            **Assign Delivery Partners**: Once an order is placed, you can assign a delivery partner to pick up and deliver the products directly to the customer’s doorstep. This feature ensures efficient deliveries and makes sure your goods reach the consumer in the best condition.
          </p>
        </div>

        <div className="flex justify-center items-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-700 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l6 6-6 6m18-12l-6 6 6 6" />
          </svg>
          <p className="text-gray-700 text-lg leading-relaxed">
            **Track Deliveries**: Monitor the delivery status in real-time. You can track when the delivery partner picks up the product, and you will be notified when it reaches the customer. Stay in control of the delivery process from start to finish.
          </p>
        </div>
      </div>

      <p className="text-gray-700 text-lg leading-relaxed mt-8">
        FarmConnect is designed to help you scale your farm business by providing you with the tools to manage your products, sales, and deliveries seamlessly. Start today, and let technology take your farm operations to the next level!
      </p>
    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="bg-green-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <h3 className="text-xl font-semibold mb-4">FarmConnect</h3>
              <p className="text-green-200">
                Bridging the gap between farmers and consumers through technology and innovation.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-green-200 hover:text-white">Home</Link></li>
                <li><Link to="/products" className="text-green-200 hover:text-white">Products</Link></li>
                <li><Link to="/about" className="text-green-200 hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="text-green-200 hover:text-white">Contact</Link></li>
              </ul>
            </div>

            {/* User Types */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Join As</h3>
              <ul className="space-y-2">
                <li><Link to="/register/farmer" className="text-green-200 hover:text-white">Farmer</Link></li>
                <li><Link to="/register/delivery" className="text-green-200 hover:text-white">Delivery Partner</Link></li>
                <li><Link to="/register/customer" className="text-green-200 hover:text-white">Customer</Link></li>
              </ul>
            </div>

            {/* Contact */}
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

export default FarmerHomepage;
