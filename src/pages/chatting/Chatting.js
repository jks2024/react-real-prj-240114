import React, { useEffect, useState, useRef } from "react";
import AxiosApi from "../../api/AxiosApi";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import Commons from "../../utils/Commons";
// useRef : 화면의 특정 위치로 이동할 때, 값을 유지하면서 상태 관리를 하지 않을 때
// useParams : 라우터로 페이지 이동 시 정보를 전달 할 때 사용

const ChatContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 10px auto;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const ChatHeader = styled.div`
  font-size: 1.3em;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  overflow-y: auto;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 20px;
`;

const Message = styled.div`
  max-width: 60%;
  padding: 10px;
  margin: 10px;
  border-radius: 20px;
  background-color: ${(props) => (props.isSender ? "#DCF8C6" : "#E0E0E0")};
  align-self: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
  border: ${(props) =>
    props.isSender ? "1px solid #DCF8C6" : "1px solid #E0E0E0"};
`;

const Input = styled.input`
  padding: 10px;
  width: 84%;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const SendButton = styled.button`
  padding: 10px 15px;
  border: none;
  width: 100px;
  background-color: #4caf50;
  box-shadow: 1px 1px 1px #ccc;
  color: white;
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;
const CloseButton = styled.button`
  padding: 10px 15px;
  border: none;
  background-color: #f44336;
  color: white;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

const Chatting = () => {
  const [socketConnected, setSocketConnected] = useState(false); // 웹소켓 연결 여부, 연결이후에 정보 전달 가능
  const [inputMsg, setInputMsg] = useState(""); // 입력 메시지
  const [chatList, setChatList] = useState([]); // 채팅 목록
  const { roomId } = useParams(); // 채팅방 번호
  const [sender, setSender] = useState(""); // 보낸 사람
  const [roomName, setRoomName] = useState(""); // 채팅방 이름
  const ws = useRef(null); // 웹소켓 객체 생성, 소켓 연결 정보를 유지해야 하지만 렌더링과는 관련 없어야 함
  const navigate = useNavigate(); // 페이지 이동
  const email = localStorage.getItem("email");

  const onChangeMsg = (e) => {
    setInputMsg(e.target.value);
  };
  const onEnterKey = (e) => {
    // 엔터키 입력 시, 공백 제거 후 비어있지 않으면
    if (e.key === "Enter" && inputMsg.trim() !== "") {
      e.preventDefault(); // 기존 이벤트 무시
      onClickMsgSend(e); // 입력 메시지를 전송하는 함수
    }
  };
  const onClickMsgSend = (e) => {
    // 메시지 전송 (소켓 통신), useRef에 값을 저장하기 위해서는 current 메소드 사용해야 함
    ws.current.send(
      JSON.stringify({
        // 자바스크립트 객체를 JSON으로 변환
        type: "TALK",
        roomId: roomId,
        sender: sender,
        message: inputMsg,
      })
    );
    setInputMsg(""); // 전송 이후 초기화
  };
  // 채팅 종료
  const onClickMsgClose = () => {
    ws.current.send(
      JSON.stringify({
        // 자바스크립트 객체를 JSON으로 변환
        type: "CLOSE",
        roomId: roomId,
        sender: sender,
        message: inputMsg,
      })
    );
    ws.current.close(); // 생성된 소켓을 닫음
    navigate("/Chat");
  };

  // 이메일로 회원 정보 가져 오기
  useEffect(() => {
    const getMember = async () => {
      try {
        const rsp = await AxiosApi.memberGetOne(email);
        console.log(rsp.data.name);
        setSender(rsp.data.name); // 누가채팅 메시지를 보냈는지 확인을 위해서 이름 가져옴
      } catch (e) {
        console.log(e);
      }
    };
    getMember();
  }, []); // [] 의존성 배열이라하며, 의존성 배열이 비어 있으면 마운트 시점에서 호출 됨

  // 채팅방 정보 가져 오기
  useEffect(() => {
    const getChatRoom = async () => {
      try {
        const rsp = await AxiosApi.chatDetail(roomId); // 채팅방 이름 가져 오기
        console.log(rsp.data.name);
        setRoomName(rsp.data.name);
      } catch (e) {
        console.log(e);
      }
    };
    getChatRoom();
  });

  // 웹 소켓 연결
  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket(AxiosApi.SOCKET_URL);
      ws.current.onopen = () => {
        // 웹소켓이 연결되면
        setSocketConnected(true);
      };
    }
    if (socketConnected) {
      ws.current.send(
        JSON.stringify({
          // 서버에 입장 메시지 전송
          type: "ENTER",
          roomId: roomId,
          sender: sender,
          message: "처음으로 접속 합니다.",
        })
      );
    }
    ws.current.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      setChatList((prevItems) => [...prevItems, data]); // 기존 채팅 리스트에 새롭게 수신된 채팅글 추가
    };
  }, [socketConnected]);

  // 화면 하단으로 자동 스크롤
  const chatContainerRef = useRef(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatList]); // 채팅글 목록이 갱신되면 useEffect가 실행되고, 이 때 chatContainerRef의 위치 변경
  return (
    <ChatContainer>
      <ChatHeader>채팅방 {roomName}</ChatHeader>
      <MessagesContainer ref={chatContainerRef}>
        {chatList.map((chat, index) => (
          <Message key={index} isSender={chat.sender === sender}>
            {`${chat.sender} > ${chat.message}`}
          </Message>
        ))}
      </MessagesContainer>
      <div>
        <Input
          placeholder="문자 전송"
          value={inputMsg}
          onChange={onChangeMsg}
          onKeyUp={onEnterKey}
        />
        <SendButton onClick={onClickMsgSend}>전송</SendButton>
      </div>
      <CloseButton onClick={onClickMsgClose}>채팅 종료 하기</CloseButton>
    </ChatContainer>
  );
};

export default Chatting;
