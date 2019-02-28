import React, { Component } from 'react';
import { InputGroup, Button, FormControl } from 'react-bootstrap';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
    this.plus1 = this.plus1.bind(this)
    this.minus1 = this.minus1.bind(this)
  }

  plus1() {
    const counter = this.state.counter;
    this.setState({
      counter: counter + 1
    })
  }

  minus1() {
    const counter = this.state.counter;
    if (counter > 0) {
      this.setState({
        counter: counter - 1
      })
    }
  }

  render() {
    return (

      < div >
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <Button variant="outline-secondary" onClick={e => this.minus1(e)}>-</Button>
            <InputGroup.Text>{this.state.counter}</InputGroup.Text>
          </InputGroup.Prepend>

          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={e => this.plus1(e)}>+</Button>
          </InputGroup.Append>
        </InputGroup>
      </div >

    )
  }

}

export default Counter;