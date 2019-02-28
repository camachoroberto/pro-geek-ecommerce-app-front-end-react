import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.props = props;
    this.createForm = this.createForm.bind(this);
  }

  handleText(e) {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value
    }, () => {
      console.log(this.state);
    });
  }

  hendleSubmit(e){}

  createForm() {
    return Object.keys(this.props).map((prop, idx) => {
      if (prop === 'username') {
        return (
          <div key={idx}>
            <label htmlFor={prop}>
              Email
              <input type="text" name={prop} id={prop} value={this.state[prop]} onChange={e => this.handleText(e)} />
            </label>
          </div>
        );
      }
      return (
        <div>
          <label htmlFor={prop}>{prop}</label>
          <input type="text" name={prop} id={prop} value={this.state[prop]} onChange={e => this.handleText(e)} />
        </div>
      );
    });
  }

  render() {
    return (
      <form onSubmit={e => this.handleSubmit}>
        {this.createForm()}
        <input type="submit" value="Signup" />
      </form>
    );
  }
}

export default Form;
