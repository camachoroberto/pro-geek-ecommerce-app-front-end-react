import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from './service/auth-service.jsx';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      username: '',
      Password: '',
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
    this.setState({ success: true });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { type, getUser, updateMessage } = this.props;
    const { Name, username, Password } = this.state;
    let route = '';
    if (type === 'Signup') {
      route = this.service.signup(Name, username, Password);
    }
    if (type === 'Login') {
      route = this.service.login(username, Password);
    }
    route
      .then((response) => {
        this.setState({
          Name: '',
          username: '',
          Password: '',
        });
        if (response.user) {
          getUser(response.user);
          this.success();
        } else if (response.name) {
          getUser(response);
          this.success();
        } else {
          updateMessage(response.message);
        }
      })
      .catch(err => { throw err });
  }

  handleText(e) {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value
    });
  }

  createForm() {
    return Object.keys(this.props).map((prop, idx) => {
      if (prop === 'username' || prop === 'Name' || prop === 'Password') {
        if (prop === 'username') {
          return (
            <div className="form-group" key={idx}>
              <label htmlFor="email">Email address</label>
              <input type="text" class="form-control" id="email" name={prop} value={this.state[prop]} onChange={e => this.handleText(e)} placeholder="Enter email" />
            </div>
          );
        }
        this.getInputType(prop);
        return (
          <div className="form-group" key={idx}>
            <label htmlFor={prop}>{prop}</label>
            <input type={prop} class="form-control" id={prop} name={prop} value={this.state[prop]} onChange={e => this.handleText(e)} placeholder={prop} />
          </div>
        );
      }
    });
  }

  render() {
    const { type } = this.props;
    if (this.state.success) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{type}</h5>
                <form onSubmit={e => this.handleSubmit(e)}>
                  {this.createForm()}
                  <input type="submit" className="btn btn-primary ButtonPG" value="Submit" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthForm;
