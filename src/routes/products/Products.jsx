import React from 'react';
import { Container } from 'react-bootstrap';
import Sidebar from '../../components/sidebar/Sidebar.jsx';

const Products = ({ cardList, updateFilter, updatePrice, categories }) => {
  return (
    <div>
      <Sidebar
        updateFilter={updateFilter}
        updatePrice={updatePrice}
        categories={categories}
        pageWrapId="page-wrap"
        outerContainerId="App"
        customBurgerIcon={<img src="./public/images/filter.svg" alt="sidebar" />}
      />
      <Container>
        <div className="pt-5">
          <h1 className="ml-5">Products</h1>
          <hr/>
          <div className="containerRow">
            {cardList}
          </div>
        </div>
      </Container>
      <div className="fillin" />
    </div>
  );
};

export default Products;
