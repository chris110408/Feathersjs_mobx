import React, { useContext, useEffect } from "react";
import { Form, FormContent, Box, Flex } from "grey-vest";
import _ from "lodash/fp";
import styled from "styled-components";
import { reaction, transaction, extendObservable } from "mobx";
import { observer } from "mobx-react";
import LoginForm from "./components/raw-form";
import { CommandButton, FormField } from "../../components";
import {
  _Command,
  extraCommand,
  redirectSaveTokenCommand
} from "../../utils/extend-futil";
import "antd/dist/antd.css";
import { useHistory, Link } from "react-router-dom";
import image from "../../img/login.svg";
import { GobalStoreContext } from "../../store";

let Command = extraCommand(
  _Command,
  redirectSaveTokenCommand("/", "successful login"),
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

transaction(() => {
  _.each(
    field => reaction(() => field.value, field.validate),
    LoginForm.fields
  );
});

const Login = () => {
  let history = useHistory();
  const GlobalStore = useContext(GobalStoreContext);
  console.log(GlobalStore);
  GlobalStore.history = history;
  useEffect(() => {
    LoginForm.fields.email.focus();
  }, []);

  const handleSubmit = Command(async () => {
    if (LoginForm.isValid) {
      const fields = await LoginForm.submit();
      const res = await GlobalStore.loginEffect(fields);
      return res;
    } else {
      throw LoginForm.submitError;
    }
  });
  return (
    <Divform>
      <div className='container'>
        <Form as={Box} className='form-main'>
          <Flex justifyContent='center'>
            <h1 className='form-header'>Login</h1>
          </Flex>
          <FormContent columns={2}>
            <FormField field={LoginForm.fields.email} width={2} />
            <FormField field={LoginForm.fields.password} width={2} />
          </FormContent>
          <div className='button-group'>
            <CommandButton command={handleSubmit} arg={LoginForm.isValid}>
              Submit
            </CommandButton>
            <Link className='register' to='/register'>
              Sign Up
            </Link>
          </div>
        </Form>
      </div>
    </Divform>
  );
};

export default observer(Login);
