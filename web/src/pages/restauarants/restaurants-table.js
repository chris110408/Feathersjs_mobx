import React from "react";

import { Popconfirm } from "antd";
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
          <th>Edit and Delete</th>
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
              <td key={`5-${i._id}`}>
                <div style={{ display: "flex" }}>
                  <a
                    style={{ marginRight: 10 }}
                    onClick={() => showEditModal(i)}
                  >
                    Edit
                  </a>

                  <Popconfirm
                    title='Are you sure？'
                    onConfirm={() => deleteRecord(i._id)}
                  >
                    <a>Delete</a>
                  </Popconfirm>
                </div>
              </td>
            </tr>
          ),
          restaurantData
        )}
      </tbody>
    </Table>
  );
};

export default observer(RestaurantsTable);
