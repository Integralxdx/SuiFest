// import {
//   COMMON_INPUT_FILTER_COMPONENT_STYLES,
//   INPUT_FILTER_COMPONENT_PADDING,
//   THEME_COLOR,
// } from "@/constants";
import React from "react";
import { styled } from "styled-components";

const InputComponent = styled.input`
  width: 100%;
  height: 100%;
  padding: 4px 8px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #4e4c51;
    opacity: 45%;
    // font-size:
  }
  @media (min-width: 769px) {
    padding: 4px 8px;
  }
`;


const Input = ({ value, setValue, placeholder, inputId, type = "text" }) => {
  return (
    <>
      {type == "text" ? (
        <InputComponent
          id={inputId}
          value={value}
          type={type || "text"}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <textarea
          style={{
            width: "100%",
            padding: "4px 8px",
            borderRadius: "4px",
          }}
          rows="5"
          cols="33"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </>
  );
};

export default Input;
