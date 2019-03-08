import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import InputForm from '../../components/inputform/InputForm.jsx';
import AuthService from '../../components/auth/service/auth-service.jsx';

const ProfileUpdate = ({user}) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    setName(user.name);
    setUsername(user.username)
  }, [user.name, user.username]);

  const handleText = (e) => {
    const { name, value } = e.currentTarget;
    console.log(name)
    if ('name' === name) {
      setName(value);
    } 
    if ('username' === name) {
      setUsername(value);
    } 
  }

  const saveUser = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/users/${user._id}`, { name, username })
      .then(response => console.log(response.data))
      .catch(err => console.log(err));
  }
  
    return (
      <Form onSubmit={e => saveUser(e)}>
        <InputForm labelText="Name" type="text" name="name" placeholder="" value={name} change={handleText} />
        <InputForm labelText="Email" type="email" name="username" placeholder="" value={username} change={handleText} />
        <Button variant="primary" type="submit" className="ButtonPG">
          Save Changes
        </Button>
      </Form>
    );
}

export default ProfileUpdate;
