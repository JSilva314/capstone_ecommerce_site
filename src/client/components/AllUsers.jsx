import React, { useEffect, useState } from "react";
import axios from "axios";

const AllUsers = ({ isAdmin }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const { data: foundUsers } = await axios.get("/api/users");
        setUsers(foundUsers);
      } catch (error) {
        console.error(error);
      }
    }
    getUsers();
  }, []);

  return (
    <div>
      {isAdmin === "true" ? (
        <div>
          <h2> All Users </h2>
          <div id="all_users_container">
            {users.map((user) => {
              return (
                <div
                  key={user.id}
                  style={{ border: "2px solid black", marginBottom: "5px" }}
                >
                  <h3> Username: {user.username} </h3>
                  <h3> E-mail: {user.email} </h3>
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