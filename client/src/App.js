import React, { useState, useEffect, useContext } from "react";
import logo from "./logo.svg";
import Homepage from "./Homepage";
import CreateMapForm from "./CreateMapForm";
import Map from "./Map";
import Login from "./Login";
import Logout from "./Logout";
import Header from "./Header";
import GameOptions from "./GameOptions";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./Profile";
import Explore from "./Explore";
import GlobalStyle from "./GlobalStyle";
// import {useAuth0} from "@auth0/auth0-react";
import CreateMap from "./CreateMap";
import MapMaker from "./MapMaker";
import Confirmation from "./Confirmation";
import GameModal from "./GameModal";
import LikedGames from "./Profile/LikedGames";
import CreatedGames from "./Profile/CreatedGames";
import { UserContext } from "./UserContext";
import AddNameModal from "./AddNameModal";

// import {Auth0Provider} from "@auth0/auth0-react";
// import LoginButton from "./LoginButton";

function App() {
  //  const {domain, clientId, redirectUri} = useContext(Auth0Provider);
  // const {user, isAuthenticated, isLoading} = useAuth0();
  // const [showModal, setShowModal] = useState(null);
  const { status } = useContext(UserContext);

  return (
    <>
      <Router>
        <GlobalStyle />
        <Header></Header>
        {status === "noName" && <AddNameModal />}
        <Routes>
          <Route exact strict path="/" element={<Homepage />}>
            <Route path="/game/:id" element={<GameModal />} />
          </Route>

          <Route exact path="/explore" element={<Explore />}>
            <Route path="/explore/game/:id" element={<GameModal />} />
          </Route>
          <Route exact path="/gameOptions/:id" element={<GameOptions />} />
          <Route exact path="/map/:id" element={<Map />} />

          <Route exact path="/CreateMapForm" element={<CreateMapForm />} />

          <Route exact path="/CreateMap" element={<MapMaker />} />

          <Route exact path="/login" element={<Login />} />

          <Route exact path="/logoutPage" element={<Logout />} />

          <Route exact path="/profile" element={<Profile active="liked" />}>
            <Route
              exact
              strict
              index
              element={<LikedGames active="liked" />}
            ></Route>
            <Route
              exact
              strict
              path="/profile/game/:id"
              element={<GameModal />}
            />

            <Route
              exact
              strict
              path="/profile/created"
              element={<CreatedGames />}
            >
              <Route path="/profile/created/game/:id" element={<GameModal />} />
            </Route>
            <Route path="/profile/active" element={<GameModal />} />
          </Route>

          <Route exact path="/Confirmation" element={<Confirmation />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
