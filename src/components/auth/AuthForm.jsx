import React, { Component } from 'react';
import AuthService from './service/auth-service.jsx';
import { Redirect } from 'react-router-dom';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      password: '',
      birthDate: '',
      success: false
    };
    this.inputType = '';
    this.service = new AuthService();
    this.createForm = this.createForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getInputType = this.getInputType.bind(this);
    this.success = this.success.bind(this);
  }

  getInputType(type) {
    if (type === 'password') {
      this.inputType = type;
    } else {
      this.inputType = 'text';
    }
  }

  success() {
    this.setState({success: true})
  }

  handleSubmit(e) {
    e.preventDefault();
    const { type, getUser } = this.props;
    const { name, username, Password, birthDate} = this.state;
    let route = '';
    if (type === 'Signup') {
      route = this.service.signup(name, username, Password, birthDate);
    }
    if (type === 'Login') {
      route = this.service.login(username, Password);
    }
    route
      .then((response) => {
        this.setState({
          name: '',
          username: '',
          password: '',
          birthDate: ''
        });
        getUser(response.user);
        this.success();
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
      if (prop === 'username' || prop === 'name' || prop === 'Password' || prop === 'birthDate') {
        if (prop === 'username') {
          return (
            <div class="form-group" key={idx}>
              <label htmlFor="email">Email address</label>
              <input type="text" class="form-control" id="email" name={prop} value={this.state[prop]} onChange={e => this.handleText(e)}placeholder="Enter email" />
            </div>
          );
        }
        this.getInputType(prop);
        return (
          <div class="form-group" key={idx}>
            <label htmlFor={prop}>{prop}</label>
            <input type={prop} class="form-control" id={prop} name={prop} value={this.state[prop]} onChange={e => this.handleText(e)}placeholder={prop} />
          </div>
        );
      }
    });
  }

  render() {
    const { type } = this.props;
    if (this.state.success) {
      return <Redirect to="/" />
    }
    return (
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div class="card shadow-sm">
              <div class="card-body">
                <h5 class="card-title">{type}</h5>
                <form onSubmit={e => this.handleSubmit(e)}>
                  {this.createForm()}
                  <input type="submit"className="btn btn-primary ButtonPG" value="Submit" />
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="fillin0"/>  
      </div>
    );
  }
}

export default AuthForm;
