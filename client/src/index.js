import React from "react";
import {Auth0Provider} from "@auth0/auth0-react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {UserContextProvider} from "./UserContext";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <Auth0Provider
    domain="dev-rgqyv6wo.us.auth0.com"
    clientId="WajTUaJ4qinBeSFvoUuzoLadtaB7eFYb"
    redirectUri={window.location.origin}
  >
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
