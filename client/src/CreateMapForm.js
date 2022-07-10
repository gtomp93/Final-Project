import { MapCreationContext } from "./MapCreationContext";
import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import styled from "styled-components";
const CreateMapForm = () => {
  const { dispatch } = useContext(MapCreationContext);
  const [submitted, setSubmitted] = useState(false);
  const [required, setRequired] = useState(false);
  const [tempURL, setTempURL] = useState("");
  const [mapForm, setMapForm] = useState({
    name: "",
    description: "",
    pic: "",
  });
  const fillForm = (key, value) => {
    setMapForm({ ...mapForm, [key]: value });
  };

  return (
    <Background>
      <Container>
        <FormWrapper>
          <h1>Map Creator- Part 1</h1>
          <InputWrapper>
            <Label>Map Name</Label>
            <Input
              placeholder="name"
              onChange={(ev) => {
                fillForm("name", ev.target.value);
              }}
              disabled={submitted}
              style={{ marginLeft: "8px" }}
            />
            {required && mapForm.name.length < 1 && (
              <Required>Required</Required>
            )}
          </InputWrapper>
          <InputWrapper>
            <Label style={{ marginRight: "1px" }}>Description</Label>
            <TextArea
              placeholder="Description"
              onChange={(ev) => {
                fillForm("description", ev.target.value);
              }}
              disabled={submitted}
            ></TextArea>
            {required && mapForm.description.length < 1 && (
              <Required>Required</Required>
            )}
          </InputWrapper>
          <InputWrapper>
            <Label style={{ marginRight: "6px" }}>Map Image</Label>
            <input
              type="file"
              accept="image/*"
              onChange={(ev) => {
                fillForm("pic", ev.target.files[0]);
                setTempURL(URL.createObjectURL(ev.target.files[0]));
              }}
            ></input>
          </InputWrapper>
          <Submit
            onClick={(ev) => {
              ev.preventDefault();
              if (mapForm.name.length > 0 && mapForm.description.length > 0) {
                setRequired(false);
                dispatch({
                  type: "addMapData",
                  name: mapForm.name,
                  description: mapForm.description,
                  pic: mapForm.pic,
                });
                setSubmitted(!submitted);
              } else {
                setRequired(true);
              }
            }}
          >
            {submitted ? "Edit" : "Submit"}
          </Submit>

          {submitted && <Next to="/CreateMap">Next</Next>}
        </FormWrapper>
        {submitted && mapForm.pic && <Pic src={tempURL}></Pic>}
      </Container>
    </Background>
  );
};

const Background = styled.div`
  background-image: url("https://google-maps-bucket.s3.us-east-2.amazonaws.com/shutterstock_1228111945.jpg");
  background-size: cover;
  width: 100%;
  height: calc(100vh - 44px);
  display: grid;
  place-items: center;
`;

const Container = styled.div`
  margin-left: 7px;
  display: flex;
  flex-direction: column;
  max-width: 95%;
  @media (min-width: 769px) {
    flex-direction: row;
  }
  background: rgba(255, 255, 255, 0.65);
  padding: 16px;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 22px;
`;

const FormWrapper = styled.div``;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const Input = styled.input``;

const TextArea = styled.textarea`
  width: 230px;
  resize: none;
  @media (min-width: 399px) {
    width: 250px;
  }
`;

const Required = styled.p`
  color: red;
`;

const Submit = styled.button`
  background-color: rgba(0, 0, 0, 0.87);
  /* color: #b9bec7; */
  margin-top: 4px;
  /* border: solid grey 1px; */
  border: none;
  border-radius: 4px;
  color: #5a7bb0;
  box-shadow: 0 0 10px rgb(255 255 255 / 10%);
  font-weight: bold;
  font-size: 20px;

  padding: 4px 7px 4px;
  &:disabled {
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow: none;
  }
`;

const Next = styled(Link)`
  background-color: rgba(0, 0, 0, 0.87);
  margin-top: 4px;
  margin-left: 8px;

  text-decoration: none;
  border: none;
  border-radius: 4px;
  color: #5a7bb0;
  box-shadow: 0 0 10px rgb(255 255 255 / 10%);
  font-weight: bold;
  font-size: 20px;
  padding: 4px 7px 4px;
`;

const Pic = styled.img`
  width: 300px;
  height: auto;
  margin: 10px 0 0;
  @media (min-width: 769px) {
    flex-direction: row;
    margin: 20px 10px 0;
  }
`;

export default CreateMapForm;
