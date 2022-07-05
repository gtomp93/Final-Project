import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
} from "react";
import { UserContext } from "./UserContext";

export const MapCreationContext = createContext(null);

const initial = {
  name: "",
  description: "",
  pic: "",
  locations: [],
  addresses: [],
  visibleLocation: null,
  pastMin: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "addMapData":
      console.log({
        ...state,
        name: action.name,
        description: action.description,
        pic: action.pic,
      });
      return {
        ...state,
        name: action.name,
        description: action.description,
        pic: action.pic,
      };
    case "setVisible":
      return { ...state, visibleLocation: action.location };
    case "addLocation":
      if (state.locations.length >= 4) state.pastMin = true;
      return {
        ...state,
        locations: [...state.locations, action.location],
        addresses: [...state.addresses, action.address],
      };
    case "removeLocation":
      let locationsCopy = [...state.locations];
      locationsCopy.splice(action.index, 1);
      if (locationsCopy <= 5) locationsCopy.pastMin = false;
      let addressesCopy = [...state.addresses];
      addressesCopy.splice(action.index, 1);
      return { ...state, locations: locationsCopy, addresses: addressesCopy };
    case "reset":
      return { ...initial };
    default:
      console.log("action not found");
  }
};

export const MapCreationContextProvider = ({ children }) => {
  const [mapState, dispatch] = useReducer(reducer, initial);
  const [confirmationDetails, setConfirmationDetails] = useState(null);
  const { currentUser } = useContext(UserContext);

  const defaultImages = [
    "https://google-maps-bucket.s3.us-east-2.amazonaws.com/c1eb6d8db4a554dc2d0392266f03b6f7",
    "https://google-maps-bucket.s3.us-east-2.amazonaws.com/a784bceb7f7325420ae82e3d183a1b5f",
    "https://google-maps-bucket.s3.us-east-2.amazonaws.com/adb13efecb76fbb5e6379a6a5ec0be46",
    "https://google-maps-bucket.s3.us-east-2.amazonaws.com/7353482103f5a33da92399411dd17d24",
  ];

  const addLocations = async (locations) => {
    let gameid = null;

    let url = null;

    if (mapState.pic) {
      console.log("spot1");
      await fetch("/s3url")
        .then((res) => res.json())
        .then((res) => {
          url = res.url;
        });

      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: mapState.pic,
      });
    }

    let imageURL =
      defaultImages[Math.floor(Math.random() * defaultImages.length)];

    if (url) {
      imageURL = url.split("?")[0];
    }

    let mapData = {
      name: mapState.name,
      description: mapState.description,
      pic: imageURL,
      locations,
      likes: 0,
      comments: [],
      creator: `${currentUser.givenName} ${currentUser.lastName}`,
    };

    await fetch("/CreateMap", {
      method: "POST",
      body: JSON.stringify(mapData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        gameid = res._id;
      });

    await fetch("/addMapToUser", {
      method: "PUT",
      body: JSON.stringify({ gameid, user: currentUser._id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setConfirmationDetails({
          name: mapState.name,
          description: mapState.description,
          addresses: mapState.addresses,
          pic: imageURL,
        });
        dispatch({ type: "reset" });
        return;
      });
  };

  return (
    <MapCreationContext.Provider
      value={{
        addLocations,
        mapState,
        dispatch,
        confirmationDetails,
      }}
    >
      {children}
    </MapCreationContext.Provider>
  );
};
