import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import InputForm from '../../components/inputform/InputForm.jsx';
import AuthService from '../../components/auth/service/auth-service.jsx';

const ProfileUpdate = ({ user, fetchUserAddress }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [street, setStreet] = useState('');
  const [complement, setComplement] = useState('');
  const [postalCode, setPostalCode] = useState('');

  useEffect(() => {
    setName(user.name);
    setUsername(user.username);
    setStreet(user.address.street);
    setComplement(user.address.complement);
    setPostalCode(user.address.postalCode);
  }, [user.name, user.username, user.address.street, user.address.complement, user.address.postalCode]);

  const handleText = (e) => {
    const { name, value } = e.currentTarget;
    if ('name' === name) {
      setName(value);
    }
    if ('username' === name) {
      setUsername(value);
    }
    if ('street' === name) {
      setStreet(value);
    }
    if ('complement' === name) {
      setComplement(value);
    }
    if ('postalCode' === name) {
      setPostalCode(value);
    }
  }

  const saveUser = (e) => {
    e.preventDefault();
    axios({
      method: 'put',
      url: `http://localhost:8080/users/${user._id}`,
      data: {
        name: name,
        username: username,
        street: street,
        complement: complement,
        postalCode: postalCode
      }
    })
      .then(() =>  fetchUserAddress())
      .catch(err => {
        throw err;
      });
  }

  return (
    <Form onSubmit={e => saveUser(e)}>
      <InputForm labelText="Name" type="text" name="name" placeholder="" value={name} change={handleText} />
      <InputForm labelText="Email" type="email" name="username" placeholder="" value={username} change={handleText} />
      <InputForm labelText="Street" type="text" name="street" placeholder="" value={street} change={handleText} />
      <InputForm labelText="Complement" type="text" name="complement" placeholder="" value={complement} change={handleText} />
      <InputForm labelText="Postal Code" type="text" name="postalCode" placeholder="" value={postalCode} change={handleText} />



      <Button variant="primary" type="submit" className="ButtonPG">
        Save Changes
        </Button>
    </Form>
  );
}

export default ProfileUpdate;
