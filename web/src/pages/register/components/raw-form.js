import Form from "mobx-autoform";
import * as F from "futil";
import * as _ from "lodash/fp";
import { validators } from "mobx-autoform";
import V from "validatorjs";
import { Input } from "../../../components/input";
const { validatorJS, functions } = validators;

const mergeOver = fns =>
  _.flow(
    _.over(fns),
    F.mergeAllArrays
  );

const rawForm = {
  fields: {
    email: {
      type: "email",
      label: "Email Address",
      component: Input,
      rules: "required|email|string|between:5,250",
      value: "",
      props: { placeholder: "Email" }
    },
    first_name: {
      label: "First Name",
      component: Input,
      rules: "required",
      value: "",
      props: { placeholder: "First Name" }
    },
    password_confirmation: {
      component: Input,
      props: { type: "password", placeholder: "Password" },
      rules: "required"
    },
    password: {
      component: Input,
      props: { type: "password", placeholder: "Confirm your Password" },
      rules: "required|confirmed"
    }
  },
  submit: async (snapshot, form) => {
    return form;
  }
};
const RegisterForm = Form({
  ...rawForm,
  validate: mergeOver([validatorJS(V), functions])
});

export default RegisterForm;
