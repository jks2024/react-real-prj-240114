import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";
import Input from "../../component/Input";
import Button from "../../component/Button";
import { Container, Items } from "../../style/LoginStyle";
import Modal from "../../component/Modal";
// 이메일 입력시 서버와 통신해서 가입된 이메일인지 실시간 확인 하기
// 모달 박스는 우선 넣지 말고 alert 팝업으로 띄우고 가능하면 추가하기

const Signup = () => {
  const navigate = useNavigate();
  // 키보드 입력
  const [inputPw, setInputPw] = useState("");
  const [inputConPw, setInputConPw] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  // 오류 메시지
  const [pwMessage, setPwMessage] = useState("");
  const [conPwMessage, setConPwMessage] = useState("");
  const [mailMessage, setMailMessage] = useState("");

  // 유효성 검사
  const [isMail, setIsMail] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isConPw, setIsConPw] = useState(false);
  const [isName, setIsName] = useState(false);

  // 모달 팝업
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("중복된 아이디 입니다.");
  const closeModal = () => setModalOpen(false);

  const onChangeMail = (e) => {
    setInputEmail(e.target.value);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(e.target.value)) {
      setMailMessage("이메일 형식이 올바르지 않습니다.");
      setIsMail(false);
    } else {
      setMailMessage("올바른 형식 입니다.");
      setIsMail(true);
      memberRegCheck(e.target.value);
    }
  };
  const onChangePw = (e) => {
    //const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setInputPw(passwordCurrent);
    if (!passwordRegex.test(passwordCurrent)) {
      setPwMessage("숫자+영문자 조합으로 8자리 이상 입력해주세요!");
      setIsPw(false);
    } else {
      setPwMessage("안전한 비밀번호에요 : )");
      setIsPw(true);
    }
  };
  const onChangeConPw = (e) => {
    const passwordCurrent = e.target.value;
    setInputConPw(passwordCurrent);
    if (passwordCurrent !== inputPw) {
      setConPwMessage("비밀 번호가 일치하지 않습니다.");
      setIsConPw(false);
    } else {
      setConPwMessage("비밀 번호가 일치 합니다. )");
      setIsConPw(true);
    }
  };
  const onChangeName = (e) => {
    setInputName(e.target.value);
    setIsName(true);
  };
  // 회원 가입 여부 확인
  const memberRegCheck = async (email) => {
    try {
      const resp = await AxiosApi.memberRegCheck(email);
      console.log("가입 가능 여부 확인 : ", resp.data);

      if (resp.data) {
        setMailMessage("사용 가능한 이메일 입니다.");
        setIsMail(true);
      } else {
        setMailMessage("중복된 이메일 입니다.");
        setIsMail(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onClickLogin = async () => {
    try {
      const memberReg = await AxiosApi.memberReg(
        inputEmail,
        inputPw,
        inputName
      );
      console.log(memberReg.data);
      if (memberReg.data) {
        navigate("/");
      } else {
        setModalOpen(true);
        setModalText("회원 가입에 실패 했습니다.");
      }
    } catch (e) {
      console.log(e);
      setModalOpen(true);
      setModalText("회원 가입에 실패 했습니다.");
    }
  };

  return (
    <Container>
      <Items className="sign">
        <span>Sign Up</span>
      </Items>

      <Items className="item2">
        <Input
          type="email"
          placeholder="이메일"
          value={inputEmail}
          onChange={onChangeMail}
        />
      </Items>
      <Items className="hint">
        {inputEmail.length > 0 && (
          <span className={`${isMail ? "success" : "error"}`}>
            {mailMessage}
          </span>
        )}
      </Items>
      <Items className="item2">
        <Input
          type="password"
          placeholder="패스워드"
          value={inputPw}
          onChange={onChangePw}
        />
      </Items>
      <Items className="hint">
        {inputPw.length > 0 && (
          <span className={`${isPw ? "success" : "error"}`}>{pwMessage}</span>
        )}
      </Items>
      <Items className="item2">
        <Input
          type="password"
          placeholder="패스워드 확인"
          value={inputConPw}
          onChange={onChangeConPw}
        />
      </Items>
      <Items className="hint">
        {inputPw.length > 0 && (
          <span className={`${isConPw ? "success" : "error"}`}>
            {conPwMessage}
          </span>
        )}
      </Items>
      <Items className="item2">
        <Input
          type="text"
          placeholder="이름"
          value={inputName}
          onChange={onChangeName}
        />
      </Items>

      <Items className="item2">
        {isMail && isPw && isConPw && isName ? (
          <Button enabled onClick={onClickLogin}>
            NEXT
          </Button>
        ) : (
          <Button disabled>NEXT</Button>
        )}
      </Items>
      <Modal open={modalOpen} close={closeModal} header="오류">
        {modalText}
      </Modal>
    </Container>
  );
};
export default Signup;
