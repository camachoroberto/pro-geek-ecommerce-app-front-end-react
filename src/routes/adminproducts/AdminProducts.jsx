import React from 'react';
import { Link } from 'react-router-dom';

const AdminProducts = (props) => {
  const { products, selectProduct } = props;
  console.log(products);
  return products.map((element, idx) => (
    <div key={idx}>
      <Link to={`/admin/products/${element._id}`} onClick={() => selectProduct(element)}>
        <p>{element.name}</p>
        <p>{element.price}</p>
      </Link>
    </div>
  ));
};

export default AdminProducts;
