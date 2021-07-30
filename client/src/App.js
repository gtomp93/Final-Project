import React, {useContext, useEffect} from "react";
import logo from "./logo.svg";
import "./App.css";
import Map from "./Map";
import Login from "./Login";
import Logout from "./Logout";
import Header from "./Header";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Profile from "./Profile";
import {useAuth0} from "@auth0/auth0-react";

import {Auth0Provider} from "@auth0/auth0-react";
import LoginButton from "./LoginButton";

function App() {
  //  const {domain, clientId, redirectUri} = useContext(Auth0Provider);
  const {user, isAuthenticated, isLoading} = useAuth0();

  console.log(user);

  const handleTest = () => {
    fetch("/users", {
      method: "POST",
      body: JSON.stringify({test: "test2"}),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(() => {
    const addUser = async () => {
      console.log("somewhere");
      let doesNotExist = false;
      if (isAuthenticated) {
        let email = user.email;
        console.log("here");
        const result = await fetch("/checkusers", {
          method: "POST",
          body: JSON.stringify({email}),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => {
            console.log("res", res);
            doesNotExist = res.doesNotExist;
          });

        console.log("result", result);

        if (doesNotExist) {
          console.log("there");
          await fetch("/users", {
            method: "POST",
            body: JSON.stringify({email}),
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
      }
    };
    addUser();
  }, [isAuthenticated]);

  return (
    <>
      <Router>
        <Header handleTest={handleTest}>Hello World</Header>
        <Switch />
        <Route exact path="/">
          <Map />
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
