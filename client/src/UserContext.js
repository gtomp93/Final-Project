import React, {createContext, useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";

export const UserContext = createContext(null);

export const UserContextProvider = ({children}) => {
  const {user, isAuthenticated, isLoading, loginWithRedirect} = useAuth0();
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("idle");
  const [loggedOut, setLoggedOut] = useState(null);

  console.log("user", user);
  console.log("currentUser", currentUser);

  console.log("isAuthenticated", isAuthenticated);
  console.log("isLoading", isLoading);

  let userInfo = null;

  useEffect(() => {
    console.log("before add user");
    console.log("isAuthenticated", isAuthenticated);
    console.log("isLoading", isLoading);
    // loginWithRedirect();
    // if (localStorage.getItem("userinlocal")) {
    //   setCurrentUser(JSON.parse(localStorage.getItem("userinlocal")));
    //  } else {
    const addUser = async () => {
      let doesNotExist = false;
      // console.log("isAuthenticated", isAuthenticated);
      // console.log("isLoading", isLoading);
      console.log("here1");
      if (isAuthenticated) {
        // localStorage.setItem("userinlocal", JSON.stringify(user));
        console.log("here2");

        let email = user.email;
        await fetch("/checkusers", {
          method: "POST",
          body: JSON.stringify({email}),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => {
            userInfo = res.userInfo;
            console.log("here3");
            console.log("res", res);
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
          console.log("setting current user");
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
    //   console.log("isAuthenticated", isAuthenticated);
    //   console.log("isLoading", isLoading);

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
    //         console.log("res", res);
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
    //       console.log("setting current user");
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
