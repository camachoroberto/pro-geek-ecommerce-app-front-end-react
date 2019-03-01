import React, { Component } from 'react';
import axios from 'axios';
import './global-css/main.scss';
import { Switch, Route } from 'react-router-dom';
import CategoryList from './components/categorylist/CategoryList.jsx';
import NavBar from './components/navbar/Navbar.jsx';
import Footer from './components/footer/Footer.jsx';
import Counter from './components/counter/Counter.jsx';
import AuthForm from './components/auth/AuthForm.jsx';
import AuthService from './components/auth/service/auth-service.jsx';
import ProtectedRoute from './components/auth/service/protected-routes.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      loggedInUser: null
    };
    this.service = new AuthService();
    this.getTheUser = this.getTheUser.bind(this);
  }

  componentDidMount() {
    axios.get('https://pro-geek-ecommerce-api.herokuapp.com/categories')
      .then((response) => {
        const categories = response.data.response;
        this.setState({ categories })
      })
      .catch((err) => {
        throw new Error(err);
      });
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
            console.log('aaaa', response);
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
    const { categories } = this.state;
    return (
      <div className="body">
        <NavBar />
        <CategoryList categories={categories} />
        <Counter />
        <Switch>
          <ProtectedRoute user={this.state.loggedInUser} path="/projects" component={AuthForm} />
          <Route exact path="/signup" render={() => <AuthForm name username password birthDate type="signup" getUser={this.getTheUser} />} />
          <Route exact path="/login" render={() => <AuthForm username password type="login" getUser={this.getTheUser} />} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
