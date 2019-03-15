import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Axios from 'axios';

const Edit = ({ show, handleClose, updateCategories, categories, setSuccess, add, action, label, categoryIndex, category }) => {
  const [name, setName] = useState(false);
  const [message, setMessage] = useState('');

  const handleText = (e) => {
    const { value } = e.currentTarget;
    setName(value);
  };

  const handleSubmit = (e, categoryName) => {
    e.preventDefault();
    if (categoryName === '' || !categoryName) {
      setMessage('Category name must not be empty');
    } else {
      if (add) {
        Axios({
          method: 'post',
          url: `${process.env.API_URL}/categories`,
          data: { name: categoryName }
        })
          .then((response) => {
            categories.push(response.data.category);
            updateCategories(categories);
            setSuccess('Category created');
          });
      } else {
        Axios({
          method: 'put',
          url: `${process.env.API_URL}/categories/${category._id}`,
          data: { name: categoryName }
        })
          .then(() => {
            categories[categoryIndex] = Object.assign({}, categories[categoryIndex], { name: categoryName });
            updateCategories(categories);
          })
          .catch((err) => { throw err; });
      }
      setMessage('');
      setName('');
      handleClose();
    }
  };

  useEffect(() => { setName(category.name); }, [category]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{action} Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={e => handleSubmit(e, name)}>
          <div className="form-group">
            <label htmlFor="text">Category name</label>
            <input type="text" className="form-control" id="text" name="name" value={name} aria-describedby="category-name" placeholder="Enter name" onChange={handleText} />
            <small id="category-name" className="form-text text-danger">{message}</small>
          </div>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Edit;
