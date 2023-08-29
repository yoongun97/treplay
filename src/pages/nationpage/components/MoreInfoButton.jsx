import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const MoreInfoButton = ({ to }) => {
  return (
    <StyledButton to={to}>
      <span>더 알아보기</span>
      <div></div>
    </StyledButton>
  );
};

export default MoreInfoButton;

const StyledButton = styled(Link)`
  display: flex;

  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 180px;
  height: 52px;
  border-radius: 60px;
  border: 1px solid #0a58be;
  background-color: #fff;
  color: #0a58be;
  font-size: 18px;
  font-weight: 400;
  transition: 0.3s;

  &:hover {
    background-color: #0a58be;
    color: #fff;
  }

  & > div {
    width: 24px;
    height: 24px;
    background-image: url("icon/right_arrow_blue.svg");
    transition: 0.3s;
  }

  &:hover > div {
    background-image: url("icon/right_arrow_white.svg");
  }
`;
