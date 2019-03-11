import React, { Component } from 'react';
import axios from 'axios';
import './global-css/main.scss';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loader from 'react-loaders';
import CategoryList from './components/categorylist/CategoryList.jsx';
import NavBar from './components/navbar/Navbar.jsx';
import Footer from './components/footer/Footer.jsx';
import ProductCard from './components/productcard/ProductCard.jsx';
import AuthForm from './components/auth/AuthForm.jsx';
import AuthService from './components/auth/service/auth-service.jsx';
import FormProduct from './routes/formproduct/FormProduct.jsx';
import ProtectedRoute from './components/auth/service/protected-routes.jsx';
import ProductRow from './components/productrow/ProductRow.jsx';
import Home from './routes/home/home.jsx';
import Products from './routes/products/Products.jsx';
import AdminPage from './routes/adminpage/AdminPage.jsx';
import AdminProducts from './routes/adminproducts/AdminProducts.jsx';
import ProductDetail from './routes/productdetail/ProductDetail.jsx';
import Cart from './routes/cart/Cart.jsx';
import AdminProductDetail from './routes/adminproductdetail/AdminProductDetail.jsx';
import ProfileUpdate from './routes/profileupdate/ProfileUpdate.jsx';
import Category from './routes/categories/Category.jsx';
import Orders from './routes/orders/Orders.jsx';
import UserPage from './routes/userpage/UserPage.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      products: [],
      orders: [],
      cart: {},
      productDetail: {},
      total: {},
      loggedInUser: {
        _id: '',
        name: '',
        username: '',
        password: '',
        birthDate: '',
        address: {
          street: '',
          complement: '',
          postalCode: ''
        },
        role: '',
        userAvaliations: [],
        userOrders: []
      },
      filterProduct: {},
      filterPrice: ['0', '100000000'],
      category: {},
      categoryState: false,
      productState: false,
      orderState: false,
      loggedInUserState: false,
      message: ''
    };
    this.service = new AuthService();
    this.getTheUser = this.getTheUser.bind(this);
    this.addCart = this.addCart.bind(this);
    this.deleteCart = this.deleteCart.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.fetchUser = this.fetchUser.bind(this);
    this.fetchUserAddress = this.fetchUserAddress.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
    this.selectProduct = this.selectProduct.bind(this);
    this.productRowTable = this.productRowTable.bind(this);
    this.addTotal = this.addTotal.bind(this);
    this.updateCategories = this.updateCategories.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
    this.cartReset = this.cartReset.bind(this);
    this.showMessage = this.showMessage.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
  }

  // products and categories arrays
  componentWillMount() {
    this.setState({ cart: (JSON.parse(localStorage.getItem('cart')) || {}) });
    this.setState({ total: (JSON.parse(localStorage.getItem('total')) || {}) });
  }

  componentDidMount() {
    this.fetchUser();
    axios.get('http://localhost:8080/categories')
      .then((response) => {
        const categories = response.data.response;
        this.setState({ categories });
      })
      .then(() => {
        this.setState({ categoryState: true });
      })
      .catch((err) => {
        throw err;
      });

    axios.get('http://localhost:8080/products')
      .then((response) => {
        const products = response.data.response;
        this.setState({ products });
      })
      .then(() => {
        this.setState({ productState: true });
      })
      .catch((err) => {
        throw err;
      });

    axios.get('http://localhost:8080/orders')
      .then((response) => {
        const orders = response.data.response;
        this.setState({ orders });
      })
      .then(() => {
        this.setState({ orderState: true });
      })
      .catch((err) => {
        throw err;
      });
  }

  // auth components and functions
  getTheUser(userObj) {
    this.setState({
      loggedInUser: userObj
    });
  }

  // message functions
  showMessage() {
    const { message } = this.state;
    if (message) {
      setTimeout(() => {
        this.setState({ message: false });
      }, 2000);
      return (
        <div className="alert alert-primary" role="alert">
          {message}
        </div>
      );
    }
  }

  updateMessage(message) {
    this.setState({ message });
  }

  // categories
  updateCategories(categories) {
    this.setState({ categories });
  }

  selectCategory(category) {
    this.setState({ category });
  }

  fetchUser() {
    const { loggedInUser } = this.state;
    console.log('oi', loggedInUser)
    if (loggedInUser.name === '') {
      this.service.loggedin()
        .then((response) => {
          this.setState({ loggedInUser: response });
        })
        .then(() => {
          this.setState({ loggedInUserState: true });
        })
        .catch(() => {
          this.setState({ loggedInUser: false, loggedInUserState: true });
        });
    }
  }

  fetchUserAddress() {
    const { loggedInUser } = this.state;
    if (loggedInUser.address.street === '' || loggedInUser.address.postalCode === '') {
      this.service.loggedin()
        .then((response) => {
          this.setState({ loggedInUser: response });
        })
        .then(() => {
          this.setState({ loggedInUserState: true });
        })
        .catch(() => {
          this.setState({ loggedInUser: false, loggedInUserState: true });
        });
    }
  }

  // Sidebar functions
  updateFilter(name, checked) {
    const { filterProduct } = this.state;
    if (checked) {
      this.setState({ filterProduct: Object.assign(filterProduct, { [name]: name }) });
    } else {
      this.setState({ category: Object.assign({}, delete filterProduct[name], filterProduct) });
    }
  }

  updatePrice(priceMin, priceMax) {
    this.setState({ filterPrice: [priceMin, priceMax] });
  }

  // cart functions and components
  addCart(obj) {
    const { cart } = this.state;
    this.setState({
      cart: Object.assign(cart, obj)
    });
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  addTotal(obj) {
    const { total } = this.state;
    this.setState({
      total: Object.assign(total, obj)
    });
    localStorage.setItem('total', JSON.stringify(total));
  }

  cartReset() {
    this.setState({
      cart: {},
      total: {}
    });
    localStorage.setItem('cart', JSON.stringify({}));
    localStorage.setItem('total', JSON.stringify({}));
  }

  deleteCart(property) {
    const { cart, total } = this.state;
    this.setState({
      cart: Object.assign({}, delete cart[property], cart),
      total: Object.assign({}, delete total[property], total)
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total', JSON.stringify(total));
  }

  deleteProduct(product) {
    const { products } = this.state;
    axios.delete(`http://localhost:8080/products/${product._id}`)
      .then(() => {
        const filteredProducts = products.filter(element => !element._id.includes(product._id));
        this.setState({ products: filteredProducts });
      });
  }

  productRowTable() {
    const { products, cart } = this.state;
    return products.map((product, idx) => {
      if (cart[product._id]) {
        return <ProductRow key={idx} product={product} counter={cart[product._id]} addTotal={this.addTotal} addCart={this.addCart} deleteCart={this.deleteCart} />;
      }
    });
  }

  cardList() {
    const { products, cart, filterProduct, filterPrice } = this.state;
    let productsFilter = [];
    let mergedArr = [];
    if (Object.keys(filterProduct).length === 0) {
      mergedArr = products;
    } else {
      for (const key in filterProduct) {
        productsFilter = products.filter(element => element.category.join(' ').includes(key)).concat(productsFilter);
      }
      productsFilter.forEach((item) => {
        if (!mergedArr.includes(item)) {
          mergedArr.push(item);
        }
      });
    }
    return mergedArr.map((product) => {
      if (product.price >= filterPrice[0] && product.price <= filterPrice[1]) {
        return <ProductCard key={product._id} product={product} addCart={this.addCart} counterCart={cart[product._id]} selectProduct={this.selectProduct} addTotal={this.addTotal} />;
      }
    });
  }

  selectProduct(obj) {
    this.setState({
      productDetail: obj
    });
  }

  logoutUser() {
    this.service.logout()
      .then(() => {
        this.setState({ loggedInUser: null });
        this.getTheUser(null);
      });
  }

  render() {
    this.fetchUser();
    const { categories, cart, productDetail, total, products, orders, loggedInUser, category, categoryState, productState, orderState, loggedInUserState } = this.state;
    if (categoryState && productState && orderState && loggedInUserState) {
      if (loggedInUser) {
        return (
          <div className="body">
            <div className="content-wrap">

              <NavBar user={loggedInUser} cartCounter={Object.keys(cart).length} getTheUser={this.getTheUser} />
              {this.showMessage()}
              <Switch>
                <Route exact path="/" render={() => <Home categories={categories} cardList={this.cardList().slice(0, 3)} />} />
                <Route exact path="/products" render={() => <Products cardList={this.cardList()} updateFilter={this.updateFilter} categories={categories} updatePrice={this.updatePrice} />} />
                <Route exact path="/signup" render={() => <AuthForm name username Password birthDate type="Signup" getUser={this.getTheUser} />} />
                <Route exact path="/cart" render={() => <Cart cartRow={this.productRowTable} cartReset={this.cartReset} updateMessage={this.updateMessage} products={products} loggedInUser={loggedInUser} cart={cart} total={total} />} />
                <Route exact path="/login" render={() => <AuthForm username Password type="Login" getUser={this.getTheUser} />} />
                <Route path="/products/:id" render={() => <ProductDetail addCart={this.addCart} product={productDetail} counterCart={cart[productDetail._id]} />} />

                {/* Admin routes */}
                <Route
                  exact
                  path="/profile/products"
                  render={() => (loggedInUser.role === 'User'
                    ? <AdminProducts products={products} selectProduct={this.selectProduct} />
                    : <Redirect to="/profile" />)
                }
                />
                <Route exact path="/profile/categories" render={() => <Category categories={categories} updateCategories={this.updateCategories} category={category} selectCategory={this.selectCategory} />} />
                <Route
                  path="/profile/products/:id"
                  render={() => (loggedInUser.role === 'Admin'
                    ? <AdminProductDetail product={productDetail} categories={categories} />
                    : <Redirect to="/" />)}
                />
                <Route
                  exact
                  path="/profile"
                  render={() => (loggedInUser.role === 'User'
                    ? <UserPage user={loggedInUser} />
                    : loggedInUser.role === 'Admin'
                      ? <AdminPage products={products} user={loggedInUser} categories={categories} orders={orders} />
                      : <Redirect to="/profile" />)}
                />

                {/* User routes */}
                <Route exact path="/profile/:id" render={() => <ProfileUpdate fetchUserAddress={this.fetchUserAddress} user={loggedInUser} />} />
                <Route exact path="/profile/orders" render={() => <Orders user={loggedInUser} orders={orders} />} />
              </Switch>
              <Footer />
            </div>
          </div>
        );
      }
      return (
        <div className="body">
            <div className="content-wrap">
              <NavBar user={loggedInUser} cartCounter={Object.keys(cart).length} getTheUser={this.getTheUser} />
              {this.showMessage()}
              <Switch>
                <Route exact path="/" render={() => <Home categories={categories} cardList={this.cardList().slice(0, 3)} />} />
                <Route exact path="/products" render={() => <Products cardList={this.cardList()} updateFilter={this.updateFilter} categories={categories} updatePrice={this.updatePrice} />} />
                <Route exact path="/signup" render={() => <AuthForm name username Password birthDate type="Signup" getUser={this.getTheUser} />} />
                <Route exact path="/cart" render={() => <Cart cartRow={this.productRowTable} cartReset={this.cartReset} updateMessage={this.updateMessage} products={products} loggedInUser={loggedInUser} cart={cart} total={total} />} />
                <Route exact path="/login" render={() => <AuthForm username Password type="Login" getUser={this.getTheUser} />} />
                <Route path="/products/:id" render={() => <ProductDetail addCart={this.addCart} product={productDetail} counterCart={cart[productDetail._id]} />} />
              </Switch>
              <Footer />
            </div>
          </div>
      );
    }
    return (
      <div>
        <NavBar user={loggedInUser} cartCounter={Object.keys(cart).length} getTheUser={this.getTheUser} />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col align-self-center">
              <div className="d-flex align-items-center">
                <div className="spinner-border ml-auto" role="status" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
