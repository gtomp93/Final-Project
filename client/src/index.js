import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserContextProvider } from "./UserContext";
import { MapContextProvider } from "./MapContext";
import { GameContextProvider } from "./GameContext";
import { MapCreationContextProvider } from "./MapCreationContext";
import { ModalContextProvider } from "./ModalContext";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
//window.location.origin

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
    // redirectUri={
    // "https://dev-rgqyv6wo.us.auth0.com/api/v2/clients/6GQJ2r01PH7RZmFndEDkGIEKKv0A7569"
    // }
  >
    <UserContextProvider>
      <GameContextProvider>
        <MapCreationContextProvider>
          <ModalContextProvider>
            <App />
          </ModalContextProvider>
        </MapCreationContextProvider>
      </GameContextProvider>
    </UserContextProvider>
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
