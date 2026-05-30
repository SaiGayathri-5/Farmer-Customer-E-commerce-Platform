import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import api from '../../../AxiosApi'; // Axios instance with baseURL

const UserViewProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products/');
        setProducts(res.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        alert('Error loading products');
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = () => {
    alert('User logged out successfully');
    navigate('/');
  };

  const handleAddToCart = async (productId) => {
    try {
      const userId = JSON.parse(localStorage.getItem("data"))?._id;
      const payload = { userId, productId, quantity: 1 };
      await api.post('/carts/', payload);
      alert('Product added to cart');
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add to cart');
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

      {/* Search */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <input
          type="text"
          placeholder="Search by product name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-lg shadow"
        />
      </div>

      {/* Product Cards */}
      <section className="max-w-6xl mx-auto px-4 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-16">
        {filteredProducts.length > 0 ? filteredProducts.map(product => (
          <div key={product._id} className="bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="border border-dashed border-green-600 rounded-md p-2 mb-4">
              <span className="text-green-700 font-semibold text-sm uppercase">Product Details</span>
            </div>
            <img
              src={`http://localhost:8000/static/uploads/${product.image}`}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold text-green-800 mb-1">{product.name}</h3>
            <p className="text-gray-700 text-sm mb-2">{product.description}</p>
            <p className="text-green-700 font-bold mb-4">₹{product.price}/kg</p>
            <button
              onClick={() => handleAddToCart(product._id)}
              className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md w-full"
            >
              Add to Cart
            </button>
          </div>
        )) : (
          <p className="text-center text-gray-600 col-span-full">No products found.</p>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-8">
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

export default UserViewProducts;