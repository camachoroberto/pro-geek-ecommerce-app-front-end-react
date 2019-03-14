import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Counter from "../../components/counter/Counter.jsx";
import Axios from "axios";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      photoIndex: 0,
      isOpen: false
    };
    this.plus1 = this.plus1.bind(this);
    this.minus1 = this.minus1.bind(this);
    this.listRating = this.listRating.bind(this);
    this.rating = this.rating.bind(this);
  }

  plus1() {
    const { counter } = this.state;
    this.setState({ counter: counter + 1 });
  }

  minus1() {
    const { counter } = this.state;
    if (counter > 0) {
      this.setState({ counter: counter - 1 });
    }
  }

  listRating() {
    const { product, user } = this.props;
    return product.rating.map(item => {
      if (item.userId === user._id || user.role === "Admin") {
        return (
          <div className="mt-3 card">
            <div className="card-body">
              <h3 className="card-title">{item.user} </h3>
              <h4 className="card-subtitle mb-2 text-muted">rating: {item.rating}</h4>
              <p class="card-text pt-2 pb-2" >{item.comment}</p>
              <button
                className="btn btn-danger"
                onClick={() => {
                  this.deleteComment(item);
                }}
              >
                delete
              </button>
            </div>
          </div>
        );
      }
      return (
        <div className=" mt-3 padding card">
          <h3 className="card-title">{item.user}</h3>
          <h4 className="card-subtitle mb-2 text-muted">rating: {item.rating}</h4>
          <p class="card-text pt-2" >{item.comment}</p>
        </div>
      );
    });
  }

  rating() {
    const { product } = this.props;

    if (product.rating.length > 0) {
      return (
        product.rating.reduce((acc, curr) => {
          return acc + curr.rating;
        }, 0) / product.rating.length
      );
    }
    return "Not Available";
  }

  deleteComment(item) {
    const { product, selectProduct } = this.props;
    product.rating.splice(product.rating.indexOf(item), 1);
    Axios({
      method: "put",
      url: `http://localhost:8080/products/comment/${product._id}`,
      data: {
        rating: product.rating
      }
    }).then(res => {
      selectProduct(product)
    });
  }
  render() {
    const { addCart, product, counterCart, addTotal } = this.props;
    const { photoIndex, isOpen, counter } = this.state;
    const id = product._id;
    const total = counter + (counterCart || 0);
    const subtotal = counter * product.price;
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
                {product.image[0] ? (
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    width="100%"
                    onClick={() => {
                      this.setState({ isOpen: true });
                      this.setState({ photoIndex: 0 });
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="row mt-5">
              <div className="col">
                {product.image[1] ? (
                  <img
                    className="no-margin"
                    src={product.image[1]}
                    alt={product.name}
                    width="100%"
                    onClick={() => {
                      this.setState({ isOpen: true });
                      this.setState({ photoIndex: 1 });
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="col">
                {product.image[2] ? (
                  <img
                    className="no-margin"
                    src={product.image[2]}
                    alt={product.name}
                    width="100%"
                    onClick={() => {
                      this.setState({ isOpen: true });
                      this.setState({ photoIndex: 2 });
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="col">
                {product.image[3] ? (
                  <img
                    className="no-margin"
                    src={product.image[3]}
                    alt={product.name}
                    width="100%"
                    onClick={() => {
                      this.setState({ isOpen: true });
                      this.setState({ photoIndex: 3 });
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="col">
                {product.image[4] ? (
                  <img
                    className="no-margin"
                    src={product.image[4]}
                    alt={product.name}
                    width="100%"
                    onClick={() => {
                      this.setState({ isOpen: true });
                      this.setState({ photoIndex: 4 });
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <h3 className="margin fontHeader line">{product.name}</h3>
            <p className="margin">Price: ${product.price},00</p>
            <div className="pl-4">
              <Counter
                counter={counter}
                plus1={this.plus1}
                minus1={this.minus1}
              />
            </div>
            <Button
              variant="primary"
              className=" margin ButtonCardP"
              onClick={() => {
                addCart({ [id]: total });
                addTotal({ [id]: subtotal });
              }}
            >
              BUY
            </Button>
            <div className="margin">Rating: {this.rating()}</div>
            <hr />
          </div>
        </div>
        <div className="row mt-5 top-line">
          <div className="col-md-2">
            <h2 className="margin">Description</h2>
          </div>
          <div className="col-md-10">
            <p className="margin">{product.description}</p>
            <p className="margin "><div className="black">Lead Time</div>: {product.leadTime} </p>
            <p className="margin "><div className="black">Material</div>: {product.material} </p>
            <p className="margin "><div className="black">Height</div>: {product.height} </p>
            <p className="margin "><div className="black">Manufacturer</div>: {product.manufacturer} </p>
          </div>
        </div>
        <div className="row top-line">
          <div className="col-md-2">
            <h2 className="margin">Evaluations</h2>
          </div>
          <div className="col-md-10 pl-3">
            {this.listRating()}
          </div>
        </div>

        {isOpen && (
          <Lightbox
            mainSrc={product.image[photoIndex]}
            nextSrc={product.image[(photoIndex + 1) % product.image.length]}
            prevSrc={
              product.image[
                (photoIndex + product.image.length - 1) % product.image.length
              ]
            }
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex:
                  (photoIndex + product.image.length - 1) % product.image.length
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % product.image.length
              })
            }
          />
        )}
      </div>
    );
  }
}

export default ProductCard;
