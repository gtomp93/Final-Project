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
  const page = Number(searchParams.get("page"));
  console.log(page, "page");

  useEffect(() => {
    if (id) setShowModal(id);
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
              <Search setShowModal={setShowModal} />
              <GamesGrid
              // onLoad={calculateHeight}
              >
                {games.map((game, index) => {
                  let isLiked = false;
                  if (currentUser?.likes.includes(game._id)) {
                    isLiked = true;
                  }
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
  /* border: solid pink 10px; */
  /* background-image: url("https://www.istockphoto.com/photo/twilight-at-spirit-island-gm485371557-38624866"); */
  /* background-image: url("https://google-maps-bucket.s3.us-east-2.amazonaws.com/pexels-pixabay-87651.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center; */
  height: calc(100vh - 44px);
  width: 100vw;
  overflow-y: auto;
  overflow-x: hidden;
  perspective: 10px;
  perspective-origin: bottom;
  /* position: relative; */
  background: black;
`;

const GamesWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  height: 35.5%;
  /*  HERE top: 500px;
  height: 37%; */

  @media screen and (min-height: 815px) {
    /* top: 0.5%; */
  }

  @media (min-width: 395px) {
    /* top: 6%; */
    /* top: 100vh; */
    height: 30%;
  }

  @media (min-width: 412px) {
    /* top: 7%; */
    /* top: 100vh; */
    height: 30%;
    @media screen and (min-height: 815px) {
      /* top: 2.5%; */
    }
    @media screen and (min-height: 850px) {
      /* top: 0%; */
    }
  }

  @media (min-width: 425px) {
    /* top: 7.5%; */
    /* top: 100vh; */
    height: 30%;
    @media screen and (min-height: 815px) {
      /* top: 4%; */
    }
  }

  @media (min-width: 435px) {
    /* top: 8%; */
    /* top: 100vh; */
    height: 30%;
    @media screen and (min-height: 815px) {
      /* top: 4.5%; */
    }
  }

  @media (min-width: 450px) {
    /* top: 8.5%; */
    /* top: 100vh; */
    height: 30%;
    @media screen and (min-height: 815px) {
      /* top: 5%; */
    }
  }

  @media (min-width: 460px) {
    /* top: 9%; */
    /* top: 100vh; */
    height: 30%;
    @media screen and (min-height: 825px) {
      /* top: 5.5%; */
    }
  }

  @media (min-width: 475px) {
    /* top: 12%; */
    /* top: 100vh; */
    height: 30%;
  }

  @media (min-width: 725px) {
    /* top: 200px; */
    transform: translateZ(-20px) scale(3);
    height: calc(50.5% - 30px);
    /* @media (min-height: 750px) { */
    /* top: 1400px; */
    /* height: 32%; */
    /* } */
  }
  @media (min-width: 756px) {
    /* top: 300px; */
    transform: translateZ(-20px) scale(3);
    height: calc(48% - 30px);
    @media (min-height: 750px) {
      /* top: -300px; */
      height: 52%;
    }
  }

  @media screen and (min-width: 800px) {
    /* top: 300px; */
    transform: translateZ(-20px) scale(3);
    height: calc(48% - 30px);
    @media (min-height: 900px) {
      /* top: -200px; */
      height: 52%;
    }
  }

  @media screen and (min-width: 1000px) {
    /* top: 220px; */
    transform: translateZ(-20px) scale(3);
    height: calc(48% - 30px);
    top: -200px;

    @media (min-height: 900px) {
      height: 52%;
    }
  }

  @media (min-width: 1147px) {
    /* top: 0px; */
    height: 67%;
    transform: translateZ(-10px) scale(2);
    @media (min-height: 780px) {
      /* top: -150px; */
      height: 72%;
    }
  }
`;

const Likes = styled.span``;

export default Explore;
