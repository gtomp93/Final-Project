import React from "react";
import styled from "styled-components";

const MapItem = ({ address, dispatch, index }) => {
  return (
    <Container>
      <div>{address}</div>
      {/* <button
        onClick={() => {
          dispatch({ type: "removeLocation", index });
        }}
      >
        Remove Location
      </button> */}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  background: white;
  width: 100%;
  justify-content: space-between;
`;

export default MapItem;
