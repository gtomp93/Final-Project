import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Leaderboard from "./Leaderboard";
import ExploreMaps from "./ExploreMaps";
import Featured from "./Featured";
import CreateMap from "./CreateMap";
import { Loading } from "../Loading";
import GlobeSpinner from "../Globe";

const Homepage = ({ showModal, setShowModal }) => {
  const [maps, setMaps] = useState(null);

  const [users, setUsers] = useState(null);
  useEffect(() => {
    fetch("/getTopPlayers")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data.data);
      });
  }, []);
  useEffect(() => {
    fetch("/featuredMaps")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.result);
        setMaps(data.result);
      });
  }, []);

  return (
    <Container>
      {users && maps ? (
        <>
          <TopWrapper>
            <GlobeSpinner speed={10000} />
            <Title>MapGuesser</Title>
            <GlobeSpinner speed={10000} />
          </TopWrapper>
          <Wrapper>
            <Section style={{ gridColumn: "1 / 15", gridRow: "1 / 6" }}>
              <ExploreMaps />
            </Section>{" "}
            <Section style={{ gridColumn: "16 / -1", gridRow: "1 / 6" }}>
              {/* <Link to="/explore?page=1">Leaderboard</Link> */}
              <Leaderboard users={users} setUsers={setUsers} />
            </Section>
            <Section style={{ gridColumn: "1 / 8", gridRow: "7 / -1" }}>
              <CreateMap />
            </Section>
            <Section
              style={{
                // gridColumn: "span 3",
                gridColumn: "9 / -1",
                gridRow: "6 / -1",
              }}
            >
              <Featured
                showModal={showModal}
                setShowModal={setShowModal}
                maps={maps}
                setMaps={setMaps}
              />{" "}
            </Section>{" "}
          </Wrapper>
        </>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: calc(100%);
  background-image: url("https://google-maps-bucket.s3.us-east-2.amazonaws.com/shutterstock_1228111945.jpg");
  background-size: cover;

  justify-content: space-around;
  a {
    color: black;
    text-decoration: none;
  }
`;

const Title = styled.h1`
  color: black;
  font-size: 60px;
  text-align: center;
  font-weight: 800;
`;

const TopWrapper = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  height: 100%;
  padding: 1.5rem;
  justify-content: space-between;
  @media screen and (min-width: 450px) {
    flex-direction: row;
  }
  display: grid;
  grid-template-rows: repeat(10, 10%);
  grid-template-columns: repeat(20, 5%);
  /* gap: 4rem; */
`;
const Section = styled.div`
  margin: 10px 0 10px;
`;

export default Homepage;
