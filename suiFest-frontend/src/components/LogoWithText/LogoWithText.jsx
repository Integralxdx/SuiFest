import React from "react";
import { Logo } from "../Icon/icons";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled(Link)`
  display: inline-flex;
  text-decoration: none;
  //   gap: 15px;
  align-items: center;
  // justify-content: center;
  color: ${(props) => props.$color || "#000"};

  &:hover {
    color: initial;
  }
  & > span {
    color: ${(props) => props.$color || "#000"};
  }
`;

const LogoText = styled.p`
  font-family: "Potta One", system-ui;
  font-weight: 400;
  font-size: 18px;
  font-style: normal;
  color: ${(props) => props.$color || "#000"};
  position: relative;
  transform: translateX(-10%);
`;

const LogoWithText = ({ color }) => {
  return (
    <Wrapper to={"/"} $color={color}>
      <span
        style={{
          display: "flex",
          height: "max-content",
          color: `black`,
          /* display: inline-block; */
          transform: "scale(0.5) translateX(16px)",
        }}
      >
        <Logo />
      </span>
      <LogoText $color={color}>suiFest</LogoText>
    </Wrapper>
  );
};

export default LogoWithText;
