// import logo from './logo.svg';
import HeaderWhenLogged from './container/Header/headerWhenLogged';
import Header from './container/Header/index'
import Footer from './container/Footer';
import Login from './container/Login';
import Home from './container/Home';
import AboutUs from '../src/components/AboutUs'
import Shop from '../src/components/Shop'
import ShopSeller from '../src/components/Shop/shopSeller'
import Cart from '../src/components/Cart'
import SignUp from '../src/container/Login/signup'
import Product from '../src/components/Product'
import UserManager from '../src/components/Manager/UserManager'
import Profile from '../src/components/Profile'
import Order from '../src/components/Order'
import initFontAwesome from "../src/initFontAwesome.js";
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import StockManager from '../src/components/Manager/StockManager'
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import DemoPie from './components/Report/';
initFontAwesome();

function App() {
  const isLogin = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('role')
  const [mess, setMess] = useState()
  const [mess2, setMess2] = useState()

  var callbackFunction = (childData) => {
    setMess(childData)
  }
  var callbackFunction1 = (childData) => {
    setMess2(childData)
  }
  if (!isLogin) {
    return (
      <div>
        <Header parentCallback={callbackFunction} data={mess2} />
        <Routes>
          <Route path="/" element={<Home searchData={mess} />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Cart" element={<Cart parentCallback={callbackFunction1} login={false} />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Shop" element={<Shop searchData={mess} />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Product" element={<Product parentCallback={callbackFunction1} />} />
        </Routes>
        <Footer />
      </div>
    )
  }
  else {
    if (role === "admin") {
      return (
        <PayPalScriptProvider options={{
          "client-id": "AYSW435EZGBmw2mThWg7-M16ELwuJ6Ow3dAcv8D4AnfkmIVnwSDzVUTxREbrEELk_ISGXL3zJQTamEzk"
        }}>
          <div>
            <HeaderWhenLogged parentCallback={callbackFunction} data={mess2} />
            <Routes>
              <Route path="/" element={<Home searchData={mess} />} />
              <Route path="/AboutUs" element={<AboutUs />} />
              <Route path="/Cart" element={<Cart parentCallback={callbackFunction1} login={true} />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Shop" element={<ShopSeller searchData={mess} />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/UserManager" element={<UserManager />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Product" element={<Product parentCallback={callbackFunction1} />} />
              <Route path="/StockManager" element={<StockManager />} />
              <Route path="/Order" element={<Order />} />
              <Route path="/Statistic-By-Sex" element={<DemoPie />} />
            </Routes>
            <Footer />
          </div>
        </PayPalScriptProvider>
      )
    }
    else if (role === "customer") {
      return (
        <PayPalScriptProvider options={{
          "client-id": "AYSW435EZGBmw2mThWg7-M16ELwuJ6Ow3dAcv8D4AnfkmIVnwSDzVUTxREbrEELk_ISGXL3zJQTamEzk"
        }}>
          <div>
            <HeaderWhenLogged parentCallback={callbackFunction} data={mess2} />
            <Routes>
              <Route path="/" element={<Home searchData={mess} />} />
              <Route path="/AboutUs" element={<AboutUs />} />
              <Route path="/Cart" element={<Cart parentCallback={callbackFunction1} login={true} />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Shop" element={<Shop searchData={mess} />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Product" element={<Product parentCallback={callbackFunction1} />} />
              <Route path="/Order" element={<Order />} />
            </Routes>
            <Footer />
          </div>
        </PayPalScriptProvider>
      )
    }
  }
}
export default App;
