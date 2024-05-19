import React from "react";
import { styled } from "styled-components";
import LogoWithText from "../../../components/LogoWithText/LogoWithText";

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;

  backdrop-filter: blur(200px);
  -webkit-backdrop-filter: blur(200px); /* For Safari */
  display: flex;
  place-items: center;
`;

const ContentWrapper = styled.section`
  position: relative;

  @media (min-width: 769px) {
    width: 80%;
    margin: 28px auto;
  }
`;

const ImageInputFieldWrapper = styled.section``;

const InputFieldWrapper = styled.ul`
  list-style-type: none;
`;
const InputFieldItem = styled.li`
  & span {
    display: inline-block;
  }
`;

const BigInputField = styled.input`
  font-size: 56px;
  outline: none;
  border: none;
  border-bottom: 1px solid black;
`;

const CalendarDayMonth = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 6px;

  & span {
    padding: 6px 10px;
    font-size: 12px;
  }

  & > span:first-child {
    border-bottom: 1px solid orange;
  }
`;

const ImageWrapper = styled.div``;
const CreateEvent = () => {
  return (
    <Wrapper>
      <div style={{ position: "absolute", top: "0px", left: "0px" }}>
        <LogoWithText color="black" />
      </div>
      <ContentWrapper>
        <ImageInputFieldWrapper>
          <InputFieldWrapper>
            <InputFieldItem>
              <BigInputField placeholder="Event Name" />
            </InputFieldItem>
            <InputFieldItem>
              <CalendarDayMonth style={{}}>
                <span>DEC</span>
                <span>12</span>
              </CalendarDayMonth>
            </InputFieldItem>
          </InputFieldWrapper>
          <ImageWrapper></ImageWrapper>
        </ImageInputFieldWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

export default CreateEvent;
