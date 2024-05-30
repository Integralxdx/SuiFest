import * as React from "react";
import { styled } from "styled-components";

const SvgStyled = styled.svg`
  @media (min-width: 769px) {
    display: none;
  }
`;
const SvgYouwelcomebg = ({ fillColor, ...props }) => (
  <SvgStyled
    xmlns="http://www.w3.org/2000/svg"
    width={300}
    height={300}
    fill="none"
    {...props}
  >
    <path
      fill={fillColor || "#394067"}
      fillRule="evenodd"
      d="M300 0H0v205.516c92.838-30.307 86.009-4.522 77.899 0-1.75.976-7.54 2.934-14.847 5.403-26.55 8.974-73.114 24.713-18.554 24.713 55.661 0 76.619-20.077 80.14-30.116-24.97-11-63.429-36.388-17.5-49.935 45.928-13.548 68.152 47.722 73.523 80.051l51.755-85.728c-14.157 59.397-30.242 159.698 18.674 85.728 39.014-58.997 48.853-17.867 48.91 27.057zm0 263.475c-.014 11.151-.623 22.501-1.53 32.58L0 299.904V300h300z"
      clipRule="evenodd"
    />
  </SvgStyled>
);
export default SvgYouwelcomebg;
