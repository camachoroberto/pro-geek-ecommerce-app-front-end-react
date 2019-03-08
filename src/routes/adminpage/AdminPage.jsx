import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    const { user } = this.props;
    this.setState({ user });
  }

  render() {
    const { user } = this.props;
    return (
      <div className="container mt-5">
       <div className="row justify-content-center">
         <div className="col-md-6">
            <ul class="list-group">
            <Link to="/admin/orders"><li class="list-group-item mb-2">Manage my orders</li></Link>
            <Link to="/admin/products"><li class="list-group-item mb-2">Manage my products</li></Link>
            <Link to="/admin/categories"><li class="list-group-item mb-2">Manage my categories</li></Link>
            <Link to={`/profile/${user._id}`}><li class="list-group-item mb-2">Manage my profile</li></Link>
            </ul>
         </div>
       </div>
      </div>
    );
  }
}

export default AdminPage;
