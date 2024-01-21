import { Outlet } from "react-router-dom"; // 자식 컴포넌트를 특정영역에 포함시키는 것
import {
  Container,
  StyledSideMenu,
  StyledMenuList,
  StyledMenuItem,
  MenuIcon,
  StyledLink,
  Dummy,
} from "../style/LayoutStyle";
import { useState } from "react"; // 상태 관린
import { useNavigate } from "react-router-dom"; // 페이지 이동
import { GiHamburgerMenu } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import { LuListTodo } from "react-icons/lu";
import { FaHome, FaClipboardList, FaRegNewspaper } from "react-icons/fa";
import { BiCameraMovie } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 사이드바 메뉴 열기/닫기
  const navigate = useNavigate(); // 페이지 이동

  const onClickLeft = () => {
    setIsMenuOpen(true);
  };
  const onClickRight = () => {
    navigate("/setting");
  };
  return (
    <Container>
      <header className="mainhead">
        <div className="logo2">
          <GiHamburgerMenu size={32} color="white" onClick={onClickLeft} />
        </div>
        <div className="bell">
          <FiSettings size={32} color="white" onClick={onClickRight} />
        </div>
        <StyledSideMenu
          isOpen={isMenuOpen}
          onClick={() => setIsMenuOpen(false)}
        >
          <StyledMenuList>
            <StyledMenuItem>
              <MenuIcon>
                <FaHome />
              </MenuIcon>
              <StyledLink to="/home">Home</StyledLink>
            </StyledMenuItem>
            <StyledMenuItem>
              <MenuIcon>
                <FaClipboardList />
              </MenuIcon>
              <StyledLink to="/Boards">Boards</StyledLink>
            </StyledMenuItem>
            <StyledMenuItem>
              <MenuIcon>
                <FaRegNewspaper />
              </MenuIcon>
              <StyledLink to="/News">News</StyledLink>
            </StyledMenuItem>
            <StyledMenuItem>
              <MenuIcon>
                <CgProfile />
              </MenuIcon>
              <StyledLink to="/Members">Members</StyledLink>
            </StyledMenuItem>
            <StyledMenuItem>
              <MenuIcon>
                <BiCameraMovie />
              </MenuIcon>
              <StyledLink to="/Movies">Movies</StyledLink>
            </StyledMenuItem>
            <StyledMenuItem>
              <MenuIcon>
                <LuListTodo />
              </MenuIcon>
              <StyledLink to="/ToDos">ToDos</StyledLink>
            </StyledMenuItem>
          </StyledMenuList>
        </StyledSideMenu>
      </header>
      <main>
        <Dummy />
        <Outlet />
      </main>
    </Container>
  );
};

export default Layout;
