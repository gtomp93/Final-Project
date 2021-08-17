import React from "react";
import styled from "styled-components";

import {FiLoader} from "react-icons/fi";

export const Loading = () => {
  return (
    <Wrapper>
      <h2 style={{color: "white"}}>LOADING</h2>
      <Spinner />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 80vh;
  width: 80vw;
  margin: 25px auto auto auto;
  text-align: center;
`;

const Spinner = styled(FiLoader)`
  height: 100px;
  width: 100px;
  animation: App-logo-spin infinite 5s linear;
  color: white;

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
