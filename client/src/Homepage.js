import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Homepage = () => {
  useEffect(() => {
    fetch("/getTopPlayers")
      .then((res) => res.json())
      .then((res) => console.log(res));
  }, []);

  return (
    <Container>
      <Section>
        <Link to="/explore?page=1">Explore</Link>
      </Section>
      <Section>
        <Link to="/explore?page=1">Featured Maps</Link>
      </Section>
      <Section>
        <Link to="/explore?page=1">Leaderboard</Link>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 44px);
  background-image: url("https://google-maps-bucket.s3.us-east-2.amazonaws.com/287620190-huge.jpg");
  background-size: cover;
  display: flex;
  justify-content: space-around;
  a {
    color: white;
    text-decoration: none;
  }
`;
const Section = styled.div``;

export default Homepage;
