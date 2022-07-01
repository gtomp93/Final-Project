import styled from "styled-components";

export const SubTitle = styled.h2`
  font-size: 45px;
  color: darkblue;
  text-align: left;
  padding-left: 5px;
  padding-top: 0;
  margin: 0;
  display: flex;
  align-items: center;
  text-align: center;
  /* place-items: center; */
`;

export const Container = styled.div`
  position: relative;
  border-radius: 7px;
  height: 100%;
  color: black;
  background-color: rgb(240, 240, 240, 0.6);
  padding: 0 30px 30px;
  -webkit-box-shadow: 5px 5px 4px 5px rgba(0, 0, 0, 0.27);
  box-shadow: 5px 5px 4px 5px rgba(0, 0, 0, 0.27);
  display: flex;
  flex-direction: column;
  /* margin-top: 80px; */
  @media (max-width: 1414px) {
    padding: 0 15px 30px;
  }
`;
