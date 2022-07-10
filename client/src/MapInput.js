import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import styled from "styled-components";
import Geocode from "react-geocode";

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const MapInput = ({ dispatch, index, address }) => {
  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  Geocode.setLanguage("en");
  Geocode.setLocationType("ROOFTOP");
  const [value, setValue] = useState("");
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    const geocodeLocation = () => {
      Geocode.fromAddress(value.label).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setCoords({ lat, lng });
          dispatch({ type: "setVisible", location: { lat, lng } });
        },
        (error) => {
          console.error(error);
        }
      );
    };
    if (value) {
      geocodeLocation();
    }
  }, [value]);

  return (
    <Container>
      <Option
        apiKey={apiKey}
        selectProps={{
          defaultInputValue: address,
          value,
          onChange: setValue,
          defaultInputValue: address,
          styles: {
            input: (provided) => ({
              ...provided,
            }),
            option: (provided) => ({
              ...provided,
            }),
            singleValue: (provided) => ({
              ...provided,
            }),
          },
        }}
      />

      <Button
        onClick={() => {
          if (value?.label) {
            dispatch({
              type: "addLocation",
              index,
              location: coords,
              address: value.label,
            });
            setValue("");
          }
        }}
      >
        Add Location
      </Button>
    </Container>
  );
};

const Option = styled(GooglePlacesAutocomplete)`
  width: 200px;
`;

const Container = styled.div`
  width: 85%;
  max-width: 500px;
  color: black;
`;

const Button = styled.button`
  padding: 4px;
  font-size: 16px;
`;

export default MapInput;
