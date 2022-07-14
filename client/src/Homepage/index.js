import React, { useState, useEffect, useContext } from "react";
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
import { useParams } from "react-router-dom";

const Homepage = () => {
  const { showModal, setShowModal } = useContext(ModalContext);
  const [maps, setMaps] = useState(null);
  const { currentUser, status, setStatus } = useContext(UserContext);
  const [users, setUsers] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      setShowModal(false);
    }
  }, []);

  useEffect(() => {
    fetch("https://mapguesser-server.herokuapp.com/api/getTopPlayers")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
      });
  }, []);
  useEffect(() => {
    fetch("https://mapguesser-server.herokuapp.com/api/featuredMaps")
      .then((res) => res.json())
      .then((data) => {
        setMaps(data.result);
      });
  }, []);

  return (
    <Container users={users} maps={maps}>
      {status && status !== "noName" && (
        <Error status={status} setStatus={setStatus} />
      )}

      {users && maps ? (
        <>
          <TopWrapper>
            <Title>MapGuesser</Title>
            <GlobeSpinner speed={10000} />
          </TopWrapper>
          <Wrapper>
            <Section1>
              <ExploreMaps />
            </Section1>{" "}
            <Section2>
              {/* <Link to="/explore?page=1">Leaderboard</Link> */}
              <Leaderboard users={users} setUsers={setUsers} />
            </Section2>
            <Section3>
              <CreateMap />
            </Section3>
            <Section4>{currentUser ? <ProfileLinks /> : <SignUp />}</Section4>
            <Section5>
              <Featured
                showModal={showModal}
                setShowModal={setShowModal}
                maps={maps}
                setMaps={setMaps}
                gameId={id}
              />{" "}
            </Section5>{" "}
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
  height: 100%;
  height: ${({ users, maps }) => (users && maps ? "100%" : "100vh")};
  background-image: url("https://google-maps-bucket.s3.us-east-2.amazonaws.com/shutterstock_1228111945.jpg");
  background-size: cover;
  background-image: url("https://google-maps-bucket.s3.us-east-2.amazonaws.com/287620190-huge.jpg");
  background-image: url("https://google-maps-bucket.s3.us-east-2.amazonaws.com/shutterstock_693729124.jpg");
  justify-content: space-around;
  a {
    color: black;
    text-decoration: none;
  }
`;

const Title = styled.h1`
  color: white;
  font-size: 30px;
  text-align: center;
  font-weight: 800;
  @media (min-width: 500px) {
    font-size: 60px;
  }
`;

const TopWrapper = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 10px;
  max-width: 100vw;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (min-width: 1150px) {
    display: grid;
    grid-template-rows: repeat(20, 5%);
    grid-template-columns: repeat(20, 5%);
    height: 120vw;
  }

  @media (min-width: 1250px) {
    height: 78vw;
  }
`;

const Section = styled.div`
  margin: 20px 30px 20px;
`;

const Section1 = styled(Section)`
  @media (min-width: 1150px) {
    grid-column: 1 / -1;
    grid-row: 1 / 8;
  }

  @media (min-width: 1250px) {
    grid-column: 1 / 15;
    grid-row: 1 / 10;
  }
`;
const Section2 = styled(Section)`
  @media (min-width: 1150px) {
    grid-column: 1 / 8;
    grid-row: 8 / 15;
  }

  @media (min-width: 1250px) {
    grid-column: 15 / -1;
    grid-row: 1 / 10;
  }
`;
const Section3 = styled(Section)`
  @media (min-width: 1150px) {
    grid-column: 8 / -1;
    grid-row: 8 / 15;
  }

  @media (min-width: 1250px) {
    grid-column: 1 / 10;
    grid-row: 10 / -1;
  }
`;
const Section4 = styled(Section)`
  @media (min-width: 1150px) {
    grid-column: 1 / 8;
    grid-row: 15 / -1;
  }

  @media (min-width: 1250px) {
    grid-column: 10 / -1;
    grid-row: 10 / 14;
  }
`;
const Section5 = styled(Section)`
  @media (min-width: 1150px) {
    grid-column: 8 / -1;
    grid-row: 15 / -1;
  }

  @media (min-width: 1250px) {
    grid-column: 10 / -1;
    grid-row: 14 / -1;
  }
`;

export default Homepage;
