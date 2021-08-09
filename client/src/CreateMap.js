import React, {useContext, useState} from "react";
import Geocode from "react-geocode";
import styled from "styled-components";
import LocationInput from "./LocationInput";
import {useHistory} from "react-router-dom";

/*global google*/

import {
  GoogleMap,
  useLoadScript,
  StreetViewPanorama,
} from "@react-google-maps/api";
import {MapCreationContext} from "./MapCreationContext";

const streetViewStyle = {
  width: "400px",
  height: "150px",
};

const streetViewOptions = {
  //   disableDefaultUI: true,
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
  const [disabled, setDisabled] = useState(false);

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

  const getCoords = (latitude, longitude, index) => {
    setPosition({lat: latitude, lng: longitude});
    // let copy = locationsList;
    // copy[index] = {latitude, longitude};
    // setLocationsList(copy);
  };

  const addLocation = (coords, index) => {
    let copy = locationsList;
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

  const removeLocation = (index) => {
    let copy = locationsList;
    copy[index] = "";
    setLocations(copy);
    if (complete) {
      setComplete(false);
    }
  };

  const addAnotherLocation = () => {
    setComplete(false);
    let copy = locationsList;
    copy.push("");
    setLocationsList(copy);
  };

  //   console.log("location1", location1);

  console.log("locationsList", locationsList);
  console.log("inputValues", inputValues);

  return (
    <>
      <div>Create Map</div>

      <LocationsListContainer>
        {locationsList.map((item, index) => {
          return (
            <div key={index}>
              <LocationInput
                index={index}
                getCoords={getCoords}
                locationsList={locationsList}
                setLocationsList={setLocationsList}
                addLocation={addLocation}
                removeLocation={removeLocation}
                setPosition={setPosition}
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
              disabled = {created};
            }}
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
      )}
    </>
  );
};

export default CreateMap;

const Search = styled.button``;

const Add = styled.button``;

const LocationsListContainer = styled.div`
  margin-bottom: 40px;
`;
