import React from "react";
import { styled } from "styled-components";

const COLOR = {
  primary: "#040401",
  secondary: "#A58A00",
  tertiary: "",
};

const StyledButton = styled.button`
  padding: 15px 20px;
  background-color: ${(props) => COLOR[props.$color]};
  color: white;
  -webkit-tap-highlight: none;
  border: 0px;
  border-radius: 4px;
  font-size: 20px;
  &:hover {
    opacity: 70%;
    background-color: none;
    outline: none;
    cursor: pointer;
  }
  &:disabled {
    opacity: 40%;
    background-color: grey;
    outline: none;
    cursor: cancelled;
  }

  @media (min-width: 769px) {
    padding: 20px 40px;
    font-size: 20px;
  }
`;
const Button = ({ children, type = "primary", onClick, disabled }) => {
  return (
    <StyledButton $color={type} onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default Button;
