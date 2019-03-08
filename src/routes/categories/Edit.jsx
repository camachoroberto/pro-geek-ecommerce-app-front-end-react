import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const Edit = ({ show, handleClose }) => {
  const [name, setName] = useState('');

  const handleText = (e) => {
    const { value } = e.currentTarget;
    setName(value);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={name} placeholder="Category Name" onChange={e => handleText(e)}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Edit;
