import { createGlobalStyle } from "styled-components";
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
    width: 100% ;
       
        display: flex ;
flex-direction: column ;
align-items: center ;
justify-content:center;
  }

  body{
   
    margin: 0 ;
    padding: 0;
    background: linear-gradient(
    90deg,
    rgba(23, 56, 156, 1) 0%,
    rgba(24, 30, 87, 1) 150%
  );
  display: flex ;
flex-direction: column ;
align-items: center ;
justify-content:center  ;
  margin-top:44px;
position: relative ;
z-index: 1 ;
}
  button{
    cursor: pointer;
  }
`;
