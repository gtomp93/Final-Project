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
        <CompassIcon style={{ margin: "" }} /> Explore Maps
        <CompassIcon />
      </SubTitle>
      <Image src="https://google-maps-bucket.s3.us-east-2.amazonaws.com/shutterstock_152295734.jpg" />{" "}
    </ExploreContainer>
  );
};

const Image = styled.img`
  height: 100%;
  width: 100%;
  height: 90%;
  position: relative;
  /* max-width: 500px; */
  object-fit: cover;
  border-radius: 6px;
`;

const movingBackground = keyframes`
0%{background-position: right center}
25%{background-position:center center}
50%{background-position: left center}
25%{background-position:center center}
100%{background-position: right center}
`;

const ExploreContainer = styled(Container)`
  cursor: pointer;
  color: white;
  background-image: linear-gradient(
    225deg,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(160, 160, 160, 0.6) 50%,
    rgba(255, 255, 255, 0.5) 100%
  );

  &:hover {
    transform: scale(1.01);
  }
  background-size: 200%;
  transition: transform 500ms;
  animation: ${movingBackground} 6s forwards infinite;
`;

const spinning = keyframes`
0%{transform:rotate(0deg)}
100%{transform:rotate(360deg)}
`;

const CompassIcon = styled(MdExplore)`
  animation: ${spinning} 7000ms forwards linear infinite;
`;

export default ExploreMaps;
