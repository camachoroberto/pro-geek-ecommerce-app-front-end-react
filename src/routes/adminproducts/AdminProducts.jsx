import React from 'react';
import { Link } from 'react-router-dom';

const AdminProducts = ({ products, selectProduct, deleteProduct }) => {
  const productTable = products.map((element, idx) => (
    <tr key={idx}>
      <td><img src={element.image[0]} alt="product img" width="100" /></td>
      <td>{element.name}</td>
      <td>{element.price}</td>
      <td>
        <Link to={`/admin/products/${element._id}`} onClick={() => selectProduct(element)}><button type="button" className="btn ButtonCardP">Edit Product</button></Link>
      </td>
      <td>
        <Link to="/admin/products"><button type="button" className="btn btn-danger" onClick={() => deleteProduct(element)}>Delete Product</button></Link>
      </td>
    </tr>
  ));
  return (
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
  );
};

export default AdminProducts;
