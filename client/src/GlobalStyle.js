import { createGlobalStyle } from "styled-components";

export const Vars = {};

export default createGlobalStyle`
html{
  margin:0;
}
   * {
    /* box-sizing: border-box;
    margin: 0;
    padding: 0; */
    font-family: Abel;
    margin:0;
    padding:0;
  } 
  body{
    height: 100%;
    /* background-color: rgba(0,0,0,0.9); */
    background: linear-gradient(
    90deg,
    rgba(23, 56, 156, 1) 0%,
    rgba(24, 30, 87, 1) 150%
  );
  /* background: rgba(23, 56, 156, 1) 0%; */
  }
  button{
    cursor: pointer;
  }
`;
