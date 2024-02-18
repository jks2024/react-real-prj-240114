import styled from "styled-components";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";
import Commons from "../../utils/Commons";

// 스타일 컴포넌트 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px; // 버튼 사이의 간격
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const ChatRoomCreate = () => {
  const [chatRoomTitle, setChatRoomTitle] = useState(); // 채팅방 제목 관리
  const navigate = useNavigate(); // 페이지 이동
  const email = localStorage.getItem("email"); // 로컬스토리지에 저장된 정보를 가져옴

  // 채팅방 개설을 위한 Axois API 호출
  const handleCreateChatRoom = async () => {
    try {
      const rsp = await AxiosApi.chatCreate(email, chatRoomTitle);
      console.log(rsp.data); // 채팅방 식별자가 넘어옴
      navigate(`/chatting/${rsp.data}`);
    } catch (e) {
      console.log(e);
    }
  };
  // 채팅방 개설 취소
  const handleCancel = () => {
    navigate(-1); // 이전 화면으로 이동하기 위해서 스택을 pop함
  };
  return (
    <Container>
      <Title>채팅방 생성</Title>
      <Input
        type="text"
        value={chatRoomTitle}
        onChange={(e) => setChatRoomTitle(e.target.value)}
      />
      <ButtonContainer>
        <Button onClick={handleCreateChatRoom}>확인</Button>
        <Button onClick={handleCancel}>취소</Button>
      </ButtonContainer>
    </Container>
  );
};

export default ChatRoomCreate;
