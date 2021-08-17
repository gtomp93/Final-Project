import React, {useContext, useState, useEffect} from "react";
import styled from "styled-components";
import Login from "./Login";

import {FiLoader} from "react-icons/fi";
import {UserContext} from "./UserContext";

export const Loading = () => {
  const {currentUser} = useContext(UserContext);
  const [timer, setTimer] = useState(4);
  const [stop, setStop] = useState(false);

  useEffect(() => {
    timer > 0 && !stop && setTimeout(() => setTimer(timer - 1), 1000);
  }, [timer]);

  if (timer === 0 && !currentUser) {
    // setStop(true);
    return <Login />;
  }

  return (
    <Wrapper>
      <h2 style={{color: "#e8e6df"}}>LOADING</h2>
      <Spinner />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 80vh;
  width: 80vw;
  margin: 25px auto auto auto;
  text-align: center;
  color: #e8e6df;
`;

const Spinner = styled(FiLoader)`
  height: 100px;
  width: 100px;
  animation: App-logo-spin infinite 5s linear;
  color: #e8e6df;

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
