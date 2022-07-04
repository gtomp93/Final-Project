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
  /* background: rgba(175, 171, 171, 0.49); */
  width: 100%;
  justify-content: space-between;
  color: rgba(111, 109, 109, 1);
`;

export default MapItem;
