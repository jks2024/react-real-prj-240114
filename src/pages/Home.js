import { useNavigate } from "react-router-dom";
import { ButtonContainer, TransBtn } from "../style/ButtonStyle";

const Home = () => {
  const isLogin = localStorage.getItem("isLogin");
  const navigate = useNavigate();
  if (isLogin !== "TRUE") navigate("/");
  const onClickBtn = (num) => {
    switch (num) {
      case 1:
        navigate("/members");
        break;
      case 2:
        navigate("/boards");
        break;
      case 3:
        navigate("/category");
        break;
      default:
    }
  };

  return (
    <div>
      <ButtonContainer>
        <TransBtn onClick={() => onClickBtn(1)}>회원리스트</TransBtn>
        <TransBtn onClick={() => onClickBtn(2)}>게시판</TransBtn>
        <TransBtn onClick={() => onClickBtn(3)}>카테고리</TransBtn>
      </ButtonContainer>
    </div>
  );
};
export default Home;
