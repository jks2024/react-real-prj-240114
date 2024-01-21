import styled from "styled-components";
import { Link } from "react-router-dom";

// 색상 상수 정의
const defaultBackgroundColor = "#f9aa06";
const sideMenuBackgroundColor = "#eee";

// 컨테이너 스타일드 컴포넌트
export const Container = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  margin: auto;
  background-color: ${(props) => props.color || defaultBackgroundColor};

  .mainhead {
    display: flex;
    justify-content: space-between;
    position: fixed;
    height: 54px;
    width: 100%;
    background-color: ${(props) => props.color || defaultBackgroundColor};
    z-index: 100;
    top: 0;
    left: 0;

    .logo2 {
      margin-top: 12px;
      margin-left: 34px;
    }
    .bell {
      margin-top: 12px;
      margin-right: 34px;
    }
  }
  .bdlogo {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: center;
  }
`;

// 사이드 메뉴 스타일드 컴포넌트
export const StyledSideMenu = styled.div`
  position: fixed;
  left: 0;
  width: 250px;
  height: 100%;
  background-color: ${sideMenuBackgroundColor};
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  border-top-right-radius: 10px;
  transform: ${(props) =>
    props.isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease;
`;

export const StyledMenuList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const StyledMenuItem = styled.li`
  padding: 10px 20px;
  border-bottom: 1px solid #ccc; /* 중복 제거 가능 */
  display: flex;
  align-items: center;
`;

export const MenuIcon = styled.span`
  margin-right: 10px;
  margin-top: 2px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    color: #3498db;
  }
`;

export const Dummy = styled.div`
  height: 54px;
`;
