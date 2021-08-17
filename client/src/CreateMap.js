import React, {useContext, useState} from "react";
import Geocode from "react-geocode";
import styled from "styled-components";
import LocationInput from "./LocationInput";
import {useHistory} from "react-router-dom";
import {BiMap} from "react-icons/bi";

/*global google*/

import {
  GoogleMap,
  useLoadScript,
  StreetViewPanorama,
} from "@react-google-maps/api";
import {MapCreationContext} from "./MapCreationContext";

const streetViewStyle = {
  width: "400px",
  height: "250px",
};

const streetViewOptions = {
  disableDefaultUI: true,
  streetViewControl: true,
  enableCloseButton: false,
  showRoadLabels: false,
};

const libraries = ["geometry"];

const CreateMap = () => {
  const [locationsList, setLocationsList] = useState(["", "", "", "", ""]);
  const [position, setPosition] = useState(null);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState(false);
  const [created, setCreated] = useState(false);
  const [inputValues, setInputValues] = useState(["", "", "", "", ""]);
  const [disabled, setDisabled] = useState([false, false, false, false, false]);
  const [title, setTitle] = useState("");
  const [names, setNames] = useState(["", "", "", ""]);
  const [searched, setSearched] = useState([false, false, false, false, false]);

  const [locations, setLocations] = useState(["", "", "", "", ""]);
  const [found, setFound] = useState();

  const history = useHistory();

  const {addLocations} = useContext(MapCreationContext);

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) {
    return "error loading maps";
  }
  if (!isLoaded) {
    return "loading maps";
  }

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  Geocode.setLanguage("en");
  Geocode.setLocationType("ROOFTOP");

  if (isLoaded) {
    let answer = new google.maps.LatLng({lat: 36.1124573, lng: -7.2212925});
    console.log(answer);
  }

  const getCoords = (latitude, longitude, placeName, index) => {
    setPosition({lat: latitude, lng: longitude});
    setTitle(placeName);
    let copy = [...disabled];
    copy[index] = true;
    setDisabled(copy);
    // let copy = locationsList;
    // copy[index] = {latitude, longitude};
    // setLocationsList(copy);
  };

  const addLocation = (coords, index) => {
    let copy = [...names];
    copy[index] = locationsList[index];
    setNames(copy);
    copy = [...locationsList];
    copy[index] = coords;
    setLocationsList(copy);

    if (
      copy.every((item) => {
        return typeof item === "object";
      })
    ) {
      setComplete(true);
    }
    // setClicked(true);
  };

  const editLocation = (index) => {
    let copy = [...locationsList];
    copy[index] = "";
    setLocationsList(copy);
    copy = [...names];
    copy[index] = "";
    setNames(copy);
    copy = [...disabled];
    copy[index] = false;
    setDisabled(copy);

    if (complete) {
      setComplete(false);
    }
  };

  const addAnotherLocation = () => {
    setComplete(false);
    let copy = [...locationsList];
    copy.push("");
    setLocationsList(copy);
    copy = [...names];
    copy.push("");
    setNames(copy);
    copy = [...disabled];
    copy.push(false);
    setDisabled(copy);
  };

  const recordError = (index) => {
    let copy = [...locationsList];
    copy[index] = "error";
    setLocationsList(copy);
  };

  const removeLocation = (index) => {
    let copy1 = [...names];
    copy1.splice(index, 1);
    setNames(copy1);
    let copy2 = [...disabled];
    copy2.splice(index, 1);
    setDisabled(copy2);
    let copy3 = [...locationsList];
    copy3.splice(index, 1);
    // console.log(copy, "copyhere");
    let finalCopy = copy3.map((item, index) => {
      if (!copy2[index]) {
        return "";
      } else {
        return item;
      }
    });
    console.log("finalCopy", finalCopy);
    setLocationsList(finalCopy);

    if (
      finalCopy.every((item) => {
        return typeof item === "object";
      })
    ) {
      setComplete(true);
    }
  };
  //   console.log("location1", location1);

  console.log("locationsList", locationsList);
  // console.log("inputValues", inputValues);

  return (
    <Container>
      <div style={{display: "flex", alignItems: "center"}}>
        <BiMap size={"26px"} />
        <h2>Create Map</h2>
      </div>

      <LocationsListContainer>
        {locationsList.map((item, index) => {
          return (
            <div key={index}>
              <LocationInput
                item={item}
                index={index}
                getCoords={getCoords}
                locationsList={locationsList}
                setLocationsList={setLocationsList}
                addLocation={addLocation}
                editLocation={editLocation}
                setPosition={setPosition}
                removeLocation={removeLocation}
                recordError={recordError}
                names={names}
                disabled={disabled}
              />
            </div>
          );
        })}
      </LocationsListContainer>

      {/* <LocationInput
        location={location5}
        setLocation={setLocation5}
        setLocation={setLocation5}
        addLocation={addLocation}
        removeLocation={removeLocation}
        locations={locations}
        index={4}
        getCoords={getCoords} 
      />*/}
      {complete && (
        <>
          <button
            onClick={() => {
              addAnotherLocation();
              setComplete(false);
            }}
            style={{marginRight: "15px"}}
            disabled={created}
          >
            Add another location
          </button>
          <button
            onClick={() => {
              addLocations(locationsList);
              setCreated(true);
            }}
            disabled={created}
          >
            Create Game
          </button>
        </>
      )}
      {position && (
        <>
          <ViewLabel>Street view of {title}</ViewLabel>
          <GoogleMap
            mapContainerStyle={streetViewStyle}
            options={streetViewOptions}
            linksControl={false}
          >
            <StreetViewPanorama
              position={position}
              visible={true}
              options={streetViewOptions}
            />
          </GoogleMap>
        </>
      )}
    </Container>
  );
};

export default CreateMap;

const Search = styled.button``;

const Add = styled.button``;

const Container = styled.div`
  margin-left: 8px;
`;

const LocationsListContainer = styled.div`
  margin-bottom: 10px;
`;

const ViewLabel = styled.h3`
  margin: 0 0 6px;
  color: black;
`;
