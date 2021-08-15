import React, {createContext, useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";
import {useHistory} from "react-router-dom";

export const MapCreationContext = createContext(null);

export const MapCreationContextProvider = ({children}) => {
  // const [locations, setLocations] = useState(["", "", "", "", ""]);
  const [pic, setPic] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const {currentUser} = useContext(UserContext);
  const [mapData, setMapData] = useState({});
  const [imageSRC, setImageSRC] = useState(null);
  const history = useHistory();

  useEffect(() => {
    setMapData(
      JSON.parse(localStorage.getItem("mapFormData"))
        ? JSON.parse(localStorage.getItem("mapFormData"))
        : {}
    );
  }, []);

  const handleSubmit = async (name, description, pic, file) => {
    let url = null;
    await fetch("/s3url")
      .then((res) => res.json())
      .then((res) => {
        console.log("HIYA");
        console.log(res);
        url = res.url;
      });

    console.log(url);

    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });

    const imageURL = url.split("?")[0];
    setImageSRC(imageURL);

    console.log("imageURL", imageURL);
    let copy = mapData;
    copy.name = name;
    copy.description = description;
    copy.pic = imageURL;
    setMapData(copy);
    console.log("HERE I AM");
    console.log(copy);
    // localStorage.setItem("mapFormData", JSON.stringify(copy));
  };

  const addLocations = async (locations) => {
    let gameid = null;
    let copy = mapData;
    copy.locations = locations;
    copy.likes = 0;
    copy.creator = currentUser.givenName + " " + currentUser.lastName;
    copy.comments = [];
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
        imageSRC,
      }}
    >
      {children}
    </MapCreationContext.Provider>
  );
};
