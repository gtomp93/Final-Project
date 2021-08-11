import {createGlobalStyle} from "styled-components";

export const Vars = {};

export default createGlobalStyle`
  /* * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
  } */
  body{
    height: 100%;
    /* background-color: rgba(0,0,0,0.9); */
    background: linear-gradient(
    90deg,
    rgba(23, 56, 156, 1) 0%,
    rgba(24, 30, 87, 1) 100%
  );
  }
  
`;
