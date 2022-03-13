import React, { useContext, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Login from "./Login";
import { useAuth0 } from "@auth0/auth0-react";

import { FiLoader } from "react-icons/fi";
import { UserContext } from "./UserContext";

export const Loading = () => {
  console.log("loading");
  let img =
    "https://www.google-maps-bucket.s3.us-east-2.amazonaws.com/world map stock photo.jpg";
  const { currentUser } = useContext(UserContext);
  const [timer, setTimer] = useState(4);
  const [stop, setStop] = useState(false);
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    let check = true;
    if (check) {
      if (!isAuthenticated) {
        timer > 0 && !stop && setTimeout(() => setTimer(timer - 1), 1000);
      }
    }
    return () => (check = false);
  }, [timer]);

  if (timer === 0 && !currentUser) {
    return <Login />;
  }

  return (
    <Wrapper>
      <h2 style={{ color: "#e8e6df" }}>LOADING...</h2>

      {/* <Spinner /> */}
      {/* <img src={img} /> */}
      <Globe />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
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

const spin = keyframes`
0%{background-position: 0 35%}
100%{background-position: 226px 35%}
`;

const Globe = styled.div`
  width: 143px;
  height: 143px;
  margin: 20px auto;
  position: relative;
  z-index: 10;
  /* background-color: red; */
  background-image: url("https://google-maps-bucket.s3.us-east-2.amazonaws.com/world map stock photo.jpg");
  background-size: 226px 171px;
  /* background-position: 0px 35%; */
  border-radius: 50%;
  background-repeat: repeat-x;
  animation: 1000ms ${spin} linear both infinite;
`;
