import React from 'react';
import { Link } from 'react-router-dom';

const AdminProducts = ({ products, selectProduct, deleteProduct }) => {
  const productTable = products.map((element, idx) => (
    <tr key={idx}>
      <td><img src={element.image[0]} alt="product img" width="100" /></td>
      <td>{element.name}</td>
      <td>{element.price}</td>
      <td>
        <Link to={`/profile/products/${element._id}`} onClick={() => selectProduct(element)}><button type="button" className="btn ButtonPG">Edit Product</button></Link>
      </td>
      <td>
        <button type="button" className="btn btn-danger" onClick={() => deleteProduct(element)}>Delete Product</button>
      </td>
    </tr>
  ));
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col md-5 table-responsive">
          <Link to="/profile/products/new" className="btn ButtonKeep btn-lg btn-block mt-2">Create New Product</Link>
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Description</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {productTable}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
