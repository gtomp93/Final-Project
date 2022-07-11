import React, { useContext } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import { UserContext } from "./UserContext";
import { BiX } from "react-icons/bi";
import LoginButton from "./LoginButton";
import { useAuth0 } from "@auth0/auth0-react";

const Error = () => {
  const { setStatus, status } = useContext(UserContext);
  const { loginWithRedirect } = useAuth0();
  return ReactDOM.createPortal(
    <Container>
      <Message>
        Please sign up or log in in order to {status.error} a map 😊
      </Message>{" "}
      <LoginButton errorLogin={true}>Log In</LoginButton>
      <CloseModal
        onClick={(ev) => {
          ev.stopPropagation();
          setStatus(null);
        }}
      >
        <BiX />
      </CloseModal>
    </Container>,
    document.getElementById("portal")
  );
};

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
  max-width: 95vw;
  padding: 12px;
  font-weight: bold;
  transform: translate(-50%, -50%);
  z-index: 100;
  background-color: rgba(247, 45, 42, 0.75);
`;

const Message = styled.p`
  font-size: 18px;
  @media (min-width: 800px) {
    font-size: 24px;
  }
`;

const CloseModal = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 8;
  border-radius: 5px;
  /* margin: 6px; */
  opacity: 0.5;
  font-size: 20px;
  display: grid;
  place-content: center;
`;

export default Error;
