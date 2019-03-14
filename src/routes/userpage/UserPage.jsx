import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserPage extends Component {
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
            <ul className="list-group">
              <Link to="/profile/orders"><li className="list-group-item mb-2 ButtonPG">Manage my orders</li></Link>
              <Link to={`/profile/${user._id}`}><li className="list-group-item mb-2 ButtonPG">Manage my profile</li></Link>
            </ul>
          </div>
        </div>
        <div className="fillin" />
      </div>
    );
  }
}

export default UserPage;
