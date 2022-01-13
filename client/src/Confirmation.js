import React, { useContext } from "react";
import styled from "styled-components";
import { MapCreationContext } from "./MapCreationContext";

const Confirmation = () => {
  const { confirmationDetails } = useContext(MapCreationContext);

  if (!confirmationDetails?.name) {
    return (
      <div>Please enter locations and map info to see confirmation page</div>
    );
  }

  console.log(confirmationDetails);

  return (
    <Container>
      <div>{confirmationDetails.name}</div>
      <div>{confirmationDetails.description}</div>
      {confirmationDetails.addresses.map((address) => {
        return <div>{address}</div>;
      })}
      <Pic src={confirmationDetails.pic} />
    </Container>
  );
};

const Container = styled.div``;

const Pic = styled.img`
  width: 300px;
  height: 200px;
`;

export default Confirmation;
