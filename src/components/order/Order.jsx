import React, { useState } from "react";
import Axios from 'axios';

const Order = ({ user, date, order }) => {
  const [status, setStatus] = useState(order.status);

  const swap = (idx, array) => {
    const temp = array[0];
    array[0] = array[idx];
    array[idx] = temp;
    return array;
  }

  let statusOptions = ['Peding payment', 'In production', 'To be fowarded', 'Posted', 'Delivered'];
  statusOptions = swap(statusOptions.indexOf(order.status), statusOptions);
  const listOptions = () => {
    return statusOptions.map((status) => {
      return <option value={status}>{status}</option>
    })
  }


  const handleSubmit = () => {
    Axios.patch(`http://localhost:8080/orders/${order._id}`, { status })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        throw err;
      })
  }

  if (user.role === 'Admin') {
    return (
      <tr>
        <td>{order._id}</td>
        <td>{date}</td>
        <td>
          <select className="form-control form-control-lg" onChange={e => setStatus(e.currentTarget.value)}>
            {listOptions()}
          </select>
        </td>
        <td>
          <button className="btn btn-primary ButtonPG" onClick={handleSubmit}>Update status</button>
        </td>
        <td>
          <button className="btn btn-primary ButtonPG">details</button>
        </td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{order._id}</td>
      <td>{date}</td>
      <td>
        <p className="form-control form-control-lg">{status}</p>
      </td>
      <td>
        {status === 'Delivered' ? <button className="btn btn-primary ButtonPG" >Evaluate Order</button> : ''}
      </td>
      <td>
        <button className="btn btn-primary ButtonPG">details</button>
      </td>
    </tr>
  )


}

export default Order;