import React from "react";
import styled from "styled-components";
import Commons from "../../utils/Commons";

const BoardImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  margin-right: 15px;
`;

const BoardLi = styled.li`
  background-color: #f2f2f2;
  margin: 10px 0;
  padding: 10px 14px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
`;

const BoardTitle = styled.h2`
  font-size: 1.4em;
  color: #007bff;
  margin: 0 0 10px;
`;

const BoardContent = styled.p`
  color: #444;
  font-size: 1em;
`;

const BoardDate = styled.p`
  color: #777;
  font-size: 0.8em;
  text-align: right;
`;

const BoardContentWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  padding-top: 10px;
`;

const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserId = styled.span`
  color: #555;
  font-style: italic;
  font-size: 13px;
`;

const BoardListItem = ({ board, handleDetailClick }) => {
  return (
    <BoardLi onClick={() => handleDetailClick(board.boardId)}>
      <BoardImage
        src={board.img ? board.img : "http://via.placeholder.com/160"}
        alt="Board image"
      />
      <BoardContentWrapper>
        <BoardHeader>
          <BoardTitle>{board.title}</BoardTitle>
          <UserId>{board.email}</UserId>
        </BoardHeader>
        <BoardContent>{board.content}</BoardContent>
        <BoardDate>{Commons.timeFromNow(board.regDate)}</BoardDate>
      </BoardContentWrapper>
    </BoardLi>
  );
};

export default BoardListItem;
