import React from "react";
import styled from "styled-components";
import BoardListItem from "./BoardListItem";

const BoardUl = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const BoardList = ({ boardList, handleDetailClick }) => {
  return (
    <BoardUl>
      {boardList &&
        boardList.map((board) => (
          <BoardListItem
            key={board.boardId}
            board={board}
            handleDetailClick={handleDetailClick}
          />
        ))}
    </BoardUl>
  );
};

export default BoardList;
