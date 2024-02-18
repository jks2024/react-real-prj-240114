// 게시글 목록 : 리스트, 글쓰기 화면 이동, 리스트를 누르는 경우 상세 보여주기 이동
import React, { useState, useEffect } from "react";
import AxiosApi from "../../api/AxiosApi"; // 서버와 비동기 통신을 하기위한 API의 묶음
import styled from "styled-components"; // 화면 스타일링
import { useNavigate } from "react-router-dom"; // 화면 라우터 이동
import BoardList from "./BoardList";

// 카테고리 선택메뉴
// 게시글 목록
// 게시글 쓰기

const BoardContainer = styled.div`
  padding: 0 30px;
  position: relative;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
`;

const CircleFixedButton = styled.button`
  position: fixed; // 버튼을 부모 컨테이너에 대해 절대적 위치로 설정
  bottom: 24px;
  right: 30px;
  z-index: 10;

  width: 60px; // 버튼의 크기를 정사각형으로 설정
  height: 60px; // 버튼의 크기를 정사각형으로 설정
  border-radius: 50%; // 동그란 모양으로 만들기 위해 반지름을 50%로 설정

  display: flex; // Flexbox 레이아웃 사용
  justify-content: center; // 가로 중앙 정렬
  align-items: center; // 세로 중앙 정렬

  background-color: #1da1f2; // 트위터 색상
  color: white;
  font-size: 30px; // 플러스 기호 크기
  line-height: 1; // 기본 라인 높이 제거
  // 그림자 효과
  box-shadow: 1px 4px 8px rgba(0, 0, 0, 0.4);

  border: none; // 기본 테두리 제거
  cursor: pointer;
  outline: none; // 클릭 시 테두리 제거

  &:hover {
    background-color: #1991db; // 호버 시 배경색 변경
  }

  &:before {
    // 가상 요소로 플러스 기호 생성
    content: "+";
  }
`;

const CategorySelect = styled.select`
  // 카테고리 선택 드롭다운에 대한 스타일 정의
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  width: 200px; // 드롭다운 너비 조정
`;

const Boards = () => {
  const [boardList, setBoardList] = useState([]); // 게시글 목록에 대한 상태 관리
  const [categories, setCategories] = useState([]); // 카테고리 목록에 대한 상태 관리
  const [selectedCategory, setSelectedCategory] = useState("all"); // 현재 선택된 카테고리 관리
  const navigate = useNavigate(); // 페이지 이동을 위한 변수 생성

  // 생명주기 관리(마운트, 업데이트 언마운트)
  useEffect(() => {
    const getCategories = async () => {
      try {
        const rsp = await AxiosApi.cateList(); // 카테고리 목록 가져오기
        setCategories(rsp.data); // 서버에서 가져온 카테고리 목록으로 상태 관리
      } catch (e) {
        console.log(e);
      }
    };
    getCategories();
  }, []); // [] 마운트 이후 수행

  useEffect(() => {
    const boardList = async () => {
      try {
        const rsp = await AxiosApi.boardList();
        // 카테고리 필터 적용
        const filterList =
          selectedCategory === "all"
            ? rsp.data
            : rsp.data.filter(
                (board) => board.categoryId === parseInt(selectedCategory)
              );
        setBoardList(filterList);
      } catch (e) {
        console.log(e);
      }
    };
    boardList();
  }, [selectedCategory]); //카테고리 선택이 변경되면 useEffect 호출

  // 글쓰기 버튼 클릭 시
  const handleWriteClick = () => {
    navigate("/boardWrite");
  };

  // 글 상세 보기 버튼 클릭 시, 게시글 번호가 유일한 식별자 임
  const handleDetailClick = (id) => {
    navigate(`/boardDetail/${id}`);
  };

  return (
    <BoardContainer>
      <Title>게시판 목록</Title>
      <CategorySelect
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="all">전체</option>
        {categories.map((category) => (
          <option key={category.categoryId} value={category.categoryId}>
            {category.categoryName}
          </option>
        ))}
      </CategorySelect>
      <BoardList boardList={boardList} handleDetailClick={handleDetailClick} />
      <CircleFixedButton onClick={handleWriteClick}></CircleFixedButton>
    </BoardContainer>
  );
};

export default Boards;
