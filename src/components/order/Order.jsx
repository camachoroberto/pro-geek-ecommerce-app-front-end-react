import React, { useState } from "react";
import Axios from 'axios';
import { Collapse, Button } from 'react-bootstrap';


const Order = ({ user, date, order }) => {
  const [status, setStatus] = useState(order.status);
  const [open, setOpen] = useState(false);
  const [openEva, setOpenEva] = useState(false);
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState('');


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

  const handleOpenEva = () => {
    setOpenEva(!openEva);
  }

  let submitEvaluation = (e, product) => {
    e.preventDefault();
    console.log(comment,rating)
    Axios({
      method: 'post',
      url: `http://localhost:8080/evaluations`,
      data: {
        rating,
        comment,
        orderId: order._id,
        userId: order.user.id,
        productId: product._id
      }
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }


  const detailProducts = () => {
    return order.products.map((product) => {
      return (
        <tr>
          <td>{product.name}</td>
          <td>{product.quantity}</td>
          <td>{product.price}</td>
          <td>{product.price * product.quantity}</td>
        </tr>
      )

    });
  }

  const rateProducts = () => {
    return order.products.map((product) => {
      return (
        <div>
          <img src={product.image[0]} alt="product img" width="80px" />
          <p>{product.name}</p>
          <form onSubmit={(e) => submitEvaluation(e, product)}>
            <label htmlFor="rating">Rating</label>
            <input id="rating" type="number" name="rating" onChange={e => setRating(e.currentTarget.value)} />
            <label htmlFor="comment">Short Comment</label>
            <textarea id="comment" rows="2" cols="20" onChange={e => setComment(e.currentTarget.value)} />
            <input className="ButtonPG" type="submit" value="Evaluate"/>
          </form>
        </div>
      )
    })
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
              {detailUser()}
              <table>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
                {detailProducts()}
              </table>
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

  return (
    <tr>
      <td>{order._id}
        <Collapse in={open}>
          <div id="example-collapse-text">
            <div className="card card-body margin10">
              <table>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
                {detailProducts()}
              </table>
            </div>
          </div>
        </Collapse>

        <Collapse in={openEva}>
          <div id="example-collapse-text">
            {rateProducts()}
          </div>
        </Collapse>

      </td>
      <td>{date}</td>
      <td>
        <p className="form-control form-control-lg">{status}</p>
      </td>
      <td>
        {status === 'Delivered' ? <Button onClick={() => handleOpenEva()}
          aria-controls="example-collapse-text"
          aria-expanded={openEva}
          className="btn btn-primary ButtonPG">Evaluate Products</Button> : ''}
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