import React, { Component } from 'react';
import { InputGroup, Button, FormControl } from 'react-bootstrap';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }



  render() {
    return (

      < div >
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <Button variant="outline-secondary" onClick={e => this.props.minus1(e)}>-</Button>
            <InputGroup.Text>{this.state.counter}</InputGroup.Text>
          </InputGroup.Prepend>

          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={e => this.props.plus1(e)}>+</Button>
          </InputGroup.Append>
        </InputGroup>
      </div >

    )
  }

}

export default Counter;