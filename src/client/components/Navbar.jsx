import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  function handleLogout() {
    window.localStorage.removeItem("TOKEN");
  }
  return (
    <div>
      <Link to="/">
        <button>All Cars</button>
      </Link>
      <Link to="/listcar">
        <button>List Car</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/register">
        <button>Register</button>
      </Link>
      <button onClick={handleLogout}>Logout</button>

      <button onClick={() => console.log("clicked login")}>Login</button>
    </div>
  );
}
export default Navbar;
