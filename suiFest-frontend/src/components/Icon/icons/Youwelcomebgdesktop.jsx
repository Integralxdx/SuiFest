import * as React from "react";
import { styled } from "styled-components";

const SvgStyled = styled.svg`
  display: none;
  @media (min-width: 769px) {
    display: block;
  }
`;
const SvgYouwelcomebgdesktop = ({ fillColor, ...props }) => (
  <SvgStyled
    xmlns="http://www.w3.org/2000/svg"
    width={500}
    height={500}
    fill="none"
    {...props}
  >
    <path
      fill={fillColor || "#394067"}
      fillRule="evenodd"
      d="M600 0H0v411.034c185.677-60.616 172.018-9.044 155.798 0-3.501 1.952-15.082 5.866-29.694 10.805-53.1 17.948-146.228 49.426-37.107 49.426 111.32 0 153.236-40.154 160.279-60.231-49.94-22.001-126.857-72.778-35.001-99.872 91.857-27.094 136.305 95.446 147.047 160.103l103.51-171.456c-28.314 118.794-60.484 319.397 37.348 171.456 78.028-117.993 97.706-35.735 97.82 54.114zm0 526.951c-.028 22.302-1.245 45.001-3.06 65.16L0 599.809V600h600z"
      clipRule="evenodd"
    />
  </SvgStyled>
);
export default SvgYouwelcomebgdesktop;
