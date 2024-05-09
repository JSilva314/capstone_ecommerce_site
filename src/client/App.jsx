import { useEffect, useState } from "react";
// import { muiTypography } from "./components/muiTypography";
import { Route, Routes } from "react-router-dom";
import AllCars from "./components/AllCars";
import SingleCar from "./components/SingleCar";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import ListCar from "./components/ListCar";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [user, setUser] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("TOKEN"));

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
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<AllCars />} />
        <Route path="/:id" element={<SingleCar />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/listcar" element={<ListCar />} />
      </Routes>
    </div>
  );
}

export default App;
