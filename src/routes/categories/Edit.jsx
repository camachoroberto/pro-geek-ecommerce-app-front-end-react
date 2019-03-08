import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, InputForm } from 'react-bootstrap';
import Axios from 'axios';

const Edit = ({show, handleClose, updateCategories, category}) => {
  const [name, setName] = useState('');
 

  const handleText = (e) => {
    const { value } = e.currentTarget
    setName( value );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name)
    Axios.put(`http://localhost:8080/categories/${category._id}`)
    .then(response => console.log(response.data))
    .catch(err => console.log(err));
  }

  useEffect(() => {setName(category.name)}, [category]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form onSubmit={e => handleSubmit(e)}>
        <div class="form-group">
          <label for="text">Email address</label>
          <input type="text" className="form-control" id="text" name="name" value={name} placeholder="Enter name" onChange={handleText} />
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      </Modal.Body>
    </Modal>
  );
}

export default Edit;