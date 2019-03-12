import React, { useState } from "react";
import Axios from 'axios';
import { Collapse, Button } from 'react-bootstrap';


const Order = ({ user, date, order }) => {
  const [status, setStatus] = useState(order.status);
  const [open, setOpen] = useState(false);

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

  const handleOpen = () => {
    setOpen(!open);
  }

  const detailProducts = () => {
    return order.products.map((product) => {
      return <p> {product.name} |
        QTY {product.quantity} |
        $ {product.price} | 
        Amount$ {product.price * product.quantity}</p>
    });
  }


  const detailUser = () => {
    return <p> User Name: {order.user.name} </p>
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
        <td>
          {order._id}
          <Collapse in={open}>
            <div id="example-collapse-text">
              {detailProducts()}
              {detailUser()}
            </div>
          </Collapse>
        </td>
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
          <Button onClick={() => handleOpen()}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            className="btn btn-primary ButtonPG"> details</Button>
        </td>
      </tr>
    )
  }
  console.log(order)
  return (
    <tr>
      <td>{order._id}
        <Collapse in={open}>
          <div id="example-collapse-text">
            <div className="card card-body margin10">
              {detailProducts()}
            </div>
          </div>
        </Collapse>
      </td>
      <td>{date}</td>
      <td>
        <p className="form-control form-control-lg">{status}</p>
      </td>
      <td>
        {status === 'Delivered' ? <button className="btn btn-primary ButtonPG" >Evaluate Order</button> : ''}
      </td>
      <td>
        <Button onClick={() => handleOpen()}
          aria-controls="example-collapse-text"
          aria-expanded={open}
          className="btn btn-primary ButtonPG"> details</Button>
      </td>
    </tr>
  )


}

export default Order;