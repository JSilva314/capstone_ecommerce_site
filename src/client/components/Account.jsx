import { SettingsSystemDaydreamOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Account = ({ setToken, setIsAdmin }) => {
  const navigate = useNavigate();

  const logOutHandler = () => {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("Admin");
    setToken(null);
    setIsAdmin(null);
    navigate("/");
  };

  return <button onClick={logOutHandler}>Log Out</button>;
};
export default Account;
