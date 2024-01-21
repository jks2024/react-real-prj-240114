import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import AxiosApi from "../../api/AxiosApi";
import Commons from "../../utils/Commons";

const Container = styled.div`
  padding: 24px;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 320px;
  margin: 20px auto;
  background: rgba(0, 0, 0, 0.2);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const UserName = styled.h2`
  margin-left: 20px;
`;

const UserImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  margin-right: 10px;
`;

const Field = styled.div`
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;
const Label = styled.label`
  display: block;
  margin: 20px 30px;
  font-weight: bold;
`;
const SubmitButton = styled.button`
  padding: 8px;
  background-color: #4caf50;
  width: 60px;
  margin-left: 4px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #2c7d32;
  }
`;

const MemberInfo = () => {
  const { email } = useParams();
  const [member, setMember] = useState("");

  useEffect(() => {
    const memberInfo = async () => {
      try {
        const rsp = await AxiosApi.memberGetOne(email);
        setMember(rsp.data);
      } catch (e) {
        console.log(e);
      }
    };
    memberInfo();
  }, [email]);
  return (
    <Container>
      <UserInfo>
        <UserImage src={"http://via.placeholder.com/160"} alt="User" />
        <UserName>{member.name}</UserName>
      </UserInfo>
      <Field>
        <Label>Email : {member.email}</Label>
      </Field>
      <Field>
        <Label>가입일 : {Commons.formatDate(member.regDate)}</Label>
      </Field>
    </Container>
  );
};

export default MemberInfo;
