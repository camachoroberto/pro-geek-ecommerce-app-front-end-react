import React, { useState } from "react";
import { Link } from "react-router-dom";
import Edit from './Edit.jsx';

const Category = ({ categories, updateCategories, selectCategory, category }) => {

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  }

  const handleShow = () => {
    setShow(true);
  }

  const categoriesList = () => {
    return categories.map((category) => (
      <tr>
        <td>{category.name}</td>
        <td>
          <button onClick={() => {handleShow(); selectCategory(category) }} className="btn ButtonCardP">Edit</button>
        </td>
        <td>
          <button className="btn btn-danger">delete</button>
        </td>
      </tr>
    ));
  }

    return (
      <div>
        <Edit handleClose={handleClose} updateCategories={updateCategories} show={show} category={category} />
        <div className="cart table-responsive">
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
