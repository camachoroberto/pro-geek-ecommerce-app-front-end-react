import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import AdminProducts from '../adminproducts/AdminProducts.jsx';

const AdminPage = (props) => {
  const { orders, categories, products } = props;
  return (
    <div>
      <Link to="/admin/orders">Manage my orders</Link>
      <br />
      <Link to="/admin/products">Manage my products</Link>
      <br />
      <Link to="/admin/categories">Manage my categories</Link>
      <br />
      <Link to="/admin/profile">Manage my profile</Link>
      <Switch>
        {/* <Route exact path="/admin/orders" /> */}
        
        {/* <Route exact path="/admin/categories" /> */}
        {/* <Route exact path="/admin/profile" /> */}
      </Switch>
    </div>
  );
}

export default AdminPage;
