import React, { useEffect, useRef, useState } from "react";
import { Form, FormContent, Box, Flex } from "grey-vest";
import styled from "styled-components";
import { extendObservable } from "mobx";
import { useObserver } from "mobx-react";
import RegisterForm from "./components/raw-form";
import { CommandButton } from "../../components/command-button";
import FormField from "../../components/form-field";
import "antd/dist/antd.css";
import {
  _Command,
  extraCommand,
  redirectCommand
} from "../../utils/extend-futil";
import "antd/dist/antd.css";
import { useHistory, Link } from "react-router-dom";
import image from "../../img/login.svg";
import { requestSignUp } from "../../services/register";

let Command = extraCommand(
  _Command,
  redirectCommand("/login", "successful login"),
  x => y => extendObservable(y, x)
);
const Divform = styled.div`
  height: 100vh;
  width: 100vh;
  background-image: url(${image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
  margin: auto;
  position: relative;

  .container {
    position: absolute;
    top: 30%;
    left: 30%;
  }

  .form-main {
    background-color: #f6f9fc;
    padding: 10px 50px 50px 50px;
  }
  .form-field {
    margin: 10px 20px;
  }

  .button-group {
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
  }
`;

const Register = () => {
  let history = useHistory();
  useEffect(() => {
    RegisterForm.fields.email.focus();
  }, []);

  const registerEffect = async payload => {
    try {
      delete payload.password_confirmation
      const res = await requestSignUp(payload);
      return { res, history };
    } catch (e) {
      throw e;
    }
  };
  const handleSubmit = Command(async () => {
    const form = await RegisterForm.submit();

    if (form) {

      return await registerEffect(form.getSnapshot());
    } else {
      throw {name:'form valid error',message:'please fix your mistake'};
    }
  });



  return useObserver(() => (
    <Divform>
      <div className='container'>
        <Form as={Box} className='form-main'>
          <Flex justifyContent='center'>
            <h1 className='form-header'>Sign Up</h1>
          </Flex>
          <FormContent columns={2}>
            <FormField field={RegisterForm.fields.email} width={2} />
            <FormField field={RegisterForm.fields.first_name} width={2} />
            <FormField
              field={RegisterForm.fields.password_confirmation}
              label='password'
              width={2}
            />
            <FormField
              field={RegisterForm.fields.password}
              label='password confirmation'
              width={2}
            />
          </FormContent>
          <div className='button-group'>
            <CommandButton command={handleSubmit} arg={RegisterForm.isValid}>
              Sign Up
            </CommandButton>
            <Link className='register' to='/login'>
              cancel
            </Link>
          </div>
        </Form>
      </div>
    </Divform>
  ));
};

export default Register;
