import React, {createContext, useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";

export const UserContext = createContext(null);

export const UserContextProvider = ({children}) => {
  const {user, isAuthenticated, isLoading} = useAuth0();
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("idle");

  console.log(currentUser);

  let userInfo = null;

  useEffect(() => {
    const addUser = async () => {
      let doesNotExist = false;
      if (isAuthenticated) {
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
            console.log("res", res);
            doesNotExist = res.doesNotExist;
          });

        if (doesNotExist) {
          setCurrentUser({
            email,
            givenName: user.given_name,
            lastName: user.family_name,
            picture: user.picture,
            likes: 0,
            score: 0,
          });
          await fetch("/users", {
            method: "POST",
            body: JSON.stringify({
              email,
              givenName: user.given_name,
              lastName: user.family_name,
              picture: user.picture,
              likes: 0,
              score: 0,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
        } else {
          setCurrentUser(userInfo);
        }
      }
    };
    addUser();
  }, [isAuthenticated]);

  console.log("currentUser", currentUser);

  return (
    <UserContext.Provider
      value={{currentUser, setCurrentUser, status, setStatus}}
    >
      {children}
    </UserContext.Provider>
  );
};
