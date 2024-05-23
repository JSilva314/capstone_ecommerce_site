import React, { useEffect, useState } from "react";
import axios from "axios";

const AllUsers = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [refresher, setRefresher] = useState(false);

  useEffect(() => {
    console.log("rendering");
    async function getUsers() {
      try {
        const { data } = await axios.get("/api/users", {
          params: user,
        });
        handleSetData(data);
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    }
    getUsers();
  }, [refresher, users]);
  function handleSetUser(data) {
    setUsers(data);
  }
  const handleUserDelete = async (currentUser) => {
    try {
      // Assuming currentUser has an id property
      const response = await axios.delete(`/api/users/${currentUser.id}`);
      console.log(response.data);
      setRefresher((prev) => !prev);
      // Optionally, refresh the user list or update the UI accordingly
    } catch (error) {
      console.error("Error deleting user:", error);
    }
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
