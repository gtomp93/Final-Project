import React, {createContext, useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";

export const MapCreationContext = createContext(null);

export const MapCreationContextProvider = ({children}) => {
  // const [locations, setLocations] = useState(["", "", "", "", ""]);
  const [pic, setPic] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const {currentUser} = useContext(UserContext);
  const [mapData, setMapData] = useState({});

  useEffect(() => {
    setMapData(
      JSON.parse(localStorage.getItem("mapFormData"))
        ? JSON.parse(localStorage.getItem("mapFormData"))
        : {}
    );
  }, []);

  const handleSubmit = (name, description, pic) => {
    console.log("here");
    let copy = mapData;
    copy.name = name;
    copy.description = description;
    copy.pic = pic;
    setMapData(copy);
    localStorage.setItem("mapFormData", JSON.stringify(copy));
  };

  const addLocations = async (locations) => {
    let gameid = null;
    let copy = mapData;
    copy.locations = locations;
    console.log(copy);

    await fetch("/CreateGame", {
      method: "POST",
      body: JSON.stringify(copy),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        gameid = res._id;
      });

    await fetch("/addGameToUser", {
      method: "PUT",
      body: JSON.stringify({gameid, user: currentUser._id}),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };

  return (
    <MapCreationContext.Provider
      value={{
        handleSubmit,
        addLocations,
        name,
        setName,
        description,
        setDescription,
        pic,
        setPic,
        mapData,
      }}
    >
      {children}
    </MapCreationContext.Provider>
  );
};
