import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import InputForm from '../../components/inputform/InputForm.jsx';
import { Redirect } from 'react-router-dom';

const ProfileUpdate = ({ user, fetchUserAddress, updateMessage }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [street, setStreet] = useState('');
  const [complement, setComplement] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [updateState, setUpdateState] = useState(false);

  useEffect(() => {
    setName(user.name);
    setUsername(user.username);
    setStreet(user.address.street);
    setComplement(user.address.complement);
    setPostalCode(user.address.postalCode);
  }, [user.name, user.username, user.address.street, user.address.complement, user.address.postalCode]);

  const handleText = (e) => {
    const { name, value } = e.currentTarget;
    if (name === 'name') {
      setName(value);
    }
    if (name === 'username') {
      setUsername(value);
    }
    if (name === 'street') {
      setStreet(value);
    }
    if (name === 'complement') {
      setComplement(value);
    }
    if (name === 'postalCode') {
      setPostalCode(value);
    }
  };

  const saveUser = (e) => {
    e.preventDefault();
    axios({
      method: 'put',
      url: `${process.env.API_URL}/users/${user._id}`,
      data: {
        name,
        username,
        street,
        complement,
        postalCode
      }
    })
      .then(() => {
        fetchUserAddress();
        setUpdateState(true);
      })
      .catch((err) => {
        throw err;
      });
  };


  if (updateState) {
    updateMessage('Data updated successfully');
    return <Redirect to="/profile" />;
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3>Update my Profile</h3>
              <Form onSubmit={e => {saveUser(e); setUpdateState(true)}}>
                <InputForm labelText="Name" type="text" name="name" placeholder="" value={name} change={handleText} />
                <InputForm labelText="Email" type="email" name="username" placeholder="" value={username} change={handleText} />
                <InputForm labelText="Street" type="text" name="street" placeholder="" value={street} change={handleText} />
                <InputForm labelText="Complement" type="text" name="complement" placeholder="" value={complement} change={handleText} />
                <InputForm labelText="Postal Code" type="text" name="postalCode" placeholder="" value={postalCode} change={handleText} />
                <Button variant="primary" type="submit" className="ButtonPG">Save Changes</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
