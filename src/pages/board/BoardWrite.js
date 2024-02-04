// 게시글 쓰기
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";
import styled from "styled-components";
import { storage } from "../../api/firebase"; // 사진 업로드 기능을 위해 파이어베이스 사용
import Modal from "../../component/Modal"; // 제어권을 가지고 있는 팝업

const FormContainer = styled.div`
  padding: 20px;
  margin: auto;
  max-width: 600px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const FieldContainer = styled.div`
  display: flex;
  align-items: center; // 수직 방향 중앙 정렬
  margin-bottom: 20px; // 하단 여백 추가
`;

const StyledLabel = styled.label`
  flex: 0 0 100px; // 라벨의 너비 고정
  margin-right: 10px; // 라벨과 입력 필드 사이 여백
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
`;

const StyledInput = styled.input`
  width: 90%; // 너비를 100%로 설정하여 컨테이너의 너비에 맞춤
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 20px; // 입력창 아래에 여백 추가
`;

const StyledTextarea = styled.textarea`
  width: 90%; // 너비를 100%로 설정하여 컨테이너의 너비에 맞춤
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  height: 100px;
`;

const SubmitButton = styled.button`
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; // 버튼을 중앙에 위치시킴
  margin-top: 20px; // 버튼 상단에 여백 추가
  gap: 10px; // 버튼 사이에 여백 추가
`;

const UserImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 5px;
  margin-top: 20px;
`;

const UploadButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledSelect = styled.select`
  width: 90%; // 너비 설정
  padding: 10px; // 패딩 추가
  border: 1px solid #ddd; // 테두리 스타일링
  border-radius: 4px; // 테두리 둥글게
  font-size: 16px; // 글꼴 크기
  background-color: white; // 배경색
  cursor: pointer; // 마우스 커서 변경
  margin-bottom: 20px; // 아래쪽 여백

  &:hover {
    border-color: #bcbcbc; // 호버 시 테두리 색상 변경
  }

  &:focus {
    outline: none;
    border-color: #4caf50; // 포커스 시 테두리 색상 변경
  }
`;

const BoardWrite = () => {
  const [title, setTitle] = useState(""); // 제목에 대한 상태 관리
  const [content, setContent] = useState(""); // 내용에 대한 상태 관리
  const [file, setFile] = useState(null); // 로컬에 있는 파일의 경로
  const [url, setUrl] = useState(null); // 파이어베이스 업로드 경로
  const [categories, setCategories] = useState([]); // 카테고리 목록 가져오기
  const [selectedCategory, setSelectedCategory] = useState(""); // 글쓰기에 대한 카테고리 선택
  const email = localStorage.getItem("email"); // 로그인 사용자 확인, 누가 글을 썼는지 확인 필요
  const navigate = useNavigate(); // 페이지 이동을 위해서

  // 모달 내용을 변경
  const [modalContent, setModalContent] = useState("");
  const [modalHeader, setModalHeader] = useState("실패");
  const [modalOpen, setModalOpen] = useState(false); // 초기값은 닫힌 상태
  const closeModal = () => {
    // 모달을 닫는 함수
    setModalOpen(false);
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const rsp = await AxiosApi.cateList();
        console.log(rsp.data);
        setCategories(rsp.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  // 제목의 내용이 변경 될 때 호출
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  // 본문의 내용이 변경 될 때 호출
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  // 로컬의 파일을 선택 할 때
  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  // 파일을 업로드 할 때
  const handleUploadClick = async () => {
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);

      // 파일 업로드
      await fileRef.put(file);
      console.log("파이어베이스에 파일 업로드 성공 !!!!");
      // 파이어베이스에 업로드된 사진의 URL 가져오기
      const url = await fileRef.getDownloadURL();
      console.log("저장 경로 확인 : ", url);
      setUrl(url); // 사진이 저장된 파이어베이스 경로
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async () => {
    console.log(title, content, selectedCategory, email, url);
    try {
      const rsp = await AxiosApi.boardWrite(
        email,
        title,
        selectedCategory,
        content,
        url
      );
      if (rsp.data) {
        setModalOpen(true);
        setModalHeader("성공");
        setModalContent("글쓰기 성공");
        //navigate("/Boards");
      } else {
        setModalOpen(true);
        setModalHeader("실패");
        setModalContent("글쓰기 실패");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const confirm = () => {
    navigate("/Boards");
  };
  // 글쓰기 취소 기능
  const handleReset = () => {
    setTitle("");
    setContent("");
    navigate("/Boards");
  };

  return (
    <FormContainer>
      <Title>글쓰기</Title>
      <FieldContainer>
        <StyledLabel htmlFor="category">카테고리</StyledLabel>
        <StyledSelect
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="" disabled selected>
            카테고리를 선택하세요
          </option>
          {categories.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </option>
          ))}
        </StyledSelect>
      </FieldContainer>

      <FieldContainer>
        <StyledLabel htmlFor="title">제목</StyledLabel>
        <StyledInput type="text" value={title} onChange={handleTitleChange} />
      </FieldContainer>
      <FieldContainer>
        <StyledLabel htmlFor="content">내용</StyledLabel>
        <StyledTextarea value={content} onChange={handleContentChange} />
      </FieldContainer>
      <FileUploadContainer>
        <StyledInput type="file" onChange={handleFileInputChange} />
        <UploadButton onClick={handleUploadClick}>Upload</UploadButton>
      </FileUploadContainer>
      {url && <UserImage src={url} alt="uploaded" />}
      <ButtonContainer>
        <SubmitButton onClick={handleSubmit}>글쓰기</SubmitButton>
        <SubmitButton onClick={handleReset}>취소</SubmitButton>
      </ButtonContainer>
      <Modal
        open={modalOpen}
        close={closeModal}
        header={modalHeader}
        type
        confirm={confirm}
      >
        {modalContent}
      </Modal>
    </FormContainer>
  );
};

export default BoardWrite;
