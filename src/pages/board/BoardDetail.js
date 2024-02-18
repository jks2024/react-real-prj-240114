import { useState, useEffect } from "react";
import AxiosApi from "../../api/AxiosApi";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Commons from "../../utils/Commons";

// 여기에 스타일드 컴포넌트를 정의합니다.
const Container = styled.div`
  padding: 20px;
  margin: 20px auto;
  max-width: 800px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 8px;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2em;
  margin-bottom: 10px;
`;

const Content = styled.p`
  color: #666;
  line-height: 1.5;
  white-space: pre-wrap; // 줄바꿈을 유지합니다.
`;

const CommentForm = styled.form`
  margin-top: 20px;
  clear: left;
`;

const BoardImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  margin-right: 15px;
  margin-bottom: 10px;
  float: left;
`;

const CommentInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;
const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CommentItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

const CommentContent = styled.p`
  color: #444;
  font-size: 1em;
  margin: 0;
  padding: 0;
`;
const CommentEmail = styled.p`
  display: flex;
  justify-content: space-between;
  color: #555;
  font-style: italic;
  font-size: 13px;
  margin: 0;
  padding: 0;
`;

const BoardDate = styled.p`
  color: #777;
  font-size: 0.8em;
  text-align: right;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

// 게시글 상세 보기와 댓글 목록을 보여주는 컴포넌트입니다.

const BoardDetail = () => {
  const { id } = useParams(); // BoardListItem에서 해당 항목을 클릭하면 id를 받아서 페이지 이동시 가져옴
  const [board, setBoard] = useState(""); // Board ID로 가져온 게시글에 대한 상태 관리
  const [comments, setComments] = useState(""); // 댓글에 대한 상태 관리
  const [inputComment, setInputComment] = useState(""); // 댓글 입력
  const [comAddFlag, setComAddFlag] = useState(false); // 댓글 추가 성공 여부
  const email = localStorage.getItem("email"); // 현재 로그인 사용자 확인
  const [showComments, setShowComments] = useState(false); // 댓글 목록 보여줄지 말지 토글
  const navigate = useNavigate();

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  // 로그인 사용자와 게시글 작성자가 동일한 경우 버튼 보여야 함
  // 게시글 삭제 시  (window.confirm(""정말로 삭제하시겠습니까?""))
  // 게시글 삭제 성공 시 게시글 목록 화면으로 이동
  const deleteBoard = () => {
    console.log("게시글 삭제하기 함수 호출");
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const delBoardApi = async () => {
        try {
          const rsp = await AxiosApi.boardDelete(id);
          if (rsp.data) {
            alert("게시글이 삭제되었습니다.");
            navigate("/Boards");
          }
        } catch (e) {
          console.log(e);
        }
      };
      delBoardApi();
    }
  };

  useEffect(() => {
    const getBoardDetail = async () => {
      console.log("getBoardDetail : " + id);
      try {
        const response = await AxiosApi.boardDetail(id);
        setBoard(response.data);
        const response2 = await AxiosApi.commentList(id);
        setComments(response2.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBoardDetail();
  }, [comAddFlag, id]);

  const handleCommentChange = (e) => {
    setInputComment(e.target.value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosApi.commentWrite(email, id, inputComment);
      console.log(response);
      setInputComment("");
      setComAddFlag(!comAddFlag);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <BoardImage
        src={board.img ? board.img : "http://via.placeholder.com/160"}
        alt="Board image"
      />
      <Title>{board.title}</Title>
      <Content>{board.content}</Content>
      <BoardDate>{Commons.timeFromNow(board.regDate)}</BoardDate>

      <ButtonContainer>
        <Button onClick={toggleComments}>
          {showComments ? "댓글 숨기기" : `댓글 ${comments.length}개 보기`}
        </Button>
        {email === board.email && <Button onClick={deleteBoard}>삭제</Button>}
      </ButtonContainer>

      <CommentForm onSubmit={handleSubmitComment}>
        <label>
          <CommentInput
            type="text"
            value={inputComment}
            onChange={handleCommentChange}
          />
        </label>
        <SubmitButton type="submit">댓글 추가</SubmitButton>
      </CommentForm>
      {showComments && (
        <CommentList>
          {comments &&
            comments.map((comment) => (
              <CommentItem key={comment.commentId}>
                <CommentEmail>
                  <p>{comment.email}</p>
                  <p>{Commons.timeFromNow(comment.regDate)}</p>
                </CommentEmail>
                <CommentContent>{comment.content}</CommentContent>
              </CommentItem>
            ))}
        </CommentList>
      )}
    </Container>
  );
};

export default BoardDetail;
