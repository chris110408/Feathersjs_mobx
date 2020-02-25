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
            <tr>
              <td>{i.name}</td>
              <td>{i.address}</td>
              <td>{i.star}</td>
              <td>{i.type}</td>
            </tr>
          ),
          restaurantData
        )}
      </tbody>
    </Table>
  );
};

export default observer(RestaurantsTable);

