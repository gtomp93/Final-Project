import React, { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState(null);
  const [loggedOut, setLoggedOut] = useState(null);
  const [reloadUser, setReloadUser] = useState(false);

  useEffect(() => {
    // loginWithRedirect();
    // if (localStorage.getItem("userinlocal")) {
    //   setCurrentUser(JSON.parse(localStorage.getItem("userinlocal")));
    //  } else {
    const addUser = async () => {
      let doesNotExist = false;
      let userInfo = null;

      if (isAuthenticated) {
        // localStorage.setItem("userinlocal", JSON.stringify(user));

        let email = user.email;
        await fetch("https://mapguesser-server.herokuapp.com/api/checkusers", {
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
          await fetch("https://mapguesser-server.herokuapp.com/api/users", {
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

          if (!user.given_name || !user.family_name) {
            setStatus("noName");
          }
        } else {
          if (!userInfo.givenName || !userInfo.lastName) {
            setStatus("noName");
          }
          setCurrentUser(userInfo);
        }
      }
    };
    if (user) {
      addUser();
    } else if (
      user &&
      currentUser.email &&
      (!currentUser.givenName || !currentUser.lastName)
    ) {
      setStatus("noName");
    }
  }, [isAuthenticated, isLoading, reloadUser]);

  // useEffect(()=>{
  //     timer > 0 && !stop && setTimeout(() => setTimer(timer - 1), 1000);

  // },[timer])

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        setReloadUser,
        reloadUser,
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
