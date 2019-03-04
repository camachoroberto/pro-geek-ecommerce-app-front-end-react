import React from 'react';
import { Form } from 'react-bootstrap';

const InputForm = (props) => (
  <Form.Group>
    <Form.Label>{props.labelText}</Form.Label>
    <Form.Control type={props.type} as={props.as} name={props.name} placeholder={props.placeholder} value={props.value} onChange={e => props.change(e)} />
  </Form.Group>
);

export default InputForm;
