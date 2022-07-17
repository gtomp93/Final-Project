import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "./UserContext";

const AddNameModal = () => {
  const [name, setName] = useState({});
  const [error, setError] = useState(false);
  const { user } = useAuth0();
  const { setStatus, currentUser, setCurrentUser, setReloadUser, reloadUser } =
    useContext(UserContext);
  const closeModal = (ev) => {
    ev.preventDefault();
    if (name.firstName?.length > 0 && name.lastName?.length > 0) {
      fetch("https://mapguesser-server.herokuapp.com/api/addName", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          givenName: name.firstName,
          lastName: name.lastName,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setCurrentUser({
              ...currentUser,
              givenName: name.firstName,
              lastName: name.lastName,
            });
            setReloadUser(!reloadUser);
            setStatus(null);
          } else {
            setError("Error submitting information to server");
          }
        });
    } else {
      setError("Please enter both a first and last name");
    }
  };

  return (
    <Overlay>
      <Container>
        <form onSubmit={closeModal}>
          <h2>Please add a first and last name to continue</h2>
          {error && <h3 style={{ color: "red" }}>{error}</h3>}
          <div>
            <label>
              First Name:
              <input
                onChange={(ev) => {
                  setName({ ...name, firstName: ev.target.value });
                }}
              />
            </label>
          </div>
          <div>
            {" "}
            <label>
              Last Name:
              <input
                onChange={(ev) => {
                  setName({ ...name, lastName: ev.target.value });
                }}
              />
            </label>
          </div>
          <input type="submit" />
        </form>
      </Container>
    </Overlay>
  );
};

export default AddNameModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 4;
`;

const Container = styled.div`
  padding: 10px;
  width: 300px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(5, 205, 255, 0.753);
`;
