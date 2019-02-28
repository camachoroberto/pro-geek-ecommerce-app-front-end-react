import React, { Component } from 'react';
import '../css/main.scss';
import { Switch, Route } from 'react-router-dom';
import NavBar from './navbar/Navbar.jsx';
import AuthForm from './auth/Form.jsx';
import AuthService from './auth/auth-service.jsx';
import ProtectedRoute from './auth/protected-routes.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedInUser: null
    };
    this.service = new AuthService();
    this.getTheUser = this.getTheUser.bind(this);
  }

  getTheUser(userObj) {
    this.setState({
      loggedInUser: userObj
    }, () => console.log('bbbb', this.state));
  }

  fetchUser() {
    const { loggedInUser } = this.state;
    if (loggedInUser === null) {
      this.service.loggedin()
        .then((response) => {
          this.setState({
            loggedInUser: response
          }, () => {
            console.log('aaaa', response)
          });
        })
        .catch((err) => {
          this.setState({
            loggedInUser: false
          });
        });
    }
  }

  render() {
    {this.fetchUser()}
    return (
      <div className="body">
        <NavBar />
        <Switch>
          <ProtectedRoute user={this.state.loggedInUser} path='/projects' component={AuthForm} />
          <Route exact path="/signup" render={() => <AuthForm name username password birthDate type="signup" getUser={this.getTheUser} />} />
          <Route exact path="/login" render={() => <AuthForm username password type="login" getUser={this.getTheUser} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
