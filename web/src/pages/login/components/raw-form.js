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
      value: ""
    },
    password: {
      component: Input,
      props: { type: "password" },
      rules: "required"
    }
  },
  submit: async snapshot => {
    return snapshot;
  }
};
const LoginForm = Form({
  ...rawForm,
  validate: mergeOver([validatorJS(V), functions])
});

export default LoginForm;
