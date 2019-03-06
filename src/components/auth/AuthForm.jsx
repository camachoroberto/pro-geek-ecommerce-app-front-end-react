import React, { Component } from 'react';
import AuthService from './service/auth-service.jsx';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      password: '',
      birthDate: ''
    };
    this.inputType = '';
    this.service = new AuthService();
    this.createForm = this.createForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getInputType = this.getInputType.bind(this);
  }

  getInputType(type) {
    if (type === 'password') {
      this.inputType = type;
    } else {
      this.inputType = 'text';
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { type, getUser } = this.props;
    const { name, username, password, birthDate} = this.state;
    let route = '';
    if (type === 'signup') {
      route = this.service.signup(name, username, password, birthDate);
    }
    if (type === 'login') {
      route = this.service.login(username, password);
    }
    route
      .then((response) => {
        this.setState({
          name: '',
          username: '',
          password: '',
          birthDate: ''
        });
        getUser(response);
      });
  }

  handleText(e) {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value
    });
  }

  createForm() {
    return Object.keys(this.props).map((prop, idx) => {
      if (prop === 'username' || prop === 'name' || prop === 'password' || prop === 'birthDate') {
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
        this.getInputType(prop);
        return (
          <div key={idx}>
            <label htmlFor={prop}>{prop}</label>
            <input type={this.inputType} name={prop} id={prop} value={this.state[prop]} onChange={e => this.handleText(e)} />
          </div>
        );
      }
    });
  }

  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        {this.createForm()}
        <input type="submit" value="Signup" />
      </form>
    );
  }
}

export default AuthForm;
