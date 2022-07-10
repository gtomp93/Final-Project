import GlobeSpinner from "../Globe";

import React from "react";
import styled from "styled-components";

export const Loading = () => {
  return (
    <Wrapper>
      <Styledh2>LOADING...</Styledh2>
      <GlobeSpinner speed={1000} />
    </Wrapper>
  );
};

const Styledh2 = styled.h2`
  color: #e204b9;
  font-size: 45px;
  font-weight: bold;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
