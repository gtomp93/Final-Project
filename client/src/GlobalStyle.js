import { createGlobalStyle } from "styled-components";
import Mountains from "./assets/Mountains.jpg";
export const Vars = {};

export default createGlobalStyle`
html{
  margin:0;
}
   * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Abel;
    margin:0;
    padding:0;
  } 
  #root{
    height: 100%;
    margin-top:44px;
        overflow-y: hidden ;
        /* margin-bottom: -160px; */

  }

  body{
    /* height: 100%; */
    /* background-color: rgba(0,0,0,0.9); */
    /* overflow-y: hidden ; */
  /* background-color: red ; */

    background: linear-gradient(
    90deg,
    rgba(23, 56, 156, 1) 0%,
    rgba(24, 30, 87, 1) 150%
  );
  /* margin-bottom: -160px; */

  /* border: solid 8px lightgreen; */
  /* background-image: url("https://www.istockphoto.com/photo/twilight-at-spirit-island-gm485371557-38624866"); */
}
  button{
    cursor: pointer;
  }
`;
//  background: rgba(23, 56, 156, 1) 0%
