import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Items } from "../../style/LoginStyle";
import Input from "../../component/Input";
import Button from "../../component/Button";
import styled from "styled-components";
import imgLogo from "../../images/kakaoLion.png";
import AxiosApi from "../../api/AxiosApi";
import Modal from "../../component/Modal"; // 제어권을 가지고 있는 팝업

const Img = styled.img`
  width: 120px;
  object-fit: cover;
`;

const Login = () => {
  // 키보드 입력 받기
  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");
  // 유효성 검사
  const [isEmail, setIsEmail] = useState(""); // 이메일 입력 여부
  const [isPw, setIsPw] = useState(""); // 패스워드 입력 여부

  // 모달 내용을 변경
  const [modalContent, setModalContent] = useState("");
  // 모달 팝업 처리
  const [modalOpen, setModalOpen] = useState(false); // 초기값은 닫힌 상태
  const closeModal = () => {
    // 모달을 닫는 함수
    setModalOpen(false);
  };

  const navigate = useNavigate();

  const onChangeEmail = (e) => {
    setInputEmail(e.target.value);
    e.target.value.length > 5 ? setIsEmail(true) : setIsEmail(false);
  };
  const onChangePw = (e) => {
    setInputPw(e.target.value);
    e.target.value.length >= 5 ? setIsPw(true) : setIsPw(false);
  };
  // 버튼이 눌려지는 경우 서버 통신을 위한 함수
  const onClickLogin = async () => {
    // 로그인을 위해 axios호출
    try {
      const rsp = await AxiosApi.memberLogin(inputEmail, inputPw);
      console.log(rsp.data);
      if (rsp.data) {
        localStorage.setItem("email", inputEmail); // 저장
        localStorage.setItem("isLogin", "TRUE");
        navigate("/home");
      } else {
        // 서버의 응답을 줬지만 성공이 아닌 경우
        setModalOpen(true);
        setModalContent("아이디 및 패스워드를 재 확인 해 주세요.");
      }
    } catch (e) {
      // 서버가 응답하지 않는 경우
      setModalOpen(true);
      setModalContent("서버가 응답하지 않습니다.");
    }
  };

  return (
    <Container>
      <Items className="item1">
        <Img src={imgLogo} alt="logo" />
      </Items>
      <Items className="item2">
        <Input
          placeholder="이메일"
          value={inputEmail}
          onChange={onChangeEmail}
        />
      </Items>
      <Items className="item2">
        <Input placeholder="패스워드" value={inputPw} onChange={onChangePw} />
      </Items>
      <Items className="signup">
        <Link to="/Signup" className="link_style">
          <span>Sign Up</span>
        </Link>
      </Items>
      <Items className="item2">
        {isEmail && isPw ? (
          <Button enabled onClick={onClickLogin}>
            SIGN IN
          </Button>
        ) : (
          <Button disabled>SIGN IN</Button>
        )}
      </Items>
      <Modal open={modalOpen} close={closeModal} header="오류">
        {modalContent}
      </Modal>
    </Container>
  );
};
export default Login;
