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
    console.log('porraaaaaaa', user)
    const { user } = this.props;
    this.setState({ user }, () => console.log(user));
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <Link to="/admin/orders">Manage my orders</Link>
        <br />
        <Link to="/admin/products">Manage my products</Link>
        <br />
        <Link to="/admin/categories">Manage my categories</Link>
        <br />
        <Link to={`/profile/${user._id}`}>Manage my profile</Link>
      </div>
    );
  }
}

export default AdminPage;
