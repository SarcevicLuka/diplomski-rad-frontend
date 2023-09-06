import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routes from "./routes/Routes";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    console.log("App");
  }, []);

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
