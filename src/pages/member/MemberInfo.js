import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import AxiosApi from "../../api/AxiosApi";
import Commons from "../../utils/Commons";
import { storage } from "../../api/firebase";
import { UserContext } from "../../context/UserStore";

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
  const { email } = useParams(); // 회원 목록에서 클릭한 사용자의 이메일
  const [member, setMember] = useState(""); // 회원 정보를 서버에서 가져와서 상태 관리
  const [editMode, setEditMode] = useState(false); // 회원정보 수정 모드
  const [editName, setEditName] = useState(""); // 회원이름 수정
  const [isCurrentUser, setIsCurrentUser] = useState(false); // 현재 로그인 유저인지 확인
  const [file, setFile] = useState(null); // 선택된 파일에 대한 상태관리
  const [url, setUrl] = useState(""); // 사진 경로 (파이어베이스의 업로드된 경로)
  const context = useContext(UserContext);
  const { setName, setImgUrl } = context;

  useEffect(() => {
    const memberInfo = async () => {
      try {
        const rsp = await AxiosApi.memberGetOne(email); // 회원 정보 가져오기
        setMember(rsp.data);
        setEditName(rsp.data.name);
        setUrl(rsp.data.image);
      } catch (e) {
        console.log(e);
      }
    };
    memberInfo();
    // 로컬스토리지에서 로그인한 사용자 정보 가져 오기
    const loginUserEmail = localStorage.getItem("email");
    // 로그인한 사용자와 글쓴이가 같은지 비교
    if (loginUserEmail === email) {
      setIsCurrentUser(true);
    }
  }, [email]);

  // 입력 필드 변경 처리
  const handleChange = (e) => {
    if (e.target.name === "file") {
      setFile(e.target.files[0]);
      console.log("선택된 파일의 경로", e.target.files[0]);
    } else {
      setEditName(e.target.value);
    }
  };

  // 회원 정보 업데이트 axios 호출
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 동작을 제거
    try {
      const rsp = await AxiosApi.menberUpdate(email, editName, url);
      if (rsp.status === 200) {
        setEditMode(false); // 수정을 비활성화
        setEditName(editName);
        const rsp = await AxiosApi.memberGetOne(email); // 수정 이후 조회
        setMember(rsp.data);
        setName(rsp.data.name);
        setUrl(rsp.data.image);
        setImgUrl(rsp.data.image);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleUploadClick = async () => {
    if (!file) {
      alert("파일을 선택해 주세요.");
      return;
    }
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file); // 파이어베이스에 생성한 스토리지에 파일 업로드
      // 업로드 후 이미지 URL 가져오기
      const uploadedUrl = await fileRef.getDownloadURL();
      console.log(uploadedUrl);
      setUrl(uploadedUrl);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <UserInfo>
        <UserImage src={url || "http://via.placeholder.com/160"} alt="User" />
        {!editMode ? (
          <UserName>{member.name}</UserName>
        ) : (
          <Input
            type="text"
            name="name"
            placeholder="이름을 입력하세요."
            value={editName}
            onChange={handleChange}
          />
        )}
      </UserInfo>
      {!editMode ? (
        <>
          <Field>
            <Label>Email : {member.email}</Label>
          </Field>
          <Field>
            <Label>가입일 : {Commons.formatDate(member.regDate)}</Label>
          </Field>
          {/* 현재 사용자가 로그인한 사용자인 경우에만 편집 버튼 표시 */}
          {isCurrentUser && (
            <SubmitButton onClick={() => setEditMode(true)}>편집</SubmitButton>
          )}
        </>
      ) : (
        <>
          <Field>
            <Label>이미지 업로드</Label>
            <input type="file" name="file" onChange={handleChange} />
            <SubmitButton onClick={handleUploadClick}>업로드</SubmitButton>
          </Field>
          {/* 필요한 다른 입력 필드 */}
          <SubmitButton onClick={handleSubmit}>전송</SubmitButton>
          <SubmitButton onClick={() => setEditMode(false)}>취소</SubmitButton>
        </>
      )}
    </Container>
  );
};

export default MemberInfo;
