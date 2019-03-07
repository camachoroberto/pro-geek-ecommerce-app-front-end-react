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
        pageWrapId={"page-wrap"}
        outerContainerId={"App"}
        customBurgerIcon={<img src="./public/images/sideBar.svg" />}
      />
      <Container>
        <div className="containerRow">
          {cardList}
        </div>
      </Container>
      <div className="fillin"></div>
    </div>
  
  );
};
export default Products;
