import "./App.css";
import GlobalStyle from "./style/GlobalStyle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/signup/Login";
import Signup from "./pages/signup/Signup";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Members from "./pages/member/Members";
import MemberInfo from "./pages/member/MemberInfo";
import UserStore from "./context/UserStore";
import ThemeSetting from "./pages/setting/ThemeSetting";
import Category from "./pages/board/Category";

function App() {
  return (
    <>
      <GlobalStyle />
      <UserStore>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route element={<Layout />}>
              <Route path="/Home" element={<Home />} />
              <Route path="/Members" element={<Members />} />
              <Route path="/MemberInfo/:email" element={<MemberInfo />} />
              <Route path="/ThemeSetting" element={<ThemeSetting />} />
              <Route path="/Category" element={<Category />} />
            </Route>
          </Routes>
        </Router>
      </UserStore>
    </>
  );
}

export default App;
