import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { signup } from '../auth/userApi';
import Footer from '../components/Footer';

function Signup(props) {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const { name, email, password, success, error } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                });
            }
        });
    };

    const showError = () => (
        <div className="mt-2 alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="mt-2 alert alert-info" style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to="/Signin">Sign In</Link>
        </div>
    );

    return (
      <>
        <div className='signup pt-5'>
        <div style={{ textAlign: "center", padding: 20 }}>
           <h1>Sign Up</h1>
        </div>

        <Container style={{ width: '70%', paddingBottom: 50}}>
        <Form>

        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            onChange={handleChange('name')} 
            value={name}
            type="text" 
            placeholder="Enter name" />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            onChange={handleChange('email')} 
            value={email}
            type="email" 
            placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
      
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
          onChange={handleChange('password')} 
          value={password}
          type="password" 
          placeholder="Enter Password" />
        </Form.Group>
        
        <Button 
          className='button btn-success' 
          onClick={clickSubmit} type="submit">
          Sign Up
        </Button>
      </Form>
      {showSuccess()}
        {showError()}
        </Container>

        </div>
        <Footer/>
        </>
    );
}

export default Signup;