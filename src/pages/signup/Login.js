import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Items } from "../../component/LoginComponent";
import Input from "../../component/Input";
import Button from "../../component/Button";
import styled from "styled-components";
import imgLogo from "../../images/kakaoLion.png";
import AxiosApi from "../../api/AxiosApi";
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
        localStorage.setItem("email", inputEmail);
        localStorage.setItem("isLogin", "TRUE");
        navigate("/home");
      } else {
        alert("로그인 실패");
      }
    } catch (e) {
      console.log(e);
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

      <div className="footer">
        <p>
          저작권 ©<span style={{ fontWeight: "bold" }}>KyungSoo. Jeong</span>{" "}
          에게 모든 권한이 있습니다.
        </p>
      </div>
    </Container>
  );
};
export default Login;
