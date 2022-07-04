import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Leaderboard from "./Leaderboard";
import ExploreMaps from "./ExploreMaps";
import Featured from "./Featured";
import CreateMap from "./CreateMap";
import { Loading } from "../Loading";
import Error from "../Error";
import GlobeSpinner from "../Globe";
import { ModalContext } from "../ModalContext";
import ProfileLinks from "./ProfileLinks";
import SignUp from "./SignUp";
import { UserContext } from "../UserContext";

const Homepage = () => {
  const { showModal, setShowModal } = useContext(ModalContext);
  const [maps, setMaps] = useState(null);
  const { currentUser, status, setStatus } = useContext(UserContext);
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
    <Container users={users} maps={maps}>
      {status && <Error status={status} setStatus={setStatus} />}

      {users && maps ? (
        <>
          <TopWrapper>
            <Title>MapGuesser</Title>
            <GlobeSpinner speed={10000} />
          </TopWrapper>
          <Wrapper>
            <Section style={{ gridColumn: "1 / 15", gridRow: "1 / 12" }}>
              <ExploreMaps />
            </Section>{" "}
            <Section style={{ gridColumn: "16 / -1", gridRow: "1 / 12" }}>
              {/* <Link to="/explore?page=1">Leaderboard</Link> */}
              <Leaderboard users={users} setUsers={setUsers} />
            </Section>
            <Section style={{ gridColumn: "1 / 9", gridRow: "12 / 21" }}>
              <CreateMap />
            </Section>
            <Section
              style={{
                // gridColumn: "span 3",
                gridColumn: "10 / -1",
                gridRow: "12 / 15",
              }}
            >
              {currentUser ? <ProfileLinks /> : <SignUp />}
            </Section>
            <Section
              style={{
                // gridColumn: "span 3",
                gridColumn: "10 / -1",
                gridRow: "15 / -1",
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
  width: 100%;
  height: ${({ users, maps }) => (users && maps ? "100%" : "100vh")};
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
  grid-template-rows: repeat(20, 5%);
  grid-template-columns: repeat(20, 5%);
  /* gap: 4rem; */
  /* grid-row-gap: 35px; */
`;

const Section = styled.div`
  margin: 10px 0 10px;
`;

export default Homepage;
