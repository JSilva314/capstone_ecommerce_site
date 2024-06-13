import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Typography,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";

const AllUsers = ({ user, setUsersOrders }) => {
  const [users, setUsers] = useState([]);
  const [refresher, setRefresher] = useState(false);
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [newUser, setNewUser] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user && user.Admin) {
      async function getUsers() {
        try {
          const token = localStorage.getItem("TOKEN");
          const { data } = await axios.get("/api/admin/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: user,
          });
          console.log("Fetched users:", data); // Debugging log
          if (Array.isArray(data)) {
            setUsers(data);
          } else {
            console.error("API response is not an array:", data);
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
      getUsers();
    }
  }, [user, refresher]);

  const handleUserDelete = async (currentUser) => {
    try {
      const token = localStorage.getItem("TOKEN");
      await axios.delete(`/api/admin/users/${currentUser.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: user,
      });
      setRefresher((prev) => !prev);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const navToOrders = (selectedUser) => {
    setUsersOrders(selectedUser);
    navigate("/orderhistory");
  };

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleOpenEditDialog = (currentUser) => {
    setNewUser({ ...currentUser });
    setOpenEditDialog(true);
  };
  const handleCloseEditDialog = () => {
    setNewUser({
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      phone: "",
    });
    setOpenEditDialog(false);
  };
  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCreateUser = async () => {
    if (newUser.password !== newUser.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("TOKEN");
      await axios.post("/api/admin/users", newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: user,
      });
      toast.success("User created successfully");
      handleCloseDialog();
      setRefresher((prev) => !prev);
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Error creating user");
    }
  };
  console.log(newUser)
  const handleEditUser = async () => {
    try {
      const token = localStorage.getItem("TOKEN");
      await axios.put(`/api/admin/users/${newUser.id}`, newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: user,
      });
      toast.success("User Details Updated Successfully.");
      handleCloseEditDialog();
      setRefresher((prev) => !prev);
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Error creating user");
    }
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Container>
      {user && user.Admin ? (
        <Box>
          <Typography variant="h2">All Users</Typography>
          <Box id="all_users_container">
            {Array.isArray(users) && users.length > 0 ? (
              users.map((currentUser) => (
                <Box
                  key={currentUser.id}
                  sx={{
                    border: "2px solid black",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "5px",
                  }}
                >
                  <Typography variant="h6">
                    Username: {currentUser.username}
                  </Typography>
                  <Typography variant="h6">
                    E-mail: {currentUser.email}
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleUserDelete(currentUser)}
                  >
                    Delete User
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navToOrders(currentUser)}
                  >
                    Orders
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpenEditDialog(currentUser)}
                  >
                    Update User
                  </Button>
                </Box>
              ))
            ) : (
              <Typography>No users found</Typography>
            )}
          </Box>
          <Button
            variant="contained"
            color="success"
            onClick={handleOpenDialog}
          >
            Create User
          </Button>
        </Box>
      ) : (
        <Typography variant="body1">Unauthorized for this action</Typography>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Create New User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Full Name"
            type="text"
            fullWidth
            name="fullName"
            value={newUser.fullName}
            onChange={handleNewUserChange}
          />
          <TextField
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            name="username"
            value={newUser.username}
            onChange={handleNewUserChange}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            name="email"
            value={newUser.email}
            onChange={handleNewUserChange}
          />
          <TextField
            margin="dense"
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            name="password"
            value={newUser.password}
            onChange={handleNewUserChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="dense"
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            name="confirmPassword"
            value={newUser.confirmPassword}
            onChange={handleNewUserChange}
          />
          <TextField
            margin="dense"
            label="Address"
            type="text"
            fullWidth
            name="address"
            value={newUser.address}
            onChange={handleNewUserChange}
          />
          <TextField
            margin="dense"
            label="Phone"
            type="text"
            fullWidth
            name="phone"
            value={newUser.phone}
            onChange={handleNewUserChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateUser} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Full Name"
            type="text"
            fullWidth
            name="fullName"
            value={newUser.fullName}
            onChange={handleNewUserChange}
          />
          <TextField
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            name="username"
            value={newUser.username}
            onChange={handleNewUserChange}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            name="email"
            disabled={true}
            value={newUser.email}
            onChange={handleNewUserChange}
          />

          <TextField
            margin="dense"
            label="Address"
            type="text"
            fullWidth
            name="address"
            value={newUser.address}
            onChange={handleNewUserChange}
          />
          <TextField
            margin="dense"
            label="Phone"
            type="text"
            fullWidth
            name="phone"
            value={newUser.phone}
            onChange={handleNewUserChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditUser} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AllUsers;
