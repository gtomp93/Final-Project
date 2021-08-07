import React, {useState} from "react";
import styled from "styled-components";
import Geocode from "react-geocode";

const LocationInput = ({
  location,
  locations,
  getCoords,
  addLocation,
  index,
  setLocation,
  removeLocation,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [disabled, setDisabled] = useState(false);

  console.log("location", location);

  return (
    <div>
      <label>Enter Address</label>
      <input
        value={inputValue}
        onChange={(ev) => {
          setLocation(ev.target.value);
          setInputValue(ev.target.value);
        }}
        placeholder="Enter Address"
        disabled={disabled}
      ></input>
      {typeof location === "string" && location !== "added" && (
        <Search onClick={() => getCoords(location, index)}>Search</Search>
      )}{" "}
      {typeof location === "object" && !locations[index] && (
        <Add
          onClick={() => {
            addLocation(location, index);
            setDisabled(true);
          }}
        >
          Add
        </Add>
      )}
      {location === "added" && (
        <Remove
          onClick={(ev) => {
            removeLocation(index);
            setInputValue("");
            setDisabled(false);
          }}
          type="reset"
          defaultValue="Reset"
        >
          Remove
        </Remove>
      )}
    </div>
  );
};

const Search = styled.button``;

const Add = styled.button``;

const Remove = styled.button``;

export default LocationInput;
