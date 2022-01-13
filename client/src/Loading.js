import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import Login from "./Login";
import { useAuth0 } from "@auth0/auth0-react";

import { FiLoader } from "react-icons/fi";
import { UserContext } from "./UserContext";

export const Loading = () => {
  const { currentUser } = useContext(UserContext);
  const [timer, setTimer] = useState(4);
  const [stop, setStop] = useState(false);
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      timer > 0 && !stop && setTimeout(() => setTimer(timer - 1), 1000);
    }
  }, [timer]);

  if (timer === 0 && !currentUser) {
    return <Login />;
  }

  return (
    <Wrapper>
      <h2 style={{ color: "#e8e6df" }}>LOADING</h2>
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
  animation: App-logo-spin infinite 4s linear;
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
