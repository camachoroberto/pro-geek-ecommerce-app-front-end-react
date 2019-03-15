import React, { Component } from 'react';
import axios from 'axios';
import './global-css/main.scss';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './components/navbar/Navbar.jsx';
import Footer from './components/footer/Footer.jsx';
import ProductCard from './components/productcard/ProductCard.jsx';
import AuthForm from './components/auth/AuthForm.jsx';
import AuthService from './components/auth/service/auth-service.jsx';
import FormProduct from './routes/formproduct/FormProduct.jsx';
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
import AboutUs from './routes/aboutus/AboutUs.jsx';
import CartCheckout from './routes/cartcheckout/CartCheckout.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      products: [],
      cart: {},
      productDetail: {},
      total: {},
      loggedInUser: {
        _id: '',
        name: '',
        username: '',
        password: '',
        address: {
          street: '',
          complement: '',
          postalCode: ''
        },
        role: '',
        userAvaliations: [],
        userOrders: []
      },
      newOrder: '',
      filterProduct: {},
      filterPrice: ['0', '100000000'],
      category: {},
      categoryState: false,
      productState: false,
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
    this.newOrderCheckout = this.newOrderCheckout.bind(this);
    this.updateCategories = this.updateCategories.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
    this.cartReset = this.cartReset.bind(this);
    this.showMessage = this.showMessage.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.updateProducts = this.updateProducts.bind(this);
  }

  // products and categories arrays
  componentWillMount() {
    this.setState({ cart: (JSON.parse(localStorage.getItem('cart')) || {}) });
    this.setState({ total: (JSON.parse(localStorage.getItem('total')) || {}) });
    this.setState({ productDetail: (JSON.parse(localStorage.getItem('productDetail')) || {}) });
    this.setState({ newOrder: (JSON.parse(localStorage.getItem('newOrder')) || '') });
  }

  componentDidMount() {
    this.fetchUser();
    axios.get(`${process.env.API_URL}/categories`)
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

    axios.get(`${process.env.API_URL}/products`)
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
        <div className="alert alert-primary top-fixed" role="alert">
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
    const item = Object.values(obj);
    if (item[0] !== 0) {
      this.setState({
        cart: Object.assign(cart, obj)
      });
      localStorage.setItem('cart', JSON.stringify(cart));
    }
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
    axios.delete(`${process.env.API_URL}/products/${product._id}`)
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

  updateFilterText(text) {
    this.setState({filterText: text});
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

  newOrderCheckout(order) {
    this.setState({ newOrder: order });
    localStorage.setItem('newOrder', JSON.stringify(order));
  }

  selectProduct(obj) {
    new Promise((resolve) => {
      resolve(this.setState({
        productDetail: obj
      }));
    })
      .then(() => {
        const { productDetail } = this.state;
        localStorage.setItem('productDetail', JSON.stringify(productDetail));
      });
  }

  logoutUser() {
    this.service.logout()
      .then(() => {
        this.setState({ loggedInUser: null });
        this.getTheUser(null);
      });
  }

  updateProducts(obj) {
    if (Array.isArray(obj)) {
      this.setState( { products: obj });
      return
    }
    const { products } = this.state;
    products.push(obj)
    this.setState({ products });
  }

  render() {
    this.fetchUser();
    const { categories, cart, productDetail, total, products, orders, loggedInUser, category, categoryState, productState, loggedInUserState, newOrder } = this.state;
    if (categoryState && productState && loggedInUserState) {
      if (loggedInUser) {
        return (
          <div className="body">
            <div className="content-wrap">
              <NavBar user={loggedInUser} cartCounter={Object.keys(cart).length} getTheUser={this.getTheUser} updateFilter={this.updateFilter} filterText={this.filterText} />
              {this.showMessage()}
              <Switch>
                <Route exact path="/" render={() => <Home categories={categories} cardList={this.cardList().slice(0, 3)} />} />
                <Route exact path="/products" render={() => <Products cardList={this.cardList()} updateFilter={this.updateFilter} categories={categories} updatePrice={this.updatePrice} />} />
                <Route exact path="/signup" render={() => <AuthForm name username Password type="Signup" getUser={this.getTheUser} />} />
                <Route exact path="/cart" render={() => <Cart cartRow={this.productRowTable} cartReset={this.cartReset} updateMessage={this.updateMessage} newOrderCheckout={this.newOrderCheckout} products={products} loggedInUser={loggedInUser} cart={cart} total={total} />} />
                <Route exact path="/cart/checkout" render={() => <CartCheckout newOrder={newOrder} />} />
                <Route exact path="/login" render={() => <AuthForm username Password type="Login" getUser={this.getTheUser} />} />
                <Route exact path="/products/:id" render={() => <ProductDetail addCart={this.addCart}  selectProduct={this.selectProduct} user={loggedInUser} product={productDetail} counterCart={cart[productDetail._id]} />} />

                {/* Admin routes */}
                <Route
                  exact
                  path="/profile/products"
                  render={() => (loggedInUser.role === 'Admin'
                    ? <AdminProducts products={products} selectProduct={this.selectProduct} deleteProduct={this.deleteProduct} />
                    : <Redirect to="/login" />)
                }
                />
                <Route
                  exact
                  path="/profile/products/new"
                  render={() => (loggedInUser.role === 'Admin'
                    ? <FormProduct categories={categories} updateMessage={this.updateMessage} updateProducts={this.updateProducts} />
                    : <Redirect to="/login" />)
                }
                />
                <Route
                  exact
                  path="/profile/categories"
                  render={() => <Category categories={categories} updateCategories={this.updateCategories} category={category} selectCategory={this.selectCategory} />}
                />
                <Route
                  path="/profile/products/:id"
                  render={() => (loggedInUser.role === 'Admin'
                    ? <AdminProductDetail selectProduct={this.selectProduct} updateMessage={this.updateMessage}products={products} product={productDetail} categories={categories} updateProducts={this.updateProducts} />
                    : <Redirect to="/" />)}
                />
                <Route
                  exact
                  path="/profile"
                  render={() => (loggedInUser.role === 'User'
                    ? <UserPage user={loggedInUser} />
                    : <AdminPage user={loggedInUser} />)}
                />

                {/* User routes */}
                <Route exact path="/profile/orders" render={() => <Orders updateMessage={this.updateMessage} user={loggedInUser} orders={orders} />} />
                <Route exact path="/profile/:id" render={() => <ProfileUpdate updateMessage={this.updateMessage} fetchUserAddress={this.fetchUserAddress} user={loggedInUser} />} />
                <Route exact path="/aboutus" render={() => <AboutUs />} />
              </Switch>
            </div>
            <Footer />
          </div>
        );
      }
      return (
        <div className="body">
          <div className="content-wrap">
            <NavBar user={loggedInUser} cartCounter={Object.keys(cart).length} getTheUser={this.getTheUser} filterText={this.filterText} />
            {this.showMessage()}
            <Switch>
              <Route exact path="/" render={() => <Home categories={categories} cardList={this.cardList().slice(0, 3)} />} />
              <Route exact path="/products" render={() => <Products cardList={this.cardList()} updateFilter={this.updateFilter} categories={categories} updatePrice={this.updatePrice} />} />
              <Route exact path="/signup" render={() => <AuthForm Name username Password type="Signup" updateMessage={this.updateMessage} getUser={this.getTheUser} />} />
              <Route exact path="/cart" render={() => <Cart cartRow={this.productRowTable} cartReset={this.cartReset} updateMessage={this.updateMessage} products={products} loggedInUser={loggedInUser} cart={cart} total={total} />} />
              <Route exact path="/login" render={() => <AuthForm username Password updateMessage={this.updateMessage} type="Login" getUser={this.getTheUser} />} />
              <Route path="/products/:id" render={() => <ProductDetail addCart={this.addCart} selectProduct={this.selectProduct} user={loggedInUser} product={productDetail} counterCart={cart[productDetail._id]} />} />
              <Route exact path="/aboutus" render={() => <AboutUs />} />
              <Route path="/:params" render={() => { this.updateMessage('Pelase login first!'); return <Redirect to="/login" />; }} />
            </Switch>
          </div>
          <Footer />
        </div>
      );
    }
    return (
      <div>
        <NavBar user={loggedInUser} cartCounter={Object.keys(cart).length} getTheUser={this.getTheUser} />
        <div className="container load">
          <div className="containerCol">
            <div className="marginTop">              
                <div className="spinner-border ml-auto" role="status" aria-hidden="true" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
