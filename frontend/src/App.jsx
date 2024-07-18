import React, {useEffect, useState} from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import {
    API,
    AUTH_ENDPOINTS,
    getAxiosError,
} from "./helpers/constants.js";
import { Puff } from "react-loading-icons";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "./redux/slices/loadingSlice.js";
import { setUser } from "./redux/slices/userSlice.js";

// Pages
import Home from "./pages/home/index.jsx"
import Footer from "./component/customer/Footer/Footer.jsx"
import AllProducts from "./pages/viewAllProducts/index.jsx"
import TopNavbar from './component/customer/Topbar/TopNavbar';
import ViewItemsByCategory from "./pages/viewItemsByCategory/index.jsx"
import Cart from "./pages/cart/index.jsx"
import Admin from "./pages/admin/index.jsx"
import ProductDetail from "./pages/productDetail/ProductDetail.jsx"
import Login from "./pages/auth/Login.jsx"
import Register from "./pages/auth/Register.jsx"
import Profile from "./pages/profile"

import { navItems, websiteTitle, serviceItem } from './helpers/const_data.js';

function App() {

  const loading = useSelector((state) => state.loading.value);
  const currentUser = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const LoadingScreen = () => {
    return (
      <div className={`fixed inset-0 z-[10000] flex items-center justify-center backdrop-blur-sm bg-black/10`}>
        <Puff fill="#0000cc" height="3rem" speed={2} />
      </div>
    );
  };

  // retrieve user data on page refresh
  useEffect(() => {
      if (!currentUser) {
      dispatch(showLoading());
      API.get(AUTH_ENDPOINTS.authenticate)
      .then((response) => {
          const { password, ...temp } = response.data;
          dispatch(setUser(temp));
      })
      .finally(() => dispatch(hideLoading()));
      }
  }, []);

  return (
    <Router>

      {!window.location.pathname.includes('/login') &&
        !window.location.pathname.includes('/register') &&
        !window.location.pathname.includes('/cart') &&
        !window.location.pathname.includes('/admin') &&
        !window.location.pathname.includes('/account') && (
          <TopNavbar title={websiteTitle} items={navItems} />
      )}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/allProducts' element={<AllProducts />} />
        <Route path='/viewItemsByCategory' element={<ViewItemsByCategory />} />
        <Route path='/product-detail' element={<ProductDetail />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/account' element={<Profile />} />
      </Routes>
      {loading && <LoadingScreen />}
      {!window.location.pathname.includes('/login') &&
        !window.location.pathname.includes('/register') &&
        !window.location.pathname.includes('/cart') &&
        !window.location.pathname.includes('/admin') &&
        !window.location.pathname.includes('/account') && (
          <Footer />
      )}
    </Router>
  )

}

export default App
