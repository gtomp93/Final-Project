import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Container } from "./styledComponents";
import { SubTitle } from "./styledComponents";
import { FaMedal } from "react-icons/fa";

const Leaderboard = ({ users }) => {
  return (
    <>
      <StyledContainer>
        {" "}
        <SubTitle>
          {" "}
          Leaderboard <FaMedal style={{ fill: "gold" }} />
        </SubTitle>
        <ScrollContainer>
          <StyledTable>
            <Row>
              <Heading></Heading>

              <Heading>Name</Heading>
              <Heading>Score</Heading>
            </Row>
            {users?.map((user) => {
              return (
                <Row>
                  <Pic>
                    {" "}
                    <ProfPic src={user.picture} />
                  </Pic>
                  <Name>{user.givenName + " " + user.lastName}</Name>
                  <Name>{user.score}</Name>
                </Row>
              );
            })}{" "}
          </StyledTable>
        </ScrollContainer>
      </StyledContainer>
    </>
  );
};

// const SubTitle = styled.h2`
//   font-size: 32px;
//   color: lightskyblue;
//   text-align: left;
//   padding-left: 5px;
//   padding-top: 0;
// `;

const movingBackground = keyframes`
0%{background-position: right center}
25%{background-position:center center}
50%{background-position: left center}
25%{background-position:center center}
100%{background-position: right center}
`;

const StyledContainer = styled(Container)`
  /* background: rgb(0, 0, 0, 0.55); */
  /* background-image: linear-gradient(
    225deg,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(147, 147, 147, 0.5) 50%,
    rgba(255, 255, 255, 0.5) 100%
  );
  background-size: 400%; */

  /* animation: ${movingBackground} 7s forwards infinite; */
  display: flex;
  flex-direction: column;

  padding: 7px 15px 7px;
`;

const ScrollContainer = styled.div`
  overflow-y: auto;
  width: 100;
  height: 100%;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  @media (min-width: 1740px) {
    /* width: 95%; */
  }
`;

const Row = styled.tr`
  tr:not(:first-child) {
    /* display: block; */
  }
  /* display: flex; */
  width: 100%;
`;

const ProfPic = styled.img`
  width: 32px;
  height: 32px;
  object-fit: cover;
  border: 1px solid white;

  border-radius: 50%;
`;

const Pic = styled.td`
  height: 40px;
  float: right;
  width: fit-content;
  /* border: 1px solid red; */
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3px;
`;

const Name = styled.td`
  color: black;
  border: 2px solid black;
  width: 200px;
  /* background: rgba(0, 0, 0, 0.6); */
  font-weight: bold;
  /* margin-right: 5px; */
  text-align: left;
  /* border: 2px solid white; */
  /* padding: 3px; */
  font-size: 25px;
  :nth-child(1) {
    width: 35px;
  }
  :nth-child(2) {
    width: calc(60%);
  }
  :nth-child(3) {
    width: calc(40%);
  }
`;

const User = styled.tr`
  /* display: flex; */
`;

const Heading = styled.th`
  font-size: 30px;
`;

// const Container = styled.div`
//   position: relative;
//   /* z-index: 700; */
//   color: yellow;
//   background-color: rgb(0, 0, 0, 0.6);
//   padding: 10px;
// `;

export default Leaderboard;
