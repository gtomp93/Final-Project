import React, { useContext, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import CreateMapForm from "./CreateMapForm";
import Map from "./Map";
import Login from "./Login";
import Logout from "./Logout";
import Header from "./Header";
import GameOptions from "./GameOptions";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profile from "./Profile";
import Homepage from "./Homepage";
import GlobalStyle from "./GlobalStyle";
// import {useAuth0} from "@auth0/auth0-react";
import CreateMap from "./CreateMap";
import MapMaker from "./MapMaker";
import Confirmation from "./Confirmation";

// import {Auth0Provider} from "@auth0/auth0-react";
// import LoginButton from "./LoginButton";

function App() {
  //  const {domain, clientId, redirectUri} = useContext(Auth0Provider);
  // const {user, isAuthenticated, isLoading} = useAuth0();

  return (
    <>
      <Router>
        <GlobalStyle />
        <Header></Header>
        <Switch />
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/gameOptions/:id">
          <GameOptions />
        </Route>
        <Route exact path="/map/:id">
          <Map />
        </Route>
        <Route exact path="/CreateMapForm">
          <CreateMapForm />
        </Route>
        <Route exact path="/CreateMap">
          {/* <CreateMap /> */}
          <MapMaker />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/logoutPage">
          <Logout />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/Confirmation">
          <Confirmation />
        </Route>
      </Router>
    </>
  );
}

export default App;
