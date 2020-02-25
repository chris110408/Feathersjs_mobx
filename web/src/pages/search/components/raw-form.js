import Form from "mobx-autoform";
import * as F from "futil";
import * as _ from "lodash/fp";
import { validators } from "mobx-autoform";
import V from "validatorjs";
import { RadioListElement, Input } from "../../../components";
const { validatorJS, functions } = validators;

const mergeOver = fns =>
  _.flow(
    _.over(fns),
    F.mergeAllArrays
  );

const rawForm = {
  fields: {
    name: {
      label: "Name",
      component: Input,
      rules: "",
      value: "",
      props: { placeholder: "Restaurant Name" }
    },
    address: {
      label: "Address",
      component: Input,
      rules: "",
      value: "",
      props: { placeholder: "Restaurant Address" }
    },
    star: {
      label: "Stars",
      component: Input,
      props: { placeholder: "input number 1~5" },
      rules: "numeric|min:1|max:5"
    },
    type: {
      label: "Type",
      component: RadioListElement,

      options: ["Chinese", "Korean", "American", "Franch", "Japanese"],
      value: null,
      rules: ""
    }
  },
  submit: async (snapshot, form) => {
    return form;
  }
};

const SearchRestaurantForm = Form({
  ...rawForm,
  validate: mergeOver([validatorJS(V), functions])
});

export { SearchRestaurantForm };
