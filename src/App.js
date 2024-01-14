import "./App.css";
import GlobalStyle from "./style/GlobalStyle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/signup/Login";
import Signup from "./pages/signup/Signup";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
