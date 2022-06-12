import { useState, useEffect } from "react";
import styled from "styled-components";
import { Container } from "./styledComponents";
import { SubTitle } from "./styledComponents";

const Leaderboard = () => {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    fetch("/getTopPlayers")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data.data);
      });
  }, []);

  return (
    <>
      <Container>
        {" "}
        <SubTitle> Leaderboard</SubTitle>
        <table style={{ borderCollapse: "collapse" }}>
          <Row>
            <Heading></Heading>

            <Heading>Name</Heading>
            <Heading>Score</Heading>
          </Row>
          {users?.map((user) => {
            console.log(user);

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
        </table>
      </Container>
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

const Row = styled.tr``;

const ProfPic = styled.img`
  width: 32px;
  height: 32px;
  object-fit: cover;
  border: 1px solid white;

  border-radius: 50%;
`;

const Pic = styled.td`
  height: 40px;
  /* border: 1px solid red; */
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3px;
`;

const Name = styled.td`
  color: yellow;
  border: 1px solid white;
  width: 200px;

  /* margin-right: 5px; */
  text-align: left;
  /* border: 2px solid white; */
  /* padding: 3px; */
  font-size: 25px;
  /* border: 1px solid red; */
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
