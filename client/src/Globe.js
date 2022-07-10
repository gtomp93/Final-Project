import React from "react";
import styled, { keyframes, css } from "styled-components";

const GlobeSpinner = ({ speed }) => {
  return <Globe speed={speed} />;
};

export default GlobeSpinner;

const spin = keyframes`
0%{background-position: 0 35%}
100%{background-position: 226px 35%}
`;

const smallSpin = keyframes`
0%{background-position: 0 35%}
100%{background-position: 150px 35%}
`;

const Globe = styled.div`
  width: 140px;
  height: 140px;
  margin: 20px 0 0;
  position: relative;
  z-index: 10;
  background-image: url("https://google-maps-bucket.s3.us-east-2.amazonaws.com/world map stock photo.jpg");
  background-size: 226px 171px;
  /* background-position: 0px 35%; */
  border-radius: 50%;
  background-repeat: repeat-x;
  animation: ${({ speed }) =>
    css`
      ${speed}ms ${spin} linear both infinite
    `};

  @media (max-width: 500px) {
    background-size: 150px 114px;
    width: 93px;
    height: 93px;
    animation: ${({ speed }) =>
      css`
        ${speed}ms ${smallSpin} linear both infinite
      `};
  }
`;
