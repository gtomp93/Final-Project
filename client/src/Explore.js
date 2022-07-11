import React, { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "./UserContext";
import Game from "./Game";
import Error from "./Error";
import { Loading } from "./Loading";
import Search from "./Search";
import { ModalContext } from "./ModalContext";

const Explore = () => {
  const { id } = useParams();
  const { showModal, setShowModal } = useContext(ModalContext);
  const [games, setGames] = useState(null);
  const [updatePage, setUpdatePage] = useState(false);
  const { currentUser } = useContext(UserContext);
  const { status, setStatus } = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  useEffect(() => {
    if (!id) {
      setShowModal(false);
    }
  }, []);

  useEffect(() => {
    fetch(`https://mapguesser-server.herokuapp.com/api/getGames?page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        setGames(res.result);
      });
  }, [currentUser, updatePage, page]);

  return (
    <>
      <Container full={games?.length > 19}>
        <ParallaxWrapper>
          {status && status !== "noName" && (
            <Error status={status} setStatus={setStatus} />
          )}
          {games?.length > 19 && (
            <Background src="https://google-maps-bucket.s3.us-east-2.amazonaws.com/shutterstock_693729124.jpg" />
          )}

          {games ? (
            <GamesWrapper>
              {" "}
              <TopWrapper>
                <Title>Search Maps</Title>{" "}
                <Search setShowModal={setShowModal} />
              </TopWrapper>
              <GamesGrid>
                {games.map((game) => {
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
                      gameId={id}
                      route="/explore"
                    />
                  );
                })}
              </GamesGrid>
              <PageContainer style={{ textAlign: "center" }}>
                {page > 1 && (
                  <Page
                    style={{ color: "white" }}
                    onClick={() => setSearchParams({ page: page - 1 })}
                  >
                    Previous
                  </Page>
                )}
                {games.length > 19 && (
                  <Page
                    style={{ color: "white" }}
                    onClick={() => setSearchParams({ page: page + 1 })}
                  >
                    Next
                  </Page>
                )}
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
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 44px);
  width: 100vw;
  overflow-y: auto;
  overflow-x: hidden;
  perspective: 10px;
  perspective-origin: bottom;
  background-image: ${({ full }) =>
    full
      ? "none"
      : `url(
      https://google-maps-bucket.s3.us-east-2.amazonaws.com/shutterstock_693729124.jpg
    )`};
  background-size: cover;
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  transform-style: preserve-3d;
  z-index: -1;
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

  @media (min-width: 680px) {
    top: 2000px;
    height: 33.3%;
  }

  @media (min-width: 756px) {
    top: 0px;
    transform: translateZ(-20px) scale(3);

    height: 50.3%;
  }
  @media (min-height: 1246px) {
    top: -500px;
  }

  @media (min-width: 1148px) {
    height: 66%;
    top: -400px;
    height: 56.4%;
  }
  @media (min-height: 900px) and (min-width: 1148px) {
    top: -450px;
    height: 56.5%;
  }

  @media (min-height: 900px) and (min-width: 1400px) and (max-width: 1525px) {
    top: -450px;
  }

  @media (min-width: 1526px) {
    height: 59%;
  }

  @media (min-height: 920px) and (min-width: 1526px) {
    top: -700px;

    height: 65.5%;
  }

  @media (min-width: 1906px) {
    top: -900px;
    height: 74%;
  }
`;

export default Explore;
