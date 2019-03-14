import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage = ({ user }) => (
  <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <ul className="list-group">
          <Link to="/profile/orders"><li className="list-group-item ButtonPG mb-2">Manage my orders</li></Link>
          <Link to="/profile/products"><li className="list-group-item ButtonPG mb-2">Manage my products</li></Link>
          <Link to="/profile/categories"><li className="list-group-item ButtonPG mb-2">Manage my categories</li></Link>
          <Link to={`/profile/${user._id}`}><li className="list-group-item ButtonPG mb-2">Manage my profile</li></Link>
        </ul>
      </div>
    </div>
  </div>
);

export default AdminPage;
