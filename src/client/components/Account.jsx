import { SettingsSuggestRounded, SettingsSystemDaydreamOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Account = ({ setToken, setUser }) => {
  const navigate = useNavigate();

  const logOutHandler = () => {
    localStorage.removeItem("TOKEN");
    setToken(null);
    setUser(null)
    navigate("/");
  };

  return <button onClick={logOutHandler}>Log Out</button>;
};
export default Account;
