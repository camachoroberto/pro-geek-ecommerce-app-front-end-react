import React from "react";
import { slide as Menu } from "react-burger-menu";
import { CategoryCheckbox } from "../categorycheckbox/CategoryCheckbox.jsx";

export default ({categories, updateFilter, updatePrice, ...rest}) => {
  const handleCheck = (e) => {
    const { name, checked } = e.currentTarget;
    updateFilter(name, checked);
  }

  const handleCheckPrice = (e) => {
    let { value, checked } = e.currentTarget;
    value = value.split(' ');
    updatePrice(value[0], value[1], checked);
  }

  const listCategories = categories.map(element => (
  <div key={element._id}>
    <input type="checkbox" name={element._id} id={element.name} onChange={e => handleCheck(e)} />
    <label htmlFor={element.name}>{element.name}</label>
  </div>
  ));

  return (
    <Menu {...rest}>
      <h3>Category</h3>
      <p>______</p>
      <div>
      {listCategories}
      </div>
      <br/>
      <br/>
      <h3>Price</h3>
      <p>______</p>
      <div>
          <input type="radio" name='price' id="any" value="0 1000000" onClick={e => handleCheckPrice(e)}/>
          <label htmlFor="any">Any</label>
      </div>
      <div>
          <input type="radio" name='price' id="0 100" value="0 100" onClick={e => handleCheckPrice(e)}/>
          <label htmlFor="0 100">0-100</label>
      </div>
      <div>
          <input type="radio" name='price' id="100 200" value="100 200" onClick={e => handleCheckPrice(e)}/>
          <label htmlFor="100 200">100-200</label>
      </div>
      <div>
          <input type="radio" name='price' id="200 500" value="200 500" onClick={e => handleCheckPrice(e)}/>
          <label htmlFor="200 500">200-500</label>
      </div>
      <div>
          <input type="radio" name='price' id="500 +" value="500 100000000000" onClick={e => handleCheckPrice(e)}/>
          <label htmlFor="500 +">500+</label>
      </div>
    </Menu>
  );
};
