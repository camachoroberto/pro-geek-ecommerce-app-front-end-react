import React, { useState } from "react";
import Order from '../../components/order/Order.jsx';
import { Redirect } from 'react-router-dom';

const AdminOrders = ({ user, orders }) => {
  const OrderList = () => {
    return orders.map((order) => {
      const date = order.created_at.slice(0, 10).split('-').join('/');
      return <Order user={user} date={date} order={order} />
    })
  }

  const OrderListUser = () => {
    return orders.map((order) => {
  
      if (user._id === order.user.id) {
        const date = order.created_at.slice(0, 10).split('-').join('/');
        return <Order user={user} date={date} order={order} />
      }
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
              { user.role === 'User'
                ? OrderListUser()
                : user.role === 'Admin'
                ? OrderList()
                : <Redirect to="/profile/orders"/>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
};

export default AdminOrders;
