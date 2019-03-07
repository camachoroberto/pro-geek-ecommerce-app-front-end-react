import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import CategoryList from '../../components/categorylist/CategoryList.jsx';


class Home extends Component {

  render() {

    const { categories, cardList } = this.props
 
    return (
      <div>
        <CategoryList categories={categories} />
        
        <div className="header">
          <div className="caption0 containerCol paddinTop">
            <h2>NEW STAR WARS COLLECTIBLE</h2>
            <h4> <Button variant="primary" className="ButtonPG">VIEW ALL</Button> </h4>
          </div><a href=""></a>
        </div>
        <div className="container">
        <div className="row justify-contentcenter">
        
          <div className="col col-md-6 ">
            <h2 className="margin30">Top Sellers</h2>
          </div>
     
          <div className="containerRow margin30">
            {cardList}
          </div>
        </div>
        </div>

        <div className="header">
          <div className="caption0 containerCol paddinTop">
            <h2>NOW AVAILABLE</h2>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;