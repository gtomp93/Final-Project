import React, {useContext, useEffect} from "react";
import logo from "./logo.svg";
import "./App.css";
import Map from "./Map";
import Login from "./Login";
import Logout from "./Logout";
import Header from "./Header";
import GameOptions from "./GameOptions";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Profile from "./Profile";
import Homepage from "./Homepage";
import {useAuth0} from "@auth0/auth0-react";
import CreateMap from "./CreateMap";

import {Auth0Provider} from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import CreateMap from "./CreateMap";

function App() {
  //  const {domain, clientId, redirectUri} = useContext(Auth0Provider);
  const {user, isAuthenticated, isLoading} = useAuth0();

  return (
    <>
      <Router>
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
        <Route exact path="/CreateMap">
          <CreateMap />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/logout">
          <Logout />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
      </Router>
    </>
  );
}

export default App;
