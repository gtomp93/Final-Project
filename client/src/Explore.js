import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
// import {userInfo} from "os";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { UserContext } from "./UserContext";
import Game from "./Game";
import Error from "./Error";
import LogoutButton from "./LogoutButton";
import { GameContext } from "./GameContext";
import { Loading } from "./Loading";
import { BiWorld } from "react-icons/bi";
import Search from "./Search";
import { ModalContext } from "./ModalContext";

const Explore = () => {
  const { id } = useParams();
  const { showModal, setShowModal } = useContext(ModalContext);
  const [games, setGames] = useState(null);
  const [updatePage, setUpdatePage] = useState(false);
  const { currentUser } = useContext(UserContext);
  const { setSelected, dispatch, resetMap } = useContext(GameContext);
  const [fullList, setFullList] = useState(null);
  const { status, setStatus } = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  console.log(page, "page");
  console.log({ showModal });

  useEffect(() => {
    if (id) setShowModal(id);
    return () => setShowModal(null);
  }, []);

  useEffect(() => {
    fetch(`/getGames?page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        setGames(res.result);
        setFullList(res.result);
      });
    dispatch({ type: "clearGame" });
  }, [currentUser, updatePage, page]);

  return (
    <>
      <Container>
        <ParallaxWrapper>
          {status && <Error status={status} setStatus={setStatus} />}
          <Background
            /*src="https://google-maps-bucket.s3.us-east-2.amazonaws.com/pexels-pixabay-87651.jpg" src="https://google-maps-bucket.s3.us-east-2.amazonaws.com/shutterstock_1228111945.jpg"*/
            src="https://google-maps-bucket.s3.us-east-2.amazonaws.com/shutterstock_693729124.jpg"
          />

          {/* <Background src="https://google-maps-bucket.s3.us-east-2.amazonaws.com/287620190-huge.jpg" /> */}
          {games ? (
            <GamesWrapper>
              {" "}
              <TopWrapper>
                <Title>Search Maps</Title>{" "}
                <Search setShowModal={setShowModal} />
                {/* <GlobeSpinner speed={10000} /> */}
              </TopWrapper>
              <GamesGrid
              // onLoad={calculateHeight}
              >
                {games.map((game, index) => {
                  let isLiked = currentUser?.likes.includes(game._id);
                  return (
                    <Game
                      game={game}
                      isLiked={isLiked}
                      key={Math.random() * 99999}
                      updatePage={updatePage}
                      setUpdatePage={setUpdatePage}
                      showModal={showModal}
                      setShowModal={setShowModal}
                    />
                  );
                })}
              </GamesGrid>
              <PageContainer style={{ textAlign: "center" }}>
                {page > 1 && (
                  <Page
                    style={{ color: "white" }}
                    onClick={() =>
                      setSearchParams(
                        { page: page - 1 }
                        // pg ? { page: pg + 1 } : { page: 2 }
                      )
                    }
                  >
                    Previous
                  </Page>
                )}
                <Page
                  // to="/explore/?page="
                  style={{ color: "white" }}
                  onClick={() =>
                    setSearchParams(
                      { page: page + 1 }
                      // pg ? { page: pg + 1 } : { page: 2 }
                    )
                  }
                >
                  Next
                </Page>
              </PageContainer>
            </GamesWrapper>
          ) : (
            <Loading />
          )}
        </ParallaxWrapper>
      </Container>
    </>
  );
};
const Container = styled.div`
  /* background: red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 44px);
  width: 100vw;
  overflow-y: auto;
  overflow-x: hidden;
  perspective: 10px;
  perspective-origin: bottom;
  /* position: relative; */
  /* background: black; */
`;

const GamesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.6rem;
  margin: 25px 0px 0px;
  width: calc(100vw - 30px);
  @media (min-width: 800px) {
    width: calc(100vw - 40px);
    gap: 1.8rem;
  }

  @media screen and (max-width: 380px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`;

const ParallaxWrapper = styled.div`
  position: relative;
  /* flex: 1; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  transform-style: preserve-3d;
  z-index: -1;
  /* overflow: hidden; */
  /* background: pink; */
  /* border: solid cyan 15px; */
`;

const PageContainer = styled.div`
  text-align: center;
  margin-top: 8px;
  button {
    margin: 0 8px;
  }
`;

const Title = styled.h1`
  color: black;
  font-size: 40px;
  text-align: center;
  font-weight: 800;
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 0 auto;
  position: relative;
  z-index: 3;
`;

const Page = styled.button`
  border-radius: 4px;
  border: 1px solid white;
  box-shadow: 4px 6px 14px 0px rgba(0, 0, 0, 0.33);
  -webkit-box-shadow: 4px 6px 14px 0px rgba(0, 0, 0, 0.33);
  -moz-box-shadow: 4px 6px 14px 0px rgba(0, 0, 0, 0.33);
  color: white;
  background-color: blue;
  /* width: 190px; */
  font-size: 20px;
  font-weight: bold;
  width: fit-content;
  padding: 7px;
`;

const Background = styled.img`
  position: absolute;
  width: 100vw;
  object-fit: cover;
  object-position: top;
  z-index: -1;
  overflow: hidden;
  transform: translateZ(-30px) scale(4);
  top: 12%;
  height: 35.3%;
  /*  HERE top: 500px;
  height: 37%; */

  @media (min-width: 680px) {
    top: 2000px;
    height: 33.3%;
  }

  @media (min-width: 756px) {
    /* top: 200px; */
    top: 0px;
    transform: translateZ(-20px) scale(3);
    /* height: calc(50.5% - 30px); */
    /* @media (min-height: 750px) { */
    /* top: 1400px; */
    /* height: 32%; */
    /* } */
    height: 50.3%;
  }
  /* @media (min-width: 756px) {
    /* top: 300px; */

  @media (min-width: 1148px) {
    height: 66%;
    /* top: auto; */
    top: -400px;
    height: 56.4%;
  }
  @media (min-height: 900px) and (min-width: 1148px) and (max-width: 1400px) {
    top: -400px;
    /* top: -1000px; */
    height: 56.5%;
  }

  @media (min-height: 900px) and (min-width: 1400px) and (max-width: 1525px) {
    top: -450px;
    /* top: -1000px; */
    height: 57%;
  }

  @media (min-width: 1526px) {
    height: 59%;
  }

  @media (min-height: 920px) and (min-width: 1526px) {
    top: -700px;
    /* top: -400px; */
    /* top: -1000px; */
    height: 65.5%;
  }

  @media (min-width: 1906px) {
    top: -900px;
    height: 74%;
    /* top: 0px; */
    /* height: 67%; */
    /* transform: translateZ(-10px) scale(2); */
    /* @media (min-height: 780px) { */
    /* top: -150px; */
    /* height: 72%; */
  }
  /* } */
  /* @media screen and (min-width: 1905px) { */
  /* height: 75%; */
  /* top: -270px; */
  /* } */
`;

const Likes = styled.span``;

export default Explore;
