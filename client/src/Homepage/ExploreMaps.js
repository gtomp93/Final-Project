import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { SubTitle } from "./styledComponents";
import { Container } from "./styledComponents";
import { MdExplore } from "react-icons/md";

const ExploreMaps = () => {
  const navigate = useNavigate();

  return (
    <ExploreContainer onClick={() => navigate("/explore")}>
      <SubTitle>
        <CompassIcon style={{ margin: "" }} /> Explore Maps <CompassIcon />
      </SubTitle>
      <Image src="https://google-maps-bucket.s3.us-east-2.amazonaws.com/shutterstock_152295734.jpg" />{" "}
    </ExploreContainer>
  );
};

const Image = styled.img`
  width: 95%;
  height: 90%;
  /* max-width: 500px; */
  object-fit: cover;
  border-radius: 6px;
`;

const movingBackground = keyframes`
0%{background-position: right}
25%{background-position:middle}
50%{background-position:left}
25%{background-position:middle}
100%{background-position: right}
`;

const ExploreContainer = styled(Container)`
  cursor: pointer;
  color: white;
  background-image: linear-gradient(
    225deg,
    rgba(204, 204, 207, 0.5) 1%,
    rgba(101, 98, 98, 0.2) 63%
  );
  &:hover {
    transform: scale(1.02);
  }
  background-size: 200%;
  transition: transform 500ms;
  animation: ${movingBackground} 7s forwards infinite;
`;

const spinning = keyframes`
0%{transform:rotate(0deg)}
100%{transform:rotate(360deg)}
`;

const CompassIcon = styled(MdExplore)`
  animation: ${spinning} 5000ms forwards linear infinite;
`;

export default ExploreMaps;
