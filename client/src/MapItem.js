import React from "react";
import styled from "styled-components";

const MapItem = ({ address, dispatch, index }) => {
  return (
    <Container>
      <div>{address}</div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  color: rgba(111, 109, 109, 1);
`;

export default MapItem;
