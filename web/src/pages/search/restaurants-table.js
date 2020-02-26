import React from "react";

import { Table } from "grey-vest";
import * as _ from "lodash/fp";
import { observer } from "mobx-react";
const RestaurantsTable = ({ restaurantData, deleteRecord, showEditModal }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>star</th>
          <th>type</th>
        </tr>
      </thead>
      <tbody>
        {_.map(
          i => (
            <tr key={`${i._id}`}>
              <td key={`1-${i._id}`}>{i.name}</td>
              <td key={`2-${i._id}`}>{i.address}</td>
              <td key={`3-${i._id}`}>{i.star}</td>
              <td key={`4-${i._id}`}>{i.type}</td>
            </tr>
          ),
          restaurantData
        )}
      </tbody>
    </Table>
  );
};

export default observer(RestaurantsTable);
