import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Order from '../../components/order/Order.jsx';

const AdminOrders = ({ user, updateMessage }) => {
  const [orders, setOrders] = useState([]);
  const [crescent, setCrescent] = useState(false);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:8080/orders')
      .then((res) => {
        setOrders(res.data.response);
      });
  }, []);

  const userOrders = orders.filter(item => user._id === item.user.id);

  const OrderList = () => {
    let ordersArray = [];
    if (filter !== '') {
      if (filter !== 'All') {
        ordersArray = orders.filter(order => order.status.includes(filter));
      } else {
        ordersArray = orders;
      }
    } else {
      ordersArray = orders;
    }
    if (crescent) {
      return ordersArray
        .sort((orderA, orderB) => {
          const a = parseInt(orderA.created_at.slice(0, 10).split('-').join(''), 10);
          const b = parseInt(orderB.created_at.slice(0, 10).split('-').join(''), 10);
          if (a > b) return 1;
          if (a < b) return -1;
          if (a === b) return 0;
        })
        .map((order) => {
          const date = [];
          order.created_at.slice(0, 10).split('-').forEach((item, idx) => {
            if (idx === 0) {
              date.push(item);
            }
            if (idx === 1) {
              date.unshift(item);
            }
            if (idx === 2) {
              date.splice(1, 0, item);
            }
          });
          return <Order key={order._id} user={user} date={date.join('/')} order={order} getOrder={order} />;
        });
    }
    return ordersArray
      .sort((orderA, orderB) => {
        const a = parseInt(orderA.created_at.slice(0, 10).split('-').join(''), 10);
        const b = parseInt(orderB.created_at.slice(0, 10).split('-').join(''), 10);
        if (a < b) return 1;
        if (a > b) return -1;
        if (a === b) return 0;
      })
      .map((order) => {
        const date = [];
        order.created_at.slice(0, 10).split('-').forEach((item, idx) => {
          if (idx === 0) {
            date.push(item);
          }
          if (idx === 1) {
            date.unshift(item);
          }
          if (idx === 2) {
            date.splice(1, 0, item);
          }
        });
        return <Order key={order._id} user={user} date={date.join('/')} order={order} getOrder={order} />;
      });
  };

  const OrderListUser = () => {
    let ordersArray = [];
    if (filter !== '') {
      if (filter !== 'All') {
        ordersArray = orders.filter(order => order.status.includes(filter));
      } else {
        ordersArray = orders;
      }
    } else {
      ordersArray = orders;
    }
    if (crescent) {
      return ordersArray
        .sort((orderA, orderB) => {
          const a = parseInt(orderA.created_at.slice(0, 10).split('-').join(''), 10);
          const b = parseInt(orderB.created_at.slice(0, 10).split('-').join(''), 10);
          if (a > b) return 1;
          if (a < b) return -1;
          if (a === b) return 0;
        })
        .map((order) => {
          if (user._id === order.user.id) {
            userOrders.push(order);
            const date = [];
            order.created_at.slice(0, 10).split('-').forEach((item, idx) => {
              if (idx === 0) {
                date.push(item);
              }
              if (idx === 1) {
                date.unshift(item);
              }
              if (idx === 2) {
                date.splice(1, 0, item);
              }
            });
            return <Order key={order._id} user={user} updateMessage={updateMessage} date={date.join('/')} getOrder={order} />;
          }
        });
    }
    return ordersArray
      .sort((orderA, orderB) => {
        const a = parseInt(orderA.created_at.slice(0, 10).split('-').join(''), 10);
        const b = parseInt(orderB.created_at.slice(0, 10).split('-').join(''), 10);
        if (a < b) return 1;
        if (a > b) return -1;
        if (a === b) return 0;
      })
      .map((order) => {
        if (user._id === order.user.id) {
          userOrders.push(order);
          const date = [];
          order.created_at.slice(0, 10).split('-').forEach((item, idx) => {
            if (idx === 0) {
              date.push(item);
            }
            if (idx === 1) {
              date.unshift(item);
            }
            if (idx === 2) {
              date.splice(1, 0, item);
            }
          });
          return <Order key={order._id} user={user} updateMessage={updateMessage} date={date.join('/')} getOrder={order} />;
        }
      });
  };

  const filterOrders = (e) => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  if (userOrders.length !== 0) {
    return (
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-12 table-responsive ">
            <select className="form-control" onChange={e => filterOrders(e)}>
              <option value="All">All</option>
              <option value="Pending Payment">Pending Payment</option>
              <option value="In Production">In Production</option>
              <option value="To be forwarded">To be forwarded</option>
              <option value="Posted">Posted</option>
              <option value="Delivered">Delivered</option>
            </select>
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>
                    <spam>Date </spam>
                    <div className="icon-container">
                      <div className="cursor">
                        <spam className="material-icons" onClick={() => setCrescent(true)} value="decrescent">arrow_drop_up</spam>
                      </div>
                      <div className="cursor">
                        <spam className="material-icons" onClick={() => setCrescent(false)} value="decrescent">arrow_drop_down</spam>
                      </div>
                    </div>
                  </th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {user.role === 'User'
                  ? OrderListUser()
                  : OrderList()
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="fillin">
      <div className="containerCol paddinTop">
        <select className="form-control" onChange={e => filterOrders(e)}>
          <option value="All">All</option>
          <option value="Pending Payment">Pending Payment</option>
          <option value="In Production">In Production</option>
          <option value="To be forwarded">To be forwarded</option>
          <option value="Posted">Posted</option>
          <option value="Delivered">Delivered</option>
        </select>
        <div>No orders were found.</div>
        <br />
      </div>
    </div>
  );
};

export default AdminOrders;
