import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllUsers = ({ user, setUsersOrders }) => {
  const [users, setUsers] = useState([]);
  const [refresher, setRefresher] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUsers() {
      try {
        const { data } = await axios.get("/api/users", {
          params: user,
        });
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    }
    getUsers();
  }, [refresher]);

  const handleUserDelete = async (currentUser) => {
    try {
      console.log(currentUser.id, "currentUser");
      // Assuming currentUser has an id property
      const response = await axios.delete(`/api/users/${currentUser.id}`);

      setRefresher((prev) => !prev);
      // Optionally, refresh the user list or update the UI accordingly
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const navToOrders = (selectedUser) => {
    setUsersOrders(selectedUser);
    navigate("/orderhistory");
  };
  return (
    <div>
      {user.Admin ? (
        <div>
          <h2> All Users </h2>
          <div id="all_users_container">
            {users.map((currentUser) => {
              return (
                <div
                  key={currentUser.id}
                  style={{ border: "2px solid black", marginBottom: "5px" }}
                >
                  <h3> Username: {currentUser.username} </h3>
                  <h3> E-mail: {currentUser.email} </h3>
                  <button
                    onClick={() => {
                      handleUserDelete(currentUser);
                    }}
                  >
                    Delete User
                  </button>
                  <button
                    onClick={() => {
                      navToOrders(currentUser);
                    }}
                  >
                    Orders
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p> Unauthorized for this action </p>
      )}
    </div>
  );
};

export default AllUsers;
