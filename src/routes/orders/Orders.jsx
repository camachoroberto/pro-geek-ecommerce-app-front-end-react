import React, { useState } from "react";
import Order from '../../components/order/Order.jsx';

const Orders = ({ user, orders }) => {
  const OrderList = () => {
    return orders.map((order) => {
      const date = order.created_at.slice(0, 10).split('-').join('/');
      return <Order date={date} order={order} />
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-12 table-responsive ">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Date</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {OrderList()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
};

export default Orders;
