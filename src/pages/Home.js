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
      case 4:
        navigate("/themesetting");
        break;
      case 5:
        navigate("/category");
        break;
      case 6:
        navigate("/Chat");
        break;
      case 7:
        navigate("/KakaoMap");
        break;
      case 8:
        navigate("/PieChat");
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
        <TransBtn onClick={() => onClickBtn(4)}>테마 설정</TransBtn>
        <TransBtn onClick={() => onClickBtn(5)}>카테고리 설정</TransBtn>
        <TransBtn onClick={() => onClickBtn(6)}>채팅</TransBtn>
        <TransBtn onClick={() => onClickBtn(7)}>카카오맵</TransBtn>
        <TransBtn onClick={() => onClickBtn(8)}>파이 챠트</TransBtn>
      </ButtonContainer>
    </div>
  );
};
export default Home;
