import React, {useState} from "react";
import Geocode from "react-geocode";
import styled from "styled-components";
import LocationInput from "./LocationInput";

const CreateMap = () => {
  const [location1, setLocation1] = useState("");
  const [location2, setLocation2] = useState("");
  const [location3, setLocation3] = useState("");
  const [location4, setLocation4] = useState("");
  const [location5, setLocation5] = useState("");
  const [clicked, setClicked] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState(false);

  const [locations, setLocations] = useState(["", "", "", "", ""]);
  const [found, setFound] = useState();

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  Geocode.setLanguage("en");
  Geocode.setLocationType("ROOFTOP");

  const getCoords = (input, index) => {
    console.log("index", index);
    let latitude = null;
    let longitude = null;
    Geocode.fromAddress(input)
      .then(
        (response) => {
          const {lat, lng} = response.results[0].geometry.location;
          latitude = lat;
          longitude = lng;
          console.log(lat, lng);
        },
        (error) => {
          console.error(error);
        }
      )
      .then((res) => {
        console.log(latitude, longitude);
        if (latitude && longitude)
          switch (index) {
            case 0:
              console.log("made it");
              setLocation1({latitude, longitude});
              break;
            case 1:
              setLocation2({latitude, longitude});
              break;
            case 2:
              setLocation3({latitude, longitude});
              break;
            case 3:
              setLocation4({latitude, longitude});
              break;
            case 4:
              setLocation5({latitude, longitude});
              break;
            default:
          }
      });
  };

  const addLocation = (coords, index) => {
    let arr = locations;
    arr[index] = coords;
    console.log(arr);
    setLocations(arr);
    if (
      arr.every((item) => {
        return typeof item === "object";
      })
    ) {
      setComplete(true);
    }
    setClicked(true);
  };

  const removeLocation = (index) => {
    let arr = locations;
    arr[index] = "";
    setLocations(arr);
    if (complete) {
      setComplete(false);
    }
  };

  console.log("location1", location1);

  console.log("locations", locations);

  return (
    <>
      <div>Create Map</div>
      <LocationInput
        location={location1}
        setLocation={setLocation1}
        setLocation={setLocation1}
        addLocation={addLocation}
        locations={locations}
        removeLocation={removeLocation}
        index={0}
        getCoords={getCoords}
        clicked={clicked}
        setClicked={setClicked}
      />
      <LocationInput
        location={location2}
        setLocation={setLocation2}
        setLocation={setLocation2}
        addLocation={addLocation}
        removeLocation={removeLocation}
        locations={locations}
        index={1}
        getCoords={getCoords}
      />
      <LocationInput
        location={location3}
        setLocation={setLocation3}
        setLocation={setLocation3}
        addLocation={addLocation}
        removeLocation={removeLocation}
        locations={locations}
        index={2}
        getCoords={getCoords}
      />
      <LocationInput
        location={location4}
        setLocation={setLocation4}
        setLocation={setLocation4}
        addLocation={addLocation}
        removeLocation={removeLocation}
        locations={locations}
        index={3}
        getCoords={getCoords}
      />
      <LocationInput
        location={location5}
        setLocation={setLocation5}
        setLocation={setLocation5}
        addLocation={addLocation}
        removeLocation={removeLocation}
        locations={locations}
        index={4}
        getCoords={getCoords}
      />
      {complete && <button>Create Game</button>}
      {/* {locations.every((item) => {
        console.log(typeof item); 
        return typeof item === "object"; */}
    </>
  );
};

export default CreateMap;
