import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';
import ViewProducts from './components/ViewProducts';
import FarHomepage from './components/Farmer/FarHomepage';
import FarmerProducts from './components/Farmer/FarmerProducts';
import FarmerTransactions from './components/Farmer/FarmerTransactions';
import FarmerAssignProducts from './components/Farmer/FarmerAssignProducts';
import FarmerProfile from './components/Farmer/FarmerProfile';
import DpHomepage from './components/DeliveryPartner/DpHomepage';
import DpAssignedProducts from './components/DeliveryPartner/DpAssignedProducts';
import Profile from './components/DeliveryPartner/Profile';
import UserHomepage from './components/User/UserHomepage';
import UserViewProducts from './components/User/UserViewProducts';
import UserCart from './components/User/UserCart';
import UserMyOrders from './components/User/UserMyOrders';
import USerTrackOrders from './components/User/USerTrackOrders';
import UserProfile from './components/User/UserProfile';
import ChatBot from './components/ChatBot';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />

      <ChatBot />

      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/farmerManageProducts' element={<ViewProducts />} />
        <Route path='/farmerHomepage' element={<FarHomepage />} />
        <Route path='/farmer/products' element={<FarmerProducts />} />
        <Route path='/farmer/transactions' element={<FarmerTransactions />} />
        <Route path='/farmer/assignproducts' element={<FarmerAssignProducts />} />
        <Route path='/farmer/profile' element={<FarmerProfile />} />
        <Route path='/deliveryHomepage' element={<DpHomepage />} />
        <Route path='/delivery/products' element={<DpAssignedProducts />} />
        <Route path='/delivery/profile' element={<Profile />} />
        <Route path='/userHomepage' element={<UserHomepage />} />
        <Route path='/user/products' element={<UserViewProducts />} />
        <Route path='/user/cart' element={<UserCart />} />
        <Route path='/user/orders' element={<UserMyOrders />} />
        <Route path='/user/track' element={<USerTrackOrders />} />
        <Route path='/user/profile' element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
