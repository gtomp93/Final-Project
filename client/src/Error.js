import React, { useContext } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import { UserContext } from "./UserContext";
import { BiX } from "react-icons/bi";
import { Navigate, useNavigate } from "react-router-dom";
import Login from "./Login";
import LoginButton from "./LoginButton";

const Error = () => {
  const { setStatus, status } = useContext(UserContext);
  console.log("Hello?");
  const navigate = useNavigate();
  return ReactDOM.createPortal(
    <Container>
      <div>Please sign up or log in in order to {status.error} a map 😊</div>{" "}
      <LoginButton />
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
  position: absolute;
  top: 50%;
  left: 50%;
  width: fit-content;
  padding: 12px;
  font-weight: bold;
  transform: translate(-50%, -50%);
  z-index: 100;
  background-color: rgba(247, 45, 42, 0.72);
`;

const CloseModal = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 8;
  border-radius: 5px;
  /* margin: 6px; */
  opacity: 0.5;
  font-size: 18px;
  display: grid;
  place-content: center;
`;

export default Error;
