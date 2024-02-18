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
import Boards from "./pages/board/Boards";
import BoardWrite from "./pages/board/BoardWrite";
import BoardDetail from "./pages/board/BoardDetail";
import ChatList from "./pages/chatting/ChatList";
import ChatRoomCreate from "./pages/chatting/ChatRoomCreate";
import Chatting from "./pages/chatting/Chatting";
import KakaoMap from "./pages/KakaoMap";
import BloodPieChart from "./pages/PieChat";

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
              <Route path="/Boards" element={<Boards />} />
              <Route path="/BoardWrite" element={<BoardWrite />} />
              <Route path="/BoardDetail/:id" element={<BoardDetail />} />
              <Route path="/Chat" element={<ChatList />} />
              <Route path="/Chat-create" element={<ChatRoomCreate />} />
              <Route path="Chatting/:roomId" element={<Chatting />} />
              <Route path="KakaoMap" element={<KakaoMap />} />
              <Route path="PieChat" element={<BloodPieChart />} />
            </Route>
          </Routes>
        </Router>
      </UserStore>
    </>
  );
}

export default App;
