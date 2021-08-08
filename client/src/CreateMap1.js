import {MapCreationContext} from "./MapCreationContext";
import Link from "react-router-dom";
import React, {useContext, useState} from "react";
import styled from "styled-components";
const CreateMap1 = () => {
  const {handleSubmit, mapData} = useContext(MapCreationContext);
  const [pic, setPic] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [required, setRequired] = useState(false);

  console.log(mapData);

  return (
    <Container>
      <FormWrapper>
        <h1>Map Creator- Part 1</h1>
        <InputWrapper>
          <label>Name</label>
          <Input
            placeholder="name"
            onChange={(ev) => {
              setName(ev.target.value);
            }}
            disabled={submitted}
          ></Input>
          {required && name.length < 1 && <Required>Required</Required>}
        </InputWrapper>
        <InputWrapper>
          <label>Description</label>
          <Input
            placeholder="description"
            onChange={(ev) => {
              setDescription(ev.target.value);
            }}
            disabled={submitted}
          ></Input>
          {required && description.length < 1 && <Required>Required</Required>}
        </InputWrapper>
        <InputWrapper>
          <label> Picture URL</label>
          <Input
            placeholder="Image URL"
            onChange={(ev) => {
              setPic(ev.target.value);
            }}
            disabled={submitted}
          ></Input>
        </InputWrapper>
        <Submit
          onClick={() => {
            if (name.length > 0 && description.length > 0) {
              setRequired(false);
              handleSubmit(name, description, pic);
              console.log("clicked");
              setSubmitted(!submitted);
            } else {
              setRequired(true);
            }
          }}
        >
          {submitted ? "Edit" : "Submit"}
        </Submit>
        <Next>Next</Next>
        {submitted && <Pic src={pic}></Pic>}
      </FormWrapper>
    </Container>
  );
};

const Container = styled.div``;

const FormWrapper = styled.div``;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input``;

const Required = styled.p`
  color: red;
`;

const Submit = styled.button``;

const Next = styled.button``;

const Pic = styled.img`
  width: 100px;
`;

export default CreateMap1;
