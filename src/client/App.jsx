import { useEffect, useState, useCallback } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AllCars from "./components/AllCars";
import SingleCar from "./components/SingleCar";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import ListCar from "./components/ListCar";
import Orders from "./components/Order";
import Profile from "./components/Profile";
import axios from "axios";
import Cart from "./components/Cart";
import BottomNavBar from "./components/BottomNavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./main.jsx";
import Success from "./components/Success.jsx";
import Account from "./components/Account.jsx";
import AllUsers from "./components/AllUsers.jsx";
import SingleOrderCar from "./components/SingleOrderCar.jsx";
import LandingPage from "./components/LandingPage.jsx";
import OrderHistory from "./components/OrderHistory.jsx";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ValidateCode from "./components/ValidateCode.jsx";
import Settings from "./components/Settings.jsx";

function App() {
  const [user, setUser] = useState(null); // Changed from "" to null
  const [token, setToken] = useState(window.localStorage.getItem("TOKEN"));
  const [cart, setCart] = useState([]);
  const [usersOrders, setUsersOrders] = useState(null);

  const getToken = () => {
    return localStorage.getItem("TOKEN");
  };

  const fetchCart = useCallback(async () => {
    if (!user || !user.id) {
      console.error("User ID is missing");
      return;
    }
    try {
      const token = getToken();
      const { data: foundCart } = await axios.get(`/api/cart/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(foundCart);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }, [user]);

  useEffect(() => {
    async function getUser() {
      const { data } = await axios.get("/api/users/profile", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("TOKEN"),
        },
      });
      setUser(data || null); // Ensure user is either an object or null
    }
    if (token) {
      getUser();
    }
  }, [token]);

  console.log(user);
  return (
    <div className="App">
      <ToastContainer />
      <Navbar
        isLoggedIn={!!token}
        setToken={setToken}
        user={user}
        fetchCart={fetchCart}
      />
      <Routes>
        <Route path="/" element={<LandingPage user={user} />} />
        <Route path="/cars" element={<AllCars user={user} />} />
        <Route path="/cars/:id" element={<SingleCar user={user} />} />
        <Route path="/orders/:id" element={<SingleOrderCar user={user} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/account"
          element={<Account setToken={setToken} setUser={setUser} />}
        />
        <Route
          path="/users"
          element={<AllUsers user={user} setUsersOrders={setUsersOrders} />}
        />
        <Route
          path="/orderhistory"
          element={<OrderHistory usersOrders={usersOrders} />}
        />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/listcar" element={<ListCar />} />
        <Route path="/cart" element={<Cart user={user} />} />
        <Route path="/orders" element={<Orders user={user} />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/settings" element={<Settings user={user} />} />
        <Route path="/success" element={<Success />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code/:token" element={<ValidateCode />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
      <BottomNavBar />
    </div>
  );
}

export default App;
