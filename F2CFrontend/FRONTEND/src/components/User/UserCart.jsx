import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ShoppingCart, Trash2 } from 'lucide-react';
import api from '../../../AxiosApi';

const UserCart = () => {
  const navigate = useNavigate();
  const { userid } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiry, setExpiry] = useState('');
  const [paymentMsg, setPaymentMsg] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const UserId = JSON.parse(localStorage.getItem('data'))._id;

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get(`/carts/${UserId}`);
        setCartItems(response.data.items);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartItems();
  }, [userid]);

  const handleLogout = () => {
    alert('User logged out successfully');
    navigate('/');
  };

  const handleUpdateQuantity = async (productId, newQty) => {
    if (newQty < 1) {
      alert("Quantity must be at least 1");
      return;
    }

    try {
      await api.put("/carts/update", {
        userId: UserId,
        productId,
        quantity: newQty,
      });

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.productId._id === productId
            ? { ...item, quantity: newQty }
            : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity");
    }
  };

  const handleRemove = async (productId) => {
    try {
      await api.delete("/carts/remove", {
        data: { userId: UserId, productId },
      });

      setCartItems((prev) =>
        prev.filter((item) => item.productId._id !== productId)
      );
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item from cart");
    }
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleProceedToCheckout = () => {
    setShowPaymentModal(true);
  };

  const handlePayment = async () => {
    const payload = {
      userId: UserId,
      paymentMethod,
      ...(paymentMethod === 'CARD' && {
        cardDetails: {
          cardNumber,
          expiryMonth: expiry.split('/')[0],
          expiryYear: '20' + expiry.split('/')[1],
          cvv,
        },
      }),
    };

    try {
      const response = await api.post('/orders/user/place-order', payload);
      const { msg, order } = response.data;

      setPaymentMsg(msg);
      setPaymentStatus(order.paymentStatus);

      alert(msg);

      if (order.paymentStatus === 'Paid') {
        setCartItems([]);
        setShowPaymentModal(false);
      }
    } catch (error) {
      console.error('Payment or Order failed:', error);
      setPaymentMsg('An error occurred. Please try again.');
      setPaymentStatus('Failed');
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 via-white to-green-50">
      <nav className="bg-green-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/userHomepage"
            className="text-2xl font-bold flex items-center gap-2"
          >
            <ShoppingCart className="w-6 h-6" /> FarmConnect
          </Link>
          <div className="space-x-6">
            <Link to="/user/products" className="hover:text-green-200">View Products</Link>
            <Link to="/user/track" className="hover:text-green-200">Track Orders</Link>
            <Link to="/user/orders" className="hover:text-green-200">My Orders</Link>
            <Link to="/user/cart" className="hover:text-green-200">Cart</Link>
            <Link to="/user/profile" className="hover:text-green-200">Profile</Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Your Cart
        </h2>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white p-6 rounded-lg shadow-md flex gap-6 items-center"
              >
                <img
                  src={`http://localhost:8000/static/uploads/${item.productId.image}`}
                  alt={item.productId.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-green-800">
                    {item.productId.name}
                  </h3>
                  <p className="text-gray-600">{item.productId.description}</p>
                  <p className="text-gray-700">Category: {item.productId.category}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <p className="text-gray-700">Price: ₹{item.price}</p>
                    <div className="flex items-center">
                      <button
                        className="px-2 bg-gray-200 rounded-l"
                        onClick={() =>
                          handleUpdateQuantity(item.productId._id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        className="px-2 bg-gray-200 rounded-r"
                        onClick={() =>
                          handleUpdateQuantity(item.productId._id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.productId._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-6 h-6" />
                </button>
              </div>
            ))}
            <div className="text-right text-xl font-bold text-green-800 border-t pt-4">
              Total: ₹{totalAmount}
            </div>
            <div className="text-right">
              <button
                onClick={handleProceedToCheckout}
                className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full mt-4"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
        {paymentMsg && (
          <div className={`text-center mt-6 font-semibold ${paymentStatus === 'Paid' ? 'text-green-700' : 'text-red-600'}`}>
            {paymentMsg}
          </div>
        )}
      </section>

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg relative">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Payment Details
            </h3>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="UPI">UPI</option>
              <option value="CARD">Credit/Debit Card</option>
              <option value="COD">Cash on Delivery</option>
            </select>

            {paymentMethod === 'UPI' ? (
              <input
                type="text"
                placeholder="Enter UPI ID"
                className="w-full border p-2 rounded mb-4"
              />
            ) : paymentMethod === 'CARD' ? (
              <>
                <input
                  type="text"
                  placeholder="Card Number"
                  maxLength={16}
                  pattern="\d*"
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(e.target.value.replace(/\D/g, ''))
                  }
                  className="w-full border p-2 rounded mb-2"
                />
                <input
                  type="text"
                  placeholder="Card Holder Name"
                  className="w-full border p-2 rounded mb-2"
                />
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="w-full border p-2 rounded mb-2"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  maxLength={3}
                  pattern="\d*"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                  className="w-full border p-2 rounded mb-4"
                />
              </>
            ) : null}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                className="px-5 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
              >
                Pay ₹{totalAmount}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCart;
