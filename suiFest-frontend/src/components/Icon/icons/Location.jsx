import * as React from "react";
const SvgLocation = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.5 8.5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0"
      clipRule="evenodd"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 19C7.8 19 1.5 13.898 1.5 8.563 1.5 4.387 4.857 1 9 1s7.5 3.387 7.5 7.563C16.5 13.898 10.198 19 9 19"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgLocation;
