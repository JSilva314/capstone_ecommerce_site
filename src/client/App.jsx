import { useEffect, useState } from "react";
// import { muiTypography } from "./components/muiTypography";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AllCars from "./components/AllCars";
import SingleCar from "./components/SingleCar";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import ListCar from "./components/ListCar";
import Orders from "./components/Order";
import axios from "axios";
import Cart from "./components/Cart";
import BottomNavBar from "./components/BottomNavBar"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./main.jsx";
import Success from "./components/Success.jsx";

function App() {
  const [user, setUser] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("TOKEN"));

  useEffect(() => {
    async function getUser() {
      const { data } = await axios.get("/api/profile", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("TOKEN"),
        },
      });
      console.log(data);
      setUser(data);
    }
    getUser();
  }, []);
  return (
    <div className="App">
      <ToastContainer />
      <Navbar isLoggedIn={token !== null} setToken={setToken} />
      <Routes>
        <Route path="/" element={<AllCars />} />
        <Route path="/:id" element={<SingleCar user={user} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/listcar" element={<ListCar />} />
        <Route path="/cart" element={<Cart user={user} />} />
        <Route path="/orders" element={<Orders user={user} />} />
        <Route path="/success" element={<Success />} />
      </Routes>
      <BottomNavBar />
    </div>
  );
}

export default App;
