import React from "react";
import PropTypes from "prop-types";
import { Popconfirm} from "antd";
import {Table} from "grey-vest"
import * as _ from "lodash/fp";
import {useObserver} from "mobx-react-lite";
import {observer} from "mobx-react";
const RestaurantsTable = ({ store, deleteRecord, showEditModal ,loading}) => {





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
                (i) => (
                    <tr>
                        <td>{i.name}</td>
                        <td>{i.address}</td>
                        <td>{i.star}</td>
                        <td>{i.type}</td>
                        <td>
                            <div style={{display:'flex'}}>
                                <a style={{marginRight:10}} onClick={() => showEditModal(i)}>Edit</a>

                                <Popconfirm title="Are you sure？" onConfirm={() => deleteRecord(i._id)}>
                                    <a>
                                        Delete
                                    </a>
                                </Popconfirm>

                            </div>
                        </td>
                    </tr>
                ),
                store.restaurants
            )}
            </tbody>
        </Table>
    );
};



export default observer(RestaurantsTable) ;
