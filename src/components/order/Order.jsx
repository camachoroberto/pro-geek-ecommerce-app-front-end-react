import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Collapse, Button } from 'react-bootstrap';


const Order = ({ user, date, updateMessage, getOrder }) => {
  const [status, setStatus] = useState(getOrder.status);
  const [open, setOpen] = useState(false);
  const [openEva, setOpenEva] = useState(false);
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState('');
  const [order, setOrder] = useState(getOrder);

  const swap = (idx, array) => {
    const temp = array[0];
    array[0] = array[idx];
    array[idx] = temp;
    return array;
  };

  let statusOptions = ['Pending payment', 'In production', 'To be fowarded', 'Posted', 'Delivered'];
  statusOptions = swap(statusOptions.indexOf(order.status), statusOptions);
  const listOptions = () => statusOptions.map(status => <option value={status}>{status}</option>);


  const handleOpen = () => {
    setOpen(!open);
  };

  const handleOpenEva = () => {
    setOpenEva(!openEva);
  };

  const submitEvaluation = (e, product) => {
    e.preventDefault();
    Axios({
      method: 'post',
      url: `${process.env.API_URL}/evaluations`,
      data: {
        rating,
        comment,
        orderId: order._id,
        userId: order.user.id,
        productId: product._id
      }
    })
      .then((res) => {
        Axios({
          method: 'patch',
          url: `${process.env.API_URL}/products/${product._id}`,
          data: { rating: {
            rating,
            comment,
            id: res.data_id,
            user: order.user.name,
            userId: order.user.id
          } }
        })
          .then(() => {
            order.products.forEach((item) => {
              if (item._id === product._id) {
                Object.assign(item, { commented: true });
              }
            });
            Axios({
              method: 'patch',
              url: `${process.env.API_URL}/orders/${order._id}`,
              data: {
                products: order.products,
                status: order.status
              }
            });
          })
          .then(() => {
            setOrder(order);
          })
          .then(() => {
            handleOpenEva();
          });
      })
      .catch((err) => { throw err; });
  };


  const detailProducts = () => order.products.map(product => (
    <tr>
      <td>{product.name}</td>
      <td>{product.quantity}</td>
      <td>{product.price}</td>
      <td>{product.price * product.quantity}</td>
    </tr>
  ));

  const rateProducts = () => order.products.map((product, idx) => {
    if (!product.commented) {
      return (
        <div>
          <div className="container-fluid">
            <div className="row mt-2">
              <div className="col-md-12">
                Received Product #{idx + 1}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-3">
                <img src={product.image[0]} alt="product img" width="60px" />
              </div>
              <div className="col-md-3">
                <p>{product.name}</p>
              </div>
            </div>
          </div>
          <form onSubmit={e => submitEvaluation(e, product)}>
            <div className="container-fluid">
              <div className="row mt-2">
                <div className="col-md-4">
                  <label htmlFor="rating">Rating</label>
                  <select className="custom-select" id="rating" name="rating" onChange={e => setRating(e.currentTarget.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="comment">Short Comment</label><br/>
                  <textarea id="comment" rows="2" cols="15" onChange={e => setComment(e.currentTarget.value)} />
                </div>
                <div className="col-md-4">
                  <input className="ButtonPG mt-4" type="submit" value="Evaluate" />
                </div>
              </div>
            </div>
          </form>
        </div>
      );
    }
    return (
      <div>
        <div className="container-fluid">
          <div className="row mt-2">
            <div className="col-md-12">
              Received Product #{idx + 1}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-3">
              <img src={product.image[0]} alt="product img" width="60px" />
            </div>
            <div className="col-md-3">
              <p>{product.name}</p>
            </div>
          </div>
        </div>
        <div className="mt-2 ml-3 evaluated">
          <strong>Product evaluated</strong>
        </div>
      </div>
    );
  });


  const detailUser = () => (
    <p>
      User Name:
      {order.user.name}
    </p>
  );

  const handleSubmit = () => {
    Axios.patch(`${process.env.API_URL}/orders/${order._id}`, { status, products: order.products })
      .then(() => {
        updateMessage('Status updated!');
      })
      .catch((err) => {
        throw err;
      });
  };

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
          <button type="button" className="btn btn-primary ButtonPG" onClick={handleSubmit}>Update status</button>
        </td>
        <td>
          <Button onClick={() => handleOpen()} aria-controls="example-collapse-text" aria-expanded={open} className="btn btn-primary ButtonPG">
          details
          </Button>
        </td>
      </tr>
    );
  }
  return (
    <tr>
      <td>
        {order._id}
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
        {status === 'Delivered' ? (
          <Button
            onClick={() => handleOpenEva()}
            aria-controls="example-collapse-text"
            aria-expanded={openEva}
            className="btn btn-primary ButtonPG"
          >
          Evaluate Products
          </Button>
        ) : ''}
      </td>
      <td>
        <Button onClick={() => handleOpen()} aria-controls="example-collapse-text" aria-expanded={open} className="btn btn-primary ButtonPG">
          Details
        </Button>
      </td>
    </tr>
  );
};

export default Order;
