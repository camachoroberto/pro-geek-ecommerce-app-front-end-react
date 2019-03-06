import React, { Component } from 'react';
import axios from 'axios';
import './global-css/main.scss';
import { Switch, Route } from 'react-router-dom';
import CategoryList from './components/categorylist/CategoryList.jsx';
import NavBar from './components/navbar/Navbar.jsx';
import Footer from './components/footer/Footer.jsx';
import ProductCard from './components/productcard/ProductCard.jsx';
import AuthForm from './components/auth/AuthForm.jsx';
import AuthService from './components/auth/service/auth-service.jsx';
import FormProduct from './routes/formproduct/FormProduct.jsx';
import ProtectedRoute from './components/auth/service/protected-routes.jsx';
import ProductRow from './components/productrow/ProductRow.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';
import Home from './routes/home/home.jsx'

class App extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      products: [],
      cart: {},
      loggedInUser: null
    };
    this.service = new AuthService();
    this.getTheUser = this.getTheUser.bind(this);
    this.addCart = this.addCart.bind(this);
    this.deleteCart = this.deleteCart.bind(this);
    this.fetchUser = this.fetchUser.bind(this);
  }

  // products and categories arrays

  componentWillMount() {
    this.setState({ cart: (JSON.parse(localStorage.getItem('cart')) || {}) });
  }

  componentDidMount() {
    axios.get('http://localhost:8080/categories')
      .then((response) => {
        const categories = response.data.response;
        this.setState({ categories });
      })
      .catch((err) => {
        throw new Error(err);
      });

    axios.get('http://localhost:8080/products')
      .then((response) => {
        const products = response.data.response;
        this.setState({ products });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  // auth components and functions
  getTheUser(userObj) {
    this.setState({
      loggedInUser: userObj
    });
  }

  fetchUser() {
    const { loggedInUser } = this.state;
    if (loggedInUser === null) {
      this.service.loggedin()
        .then((response) => {
          this.setState({ loggedInUser: response });
        })
        .catch(() => {
          this.setState({ loggedInUser: false });
        });
    }
  }

  // cart functions and components
  addCart(obj) {
    const { cart } = this.state;
    this.setState({
      cart: Object.assign(cart, obj)
    });
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  deleteCart(property) {
    const { cart } = this.state;
    this.setState({
      cart: Object.assign({}, delete cart[property], cart)
    });
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  productRowTable() {
    const { products, cart } = this.state;
    return products.map((product) => {
      if (cart[product._id]) {
        return <ProductRow product={product} counter={cart[product._id]} addCart={this.addCart} deleteCart={this.deleteCart} />;
      }
    });
  }

  cardList() {
    const { products, cart } = this.state;
    return products.map(product => <ProductCard product={product} addCart={this.addCart} counterCart={cart[product._id]} />);
  }

  logoutUser() {
    this.service.logout()
      .then(() => {
        this.setState({ loggedInUser: null });
        this.getTheUser(null);
      });
  }

  render() {
    { this.fetchUser(); }
    const { categories } = this.state;
    this.fetchUser();
    if (this.state.loggedInUser) {
      return (
        <div>
          <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} customBurgerIcon={ <img src="./public/images/sideBar.svg" /> } />
          <NavBar userInSession={this.state.loggedInUser} />
          <CategoryList categories={categories} />


          <Footer />
        </div>
      );
    }
    return (
      <div className="body">
         <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} customBurgerIcon={ <img src="./public/images/sideBar.svg" /> } />
        <NavBar userInSession={this.state.loggedInUser} />
        <CategoryList categories={categories} />
        {/* {this.cardList()} */}
        {this.productRowTable()}
        <Switch>
          <Route exact path="/" render={() =><Home cardList={this.cardList().slice(0,3)}/>} />
          <Route exact path="/signup" render={() => <AuthForm name username password birthDate type="signup" getUser={this.getTheUser} />} />
          <Route exact path="/login" render={() => <AuthForm username password type="login" getUser={this.getTheUser} />} />
          <FormProduct categories={categories} />
        </Switch>
        <Footer />
      </div>
    );

    // <div className="body">
    //   <NavBar />
    //   <CategoryList categories={categories} />
    //   <Counter />
    //   <Switch>
    //     <ProtectedRoute user={this.state.loggedInUser} path="/projects" component={AuthForm} />
    //     <Route exact path="/signup" render={() => <AuthForm name username password birthDate type="signup" getUser={this.getTheUser} />} />
    //     <Route exact path="/login" render={() => <AuthForm username password type="login" getUser={this.getTheUser} />} />
    //   </Switch>
    //   <Footer />
    // </div>
  }
}

export default App;
