import React, { useState } from "react";
import Edit from './Edit.jsx';
import Axios from 'axios';

const Category = ({ categories, updateCategories, selectCategory, category }) => {

  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const [idx, setIdx] = useState(0);
  const [action, setAction] = useState('');
  const [message, setMessage] = useState(false);

  const handleClose = () => {
    setShow(false);
  }

  const updateAdd = () => {
    return new Promise((resolve) => {
      resolve(setAdd(true));
    })
  }

  const showMessage = () => {
    if (message) {
      setTimeout(() => {
        setMessage(false);
      }, 2000)
      return (
        <div class="alert alert-primary" role="alert">
          {message}
        </div>
      );
    }
  }

  const handleShow = (add) => {
    if (add) {
      updateAdd()
        .then(() => {
          setAction('Add');
          setShow(true);
        })
        .catch((err) => { throw err; });
    } else {
      setShow(true);
      setAction('Edit');
    }
  }

  const selectCategoryIndex = (idx) => {
    setIdx(idx);
  }

  const deleteCategory = (idx, category) => {
    Axios({
      method: 'delete',
      url: `${process.env.API_URL}/categories/${category._id}`
    })
      .then(() => {
        categories.splice(idx, 1);
        updateCategories(categories);
      })
      .catch((err) => { throw err; });
  }

  const categoriesList = () => {
    return categories.map((category, idx) => (
      <tr key={category._id}>
        <td>{category.name}</td>
        <td>
          <button onClick={() => { handleShow(); selectCategory(category); selectCategoryIndex(idx) }} className="btn ButtonCardP">Edit</button>
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => { selectCategoryIndex(idx); deleteCategory(idx, category) }} >delete</button>
        </td>
      </tr>
    ));
  }

    return (
      <div>
        <Edit handleClose={handleClose} updateCategories={updateCategories} setSuccess={setMessage} add={add} action={action} categories={categories} show={show} categoryIndex={idx} category={category} />
        <div className="cart table-responsive">
        {showMessage()}
          <button className="btn ButtonKeep btn-lg btn-block mt-2" onClick={() => {handleShow(true)}}>add</button>
          <table className="table">
            <thead>
              <tr>
                <th>Category</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>{categoriesList()}</tbody>
          </table>
        </div>
      </div>
    );
}

export default Category;
