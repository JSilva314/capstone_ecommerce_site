import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Login from "./components/Login";
import { muiTypography } from "./components/muiTypography";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <muiTypography />
    </div>
  );
}

export default App;
