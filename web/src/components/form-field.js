import { Flex, FormField, GridItem } from "grey-vest";
import React from "react";
import { useObserver } from "mobx-react";

let ErrorAlert = ({ children }) =>
  children && <div style={{ color: "red" }}>{children}</div>;

const _FormField = ({ field, width, label, value }) => {
  return useObserver(() => (
    <>
      <FormField
        width={width}
        className='form-field'
        label={label ? label : field.label}
        field={field}
        component={field.component}
        value={value}
      />
      <Flex column as={GridItem} width={width}>
        <ErrorAlert key={field.errors} className='form-error'>
          {field.errors}
        </ErrorAlert>
      </Flex>
    </>
  ));
};

export default _FormField;
