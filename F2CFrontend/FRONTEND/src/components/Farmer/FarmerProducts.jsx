import { PackageCheck } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../AxiosApi';

const FarmerManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState(null);
  const [predictedName, setPredictedName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const farmerId = JSON.parse(localStorage.getItem("data"))._id;

  const fetchProducts = async () => {
    try {
      const res = await api.get(`/products/${farmerId}`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch products.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLogout = () => {
    alert('Farmer logged out successfully');
    navigate('/');
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);
  
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const response = await fetch('http://localhost:5000/predict-image', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      if (response.ok) {
        setPredictedName(data.predicted_name);
      } else {
        console.error(data.error);
        setPredictedName('Unknown Produce');
      }
    } catch (error) {
      console.error('Error predicting image:', error);
      setPredictedName('Unknown Produce');
    }
  };  

  const handleAddOrUpdateProduct = async () => {
    if (!predictedName || !description || !price || !quantity || !category) {
      alert('Please fill in all the fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', predictedName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('category', category);
    formData.append('farmerId', farmerId);
    if (image) formData.append('image', image);

    try {
      if (editId) {
        formData.append('id', editId);
        await api.put('/products/update', formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert('Product updated successfully!');
      } else {
        await api.post('/products/', formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert('Product added successfully!');
      }
      await fetchProducts();
      clearForm();
    } catch (err) {
      console.error(err);
      alert('Failed to save product.');
    }
  };

  const clearForm = () => {
    setImage(null);
    setPredictedName('');
    setDescription('');
    setPrice('');
    setQuantity('');
    setCategory('');
    setEditId(null);
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setPredictedName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setQuantity(product.quantity);
    setCategory(product.category);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete('/products/remove', { data: { id } });
      fetchProducts();
      alert(" Product Sucessfully Deleted! ")
    } catch (err) {
      console.error(err);
      alert('Failed to delete product.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
            <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Manage Your Products</h2>

          <div className="bg-white p-6 rounded shadow-md mb-10">
            <h3 className="text-xl font-semibold mb-4">{editId ? 'Update Product' : 'Add New Product'}</h3>

            <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4 block" />
            {image && (
              <img src={URL.createObjectURL(image)} alt="Preview" className="h-40 mb-4 rounded" />
            )}

            <input
              type="text"
              value={predictedName}
              readOnly
              placeholder="Predicted Name"
              className="w-full mb-4 p-2 border rounded"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product Description"
              className="w-full mb-4 p-2 border rounded"
            />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full mb-4 p-2 border rounded"
            />
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantity"
              className="w-full mb-4 p-2 border rounded"
            />
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
              className="w-full mb-4 p-2 border rounded"
            />
            <button
              onClick={handleAddOrUpdateProduct}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {editId ? 'Update Product' : 'Add Product'}
            </button>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">Your Products</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {products.map(product => (
                <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={product.image?.startsWith('http') ? product.image : `http://localhost:8000/static/uploads/${product.image}`}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-xl font-bold mb-2">{product.name}</h4>
                    <p className="text-gray-700 mb-1">Category: {product.category}</p>
                    <p className="text-gray-700 mb-1">Quantity: {product.quantity}</p>
                    <p className="text-gray-700 mb-2">{product.description}</p>
                    <p className="text-green-700 font-semibold mb-4">₹{product.price}</p>
                    <div className="flex justify-between">
                      <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Update</button>
                      <button onClick={() => handleDelete(product._id)} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FarmerManageProducts;
