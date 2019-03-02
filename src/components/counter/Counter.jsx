import React, { Component } from 'react';
import { InputGroup, Button } from 'react-bootstrap';


const Counter = (props) => {

  const { plus1, minus1, counter} = props

  return (

    < div >
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <Button variant="outline-secondary" onClick={e => minus1(e)}>-</Button>
          <InputGroup.Text>{counter}</InputGroup.Text>
        </InputGroup.Prepend>

        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={e => plus1(e)}>+</Button>
        </InputGroup.Append>
      </InputGroup>
    </div >

  )
}


export default Counter;