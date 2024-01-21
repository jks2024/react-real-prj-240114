import { useState, useEffect } from "react";
import AxiosApi from "../../api/AxiosApi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Commons from "../../utils/Commons";

const Container = styled.div`
  display: flex;
  width: 100%;
  direction: column;
  flex-wrap: wrap;
  margin: 20px auto;
`;

const MemberInfoWrapper = styled.div`
  display: flex;
  margin: 10px;
  width: 100%;
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  background-color: antiquewhite;
`;

const UserInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const UserImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  margin-right: 10px;
`;

const MemberName = styled.span`
  font-style: italic;
  font-size: 1.2rem;
  color: #333;
  margin: 10px;
`;

const MemberEmail = styled.span`
  color: #555;
  margin-right: px;
  margin-bottom: 10px;
`;

const MemberJoinDate = styled.span`
  font-size: 0.8rem;
  color: #777;
  margin-right: 10px;
`;

const Members = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState("");
  const isLogin = localStorage.getItem("isLogin");
  if (isLogin !== "TRUE") navigate("/"); // 로그인이 안되어 있으면 로그인 화면으로 이동

  // useEffect는 콜백함수와 의존성배열이 매개변수로 전달 됨
  // useEffect는 생명주기와 관련된 동작을 정의 함
  // [] 의존성 배열이 비어있는 경우는 화면이 마운드되는 시점에만 동작(화면을 그려주고 난 다음)
  useEffect(() => {
    const membersFunc = async () => {
      const rsp = await AxiosApi.membersGet();
      console.log(rsp.data);
      setMembers(rsp.data);
    };
    membersFunc();
  }, []);

  // 회원 상세 보기로 이동
  const onClickMember = (email) => {
    console.log("클릭된 회원 : " + email);
    navigate(`/memberInfo/${email}`);
  };
  return (
    <Container>
      {members &&
        members.map((member) => (
          <MemberInfoWrapper
            key={member.email}
            onClick={() => onClickMember(member.email)}
          >
            <UserImage src={member.image} />
            <UserInfo>
              <MemberName>이름: {member.name}</MemberName>
              <MemberEmail>이메일: {member.email}</MemberEmail>
              <MemberJoinDate>
                가입일: {Commons.formatDate(member.regDate)}
              </MemberJoinDate>
            </UserInfo>
          </MemberInfoWrapper>
        ))}
    </Container>
  );
};
export default Members;
