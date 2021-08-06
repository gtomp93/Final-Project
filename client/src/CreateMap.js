import React, {useState} from "react";
import Geocode from "react-geocode";
import styled from "styled-components";

const CreateMap = () => {
  const [location1, setLocation1] = useState(null);
  const [location2, setLocation2] = useState(null);
  const [location3, setLocation3] = useState(null);
  const [location4, setLocation4] = useState(null);
  const [location5, setLocation5] = useState(null);
  const [error, setError] = useState(false);

  const [locations, setLocations] = useState([null, null, null, null, null]);
  const [found, setFound] = useState();

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  Geocode.setLanguage("en");
  Geocode.setLocationType("ROOFTOP");

  const getCoords = (input, index) => {
    let latitude = null;
    let longitude = null;
    Geocode.fromAddress(input).then(
      (response) => {
        const {lat, lng} = response.results[0].geometry.location;
        latitude = lat;
        longitude = lng;
        console.log(lat, lng);
      },
      (error) => {
        console.error(error);
      }
    );
    if (latitude && longitude)
      switch (index) {
        case 0:
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
  };

  const addLocation = ({lat, lng}, index) => {
    locations[index] = {lat, lng};
  };

  if (
    locations.every((item) => {
      return typeof item === "object";
    })
  ) {
  }

  console.log("locations", locations);

  return (
    <>
      <div>Create Map</div>
      <div>
        <label>Enter Address</label>
        <input
          onChange={(ev) => {
            setLocation1(ev.target.value);
          }}
        ></input>
        {!location[0] && (
          <Search onClick={() => getCoords(location1, 0)}>Search</Search>
        )}{" "}
        {location[0] && <Add>Add Location</Add>}
      </div>
      <div>
        <label>Enter Address</label>
        <input
          onChange={(ev) => {
            setLocation2(ev.target.value);
          }}
        ></input>
        {!location1 && (
          <Search onClick={() => getCoords(location2, 1)}>Search</Search>
        )}{" "}
        {location[1] && <Add>Add Location</Add>}
      </div>
      <div>
        <label>Enter Address</label>
        <input
          onChange={(ev) => {
            setLocation3(ev.target.value);
          }}
        ></input>
        {!location2 && (
          <Search onClick={() => getCoords(location3, 2)}>Search</Search>
        )}
        {location[2] && <Add>Add Location</Add>}
      </div>
      <div>
        <label>Enter Address</label>
        <input
          onChange={(ev) => {
            setLocation4(ev.target.value);
          }}
        ></input>
        {location[3] && (
          <Search onClick={() => getCoords(location4, 4)}>Search</Search>
        )}{" "}
        {location[3] && <Add>Add Location</Add>}
      </div>
      <div>
        <label>Enter Address</label>
        <input
          onChange={(ev) => {
            setLocation5(ev.target.value);
          }}
        ></input>
        {!location[4] && (
          <Search onClick={() => getCoords(location5, 5)}>Search</Search>
        )}
        {location[4] && <Add>Add Location</Add>}
      </div>
    </>
  );
};

const Search = styled.button``;

const Add = styled.button``;

export default CreateMap;
