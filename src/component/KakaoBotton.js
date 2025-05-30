import styled, { css } from "styled-components";
import React from "react";

const StyledButton = styled.button`
  font-weight: bold;
  width: 50%;
  height: 40px;
  color: white;
  background-color: #999;
  font-size: 15px;
  border-radius: 18px;
  border: orange;
  font-weight: 700;

  ${(props) =>
    props.enabled &&
    css`
      background-color: orange;
    `};

  &:active {
    border: #999;
    font-weight: 700;
    background-color: #999;
  }
`;
// props로 3개의 값을 전달 받음,
const KakaoBotton = ({ enabled, onClick, children }) => {
  return (
    <StyledButton enabled={enabled} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default KakaoBotton;
