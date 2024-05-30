import React from "react";
import { WRAPPER_GENERAL_STYLES } from "../../constants";
import { styled } from "styled-components";
import LogoWithText from "../LogoWithText/LogoWithText";
import Button from "../Button/Button";

const Wrapper = styled.section`
  ${WRAPPER_GENERAL_STYLES}
  flex-direction: column;
  justify-content: flex-start;
  backdrop: filter(200);
`;

const HeaderBanner = styled.div`
  width: 100%;
  height: 200px;
  background: rgba(255, 236, 63, 36%);
  display: flex;
  place-items: flex-end;
  justify-content: center;

  & .title {
    font-size: 32px;
    font-family: Potta One;
    font-weight: 600px;
  }

  @media (min-width: 769px) {
    height: 240px;

    place-items: center;

    & .title {
      font-size: 48px;
    }
  }
`;

const PagesWrapper = ({ children, title, elementBelowTitle }) => {
  return (
    <Wrapper>
      <div style={{ position: "absolute", top: "0px", left: "0px" }}>
        {/* <LogoWithText color="black" /> */}
        <Button>Login</Button>
      </div>
      <HeaderBanner>
        <div>
          <p className="title"> {title}</p>
          {elementBelowTitle}
        </div>
      </HeaderBanner>
      {children}
    </Wrapper>
  );
};

export default PagesWrapper;
