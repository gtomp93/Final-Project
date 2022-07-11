import styled from "styled-components";
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
                <Row key={user._id}>
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

const StyledContainer = styled(Container)`
  @media (max-width: 1149px) {
    height: 500px;
  }

  display: flex;
  flex-direction: column;

  padding: 7px 15px 7px;
`;

const ScrollContainer = styled.div`
  overflow-y: auto;
  width: 100;
  height: 100%;
  &::-webkit-scrollbar {
    width: 15px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    background: rgba(250, 250, 250, 0.4);
    width: 15px;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    width: 15px;
    background: rgba(157, 156, 156, 0.7);
    border-radius: 8px;
  }
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  @media (min-width: 1740px) {
  }
`;

const Row = styled.tr`
  tr:not(:first-child) {
  }
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
  font-weight: bold;
  text-align: left;

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

const Heading = styled.th`
  font-size: 30px;
`;

export default Leaderboard;
