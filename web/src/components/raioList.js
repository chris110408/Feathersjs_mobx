import React from "react";
import * as F from "futil";
import { observer } from "mobx-react";
import * as _ from "lodash/fp";

let lensEq = _.curryN(2, (value, ...lens) => F.view(...lens) === value);
export let radioValue = _.curryN(2, (value, ...lens) => ({
  value,
  checked: lensEq(value, ...lens),
  onChange: F.setsWith("target.value", ...lens)
}));

const RadioListElement = observer(({ field }) => (
  <div style={{ display: "flex", justifyContent: "space-around" }}>
    {_.map(
      option => (
        <label>
          <input
            {...{
              type: "radio",
              ...radioValue(option, "value", field)
            }}
          />
          {option}
        </label>
      ),
      field.options
    )}
  </div>
));

export default RadioListElement;
