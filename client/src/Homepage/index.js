import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Leaderboard from "./Leaderboard";
import ExploreMaps from "./ExploreMaps";

const Homepage = () => {
  useEffect(() => {
    fetch("/getTopPlayers")
      .then((res) => res.json())
      .then((res) => console.log(res));
  }, []);

  return (
    <Container>
      <Wrapper>
        <Section>
          <ExploreMaps />
        </Section>
        <Section>
          <Link to="/explore?page=1">Featured Maps</Link>
        </Section>
        <Section>
          {/* <Link to="/explore?page=1">Leaderboard</Link> */}
          <Leaderboard />
        </Section>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 44px);
  background-image: url("https://google-maps-bucket.s3.us-east-2.amazonaws.com/shutterstock_1228111945.jpg");
  background-size: cover;
  display: flex;
  justify-content: space-around;
  a {
    color: black;
    text-decoration: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  @media screen and (min-width: 450px) {
    flex-direction: row;
  }
`;
const Section = styled.div`
  margin: 10px 0 10px;
`;

export default Homepage;
