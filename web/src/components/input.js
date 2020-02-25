import { TextInput } from "grey-vest";
import React from "react";
import * as F from "futil";
import { useObserver } from "mobx-react";

export const Input = ({ field }) => {
  return useObserver(() => (
    <TextInput
      {...{
        ...F.domLens.value("value", field),
        ...F.domLens.focus("focusing", field),
        ...field.props,
        ...(!field.isValid && { style: { borderColor: "red" } }),
        ref: ref => {
          field.focus = () => ref.focus();
        }
      }}
    />
  ));
};

export default Input;
