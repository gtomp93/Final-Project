import GlobeSpinner from "../Globe";

import React from "react";
import styled from "styled-components";

export const Loading = () => {
  console.log("here");
  return (
    <>
      {" "}
      <Styledh2>LOADING...</Styledh2>
      <GlobeSpinner speed={1000} />
    </>
  );
};

const Styledh2 = styled.h2`
  color: #b30092;
  font-size: 45px;
  font-weight: bold;
`;
