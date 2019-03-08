import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import InputForm from '../../components/inputform/InputForm.jsx';
import AuthService from '../../components/auth/service/auth-service.jsx';
import CategoryCheckbox from '../../components/categorycheckbox/CategoryCheckbox.jsx';
import FileUpload from '../../components/auth/service/file-upload.jsx';

class ProfileUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      password: ''
    };
    this.service = new AuthService();
    this.handleText = this.handleText.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.fetchUser = this.fetchUser.bind(this);
  }

  // componentDidMount() {
  //   console.log('ProfileUpdate component props', this.props);
  //   const { name, username, password } = this.props.user;
  //   this.setState({ name, username, password });
  // }

  handleText(e) {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value
    });
  }

  saveUser(e) {
    e.preventDefault();
    const { name, email, password } = this.state;
    axios.put(`http://localhost:8080/products/${this.props.user._id}`, { name, email, password })
      .then(response => console.log(response.data))
      .catch(err => console.log(err));
  }

  fetchUser() {
    const { name } = this.state;
    if (name === '') {
      this.service.loggedin()
        .then((response) => {
          this.setState({ name: response.name, username: response.username, password: response.password });
        })
        .catch(() => {
          this.setState({ name: false, username: false, password: false });
        });
    }
  }

  render() {
    this.fetchUser();
    const { name, username, password } = this.state;
    return (
      <Form onSubmit={e => this.saveUser(e)}>
        <InputForm labelText="Name" type="text" name="name" placeholder="" value={name} change={this.handleText} />
        <InputForm labelText="Email" type="email" name="email" placeholder="" value={username} change={this.handleText} />
        <InputForm labelText="Password" type="password" name="password" placeholder="" value={password} change={this.handleText} />
        <Button variant="primary" type="submit" className="ButtonPG">
          Save Changes
        </Button>
      </Form>
    );
  }
}

export default ProfileUpdate;
