import React, { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState(null);
  const [loggedOut, setLoggedOut] = useState(null);

  let userInfo = null;

  useEffect(() => {
    // loginWithRedirect();
    // if (localStorage.getItem("userinlocal")) {
    //   setCurrentUser(JSON.parse(localStorage.getItem("userinlocal")));
    //  } else {
    const addUser = async () => {
      let doesNotExist = false;

      if (isAuthenticated) {
        // localStorage.setItem("userinlocal", JSON.stringify(user));

        let email = user.email;
        await fetch("/checkusers", {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => {
            userInfo = res.userInfo;

            doesNotExist = res.doesNotExist;
          });

        if (doesNotExist) {
          setCurrentUser({
            email,
            givenName: user.given_name,
            lastName: user.family_name,
            picture: user.picture,
            likes: [],
            games: [],
            score: 0,
          });
          await fetch("/users", {
            method: "POST",
            body: JSON.stringify({
              email,
              givenName: user.given_name,
              lastName: user.family_name,
              picture: user.picture,
              likes: [],
              games: [],
              score: 0,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
        } else {
          setCurrentUser(userInfo);
        }
      } else {
        setLoggedOut("logout");
      }
    };
    addUser();
    // }

    // const addUser = async () => {
    //   let doesNotExist = false;

    //   if (isAuthenticated && !isLoading) {
    //     localStorage.setItem("userinlocal", JSON.stringify(user));
    //     let email = user.email;
    //     await fetch("/checkusers", {
    //       method: "POST",
    //       body: JSON.stringify({email}),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     })
    //       .then((res) => res.json())
    //       .then((res) => {
    //         userInfo = res.userInfo;
    //         doesNotExist = res.doesNotExist;
    //       });

    //     if (doesNotExist) {
    //       setCurrentUser({
    //         email,
    //         givenName: user.given_name,
    //         lastName: user.family_name,
    //         picture: user.picture,
    //         likes: 0,
    //         games: 0,
    //         score: 0,
    //       });
    //       await fetch("/users", {
    //         method: "POST",
    //         body: JSON.stringify({
    //           email,
    //           givenName: user.given_name,
    //           lastName: user.family_name,
    //           picture: user.picture,
    //           likes: 0,
    //           games: 0,
    //           score: 0,
    //         }),
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       });
    //     } else {
    //       setCurrentUser(userInfo);
    //     }
    //   }
    // };
  }, [isAuthenticated, isLoading]);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        status,
        setStatus,
        isAuthenticated,
        isLoading,
        loggedOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
