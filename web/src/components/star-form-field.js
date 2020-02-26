import {Flex, FormField, GridItem, Typography} from "grey-vest";
import React, { useState } from "react";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import { Rate } from "antd";

// const Text = Typography.Text
let ErrorAlert = ({ children }) =>
  children && <div style={{ color: "red" }}>{children}</div>;

const StarFormField = ({ field, width, label, value }) => {
  const [starVal, setStarVal] = useState(field.value);
  const handleStarChange = value => {
    setStarVal(value);
      field.value=value
  };
  return (
    <div>
      <span>
          <label style={{ fontWeight: 600,display:"flex",flexDirection:"column",fontFamily: 'Lato', }}>
            {toJS(field.label)}
        </label>
        <Rate onChange={handleStarChange} value={starVal} />
      </span>
      <Flex column as={GridItem} width={width}>
        <ErrorAlert key={field.errors} className='form-error'>
          {field.errors}
        </ErrorAlert>
      </Flex>
    </div>
  );
};

export default observer(StarFormField);
