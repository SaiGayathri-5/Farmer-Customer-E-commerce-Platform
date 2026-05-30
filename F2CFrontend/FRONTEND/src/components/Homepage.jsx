import React from 'react';
import { Link } from 'react-router-dom';


const Homepage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-green-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">FarmConnect</Link>
          <div className="space-x-6">
            <Link to="/login" className="hover:text-green-200">Login</Link>
            <Link to="/register" className="bg-white text-green-800 px-4 py-2 rounded-md hover:bg-green-100">
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
<section className="bg-gradient-to-r from-green-700 via-green-800 to-green-900 text-white py-24 relative">
  <div className="container mx-auto px-6 text-center">
    <h1 className="text-5xl font-extrabold leading-tight mb-6 drop-shadow-md">
      Empowering Farmers. Connecting Communities.
    </h1>
    <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
      An intuitive e-commerce platform transforming agriculture through AI, transparency, and innovation.
    </p>
    <div className="flex justify-center gap-6 flex-wrap">
      <Link
        to="/register"
        className="bg-white text-green-800 px-8 py-3 rounded-lg font-semibold border border-green-100 shadow hover:bg-green-100 transition duration-200"
      >
        Get Started
      </Link>
      <Link
        to="/products"
        className="text-white border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-800 transition duration-200"
      >
        Browse Products
      </Link>
    </div>
  </div>
</section>


      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-green-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Product Recognition</h3>
              <p className="text-gray-600">
                Our CNN model automatically identifies and labels products from images, reducing manual work for farmers.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-green-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-Time Delivery Tracking</h3>
              <p className="text-gray-600">
                Customers can track their orders in real-time from farm to doorstep with delivery partner updates.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-green-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Transactions</h3>
              <p className="text-gray-600">
                Integrated dummy payment gateway ensures a smooth checkout experience for customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Who Can Use This Platform?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Farmer Card */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img src="/images/img2.avif" alt="Farmer" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-green-700">For Farmers</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Upload products with AI-assisted labeling</li>
                  <li>Manage inventory and sales</li>
                  <li>Assign delivery partners</li>
                  <li>Track earnings and transactions</li>
                </ul>
                <Link to="/register" className="mt-4 inline-block bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600">
                  Register as Farmer
                </Link>
              </div>
            </div>

            {/* Delivery Partner Card */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img src="/images/img3.avif" alt="Delivery Partner" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-green-700">For Delivery Partners</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>View assigned orders</li>
                  <li>Update delivery status in real-time</li>
                  <li>Manage multiple deliveries</li>
                  <li>Efficient route planning</li>
                </ul>
                <Link to="/register" className="mt-4 inline-block bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600">
                  Register as Delivery Partner
                </Link>
              </div>
            </div>

            {/* Customer Card */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img src="/images/img1.avif" alt="Customer" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-green-700">For Customers</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Browse fresh farm products</li>
                  <li>Secure checkout process</li>
                  <li>Real-time order tracking</li>
                  <li>View order history</li>
                </ul>
                <Link to="/register" className="mt-4 inline-block bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600">
                  Register as Customer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center text-green-700 font-bold text-xl mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Farmers Upload Products</h3>
              <p className="text-gray-600 text-sm">
                Farmers upload product images which are automatically labeled by our AI system.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center text-green-700 font-bold text-xl mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Customers Place Orders</h3>
              <p className="text-gray-600 text-sm">
                Customers browse products, add to cart, and checkout using our secure payment system.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center text-green-700 font-bold text-xl mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Delivery Partners Assigned</h3>
              <p className="text-gray-600 text-sm">
                System assigns delivery partners who pick up products from farmers.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center text-green-700 font-bold text-xl mb-4">
                4
              </div>
              <h3 className="font-semibold mb-2">Real-Time Tracking</h3>
              <p className="text-gray-600 text-sm">
                Customers track deliveries in real-time until products reach their doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-green-100 to-green-200">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center text-green-800 mb-12">
            About FarmConnect
            </h2>

            <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center items-center mb-8">
                {/* Icon for the first paragraph */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-700 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                FarmConnect is a cutting-edge platform designed to transform the agricultural supply chain by directly connecting farmers with consumers. By eliminating middlemen, we ensure fair pricing for farmers and fresh produce for buyers.
                </p>
            </div>

            <div className="flex justify-center items-center mb-8">
                {/* Icon for the second paragraph */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-700 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Leveraging AI technology and modern web solutions, FarmConnect simplifies the process of uploading, discovering, and delivering farm goods. Farmers can use our AI-powered product labeling tool, customers can shop securely, and delivery partners manage real-time tracking.
                </p>
            </div>

            <div className="flex justify-center items-center mb-12">
                {/* Icon for the third paragraph */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-700 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className="text-gray-700 text-lg leading-relaxed">
                Our mission is to empower the agricultural community, promote transparency, and enhance sustainability through technology.
                </p>
            </div>

            {/* Call to Action Button */}
            <div className="flex justify-center">
                <Link
                to="/register"
                className="bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-800 transition duration-300"
                >
                Get Started
                </Link>
            </div>
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

export default Homepage;