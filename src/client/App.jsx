import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AllCars from "./components/AllCars";
import SingleCar from "./components/SingleCar";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import ListCar from "./components/ListCar";
import Cart from "./components/Cart";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [user, setUser] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("TOKEN"));
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function getUser() {
      const { data } = await axios.get("/api/users", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("TOKEN"),
        },
      });
      setUser(data.user);
    }
    getUser();
  }, [user]);

  const addToCart = (car) => {
    setCart([...cart, car]);
  };
  return (
    <div className="App">
      <Navbar isLoggedIn={token !== null} setToken={setToken} cart={cart} />
      <Routes>
        <Route path="/" element={<AllCars addToCart={addToCart} />} />
        <Route path="/:id" element={<SingleCar />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/listcar" element={<ListCar />} />
        <Route path="/cart" element={<Cart cart={cart} />} />
      </Routes>
    </div>
  );
}

export default App;
