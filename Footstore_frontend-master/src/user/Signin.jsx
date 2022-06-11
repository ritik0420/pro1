import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { signin, authenticate, isAuthenticated } from '../auth/userApi';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';

function Signin(props) {

  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToRerrer: false
});

const { email, password, error, loading, redirectToReferrer } = values;
const { user } = isAuthenticated(); 

const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
};

const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then(data => {
        if (data.error) {
            setValues({ ...values, error: data.error, loading: false });
        } else {
            authenticate (data, 
                () => {
                setValues({
                  ...values,
                  redirectToReferrer: true
              });
            });
        }
    });
};

const showError = () => (
    <div className="mt-2 alert alert-danger" style={{ display: error ? '' : 'none' }}>
        {error}
    </div>
);

const showLoading = () =>
        loading && (
            <div className="mt-2 alert alert-info">
                <h2>Loading...</h2>
            </div>
        );

const redirectUser = () => {
    if (redirectToReferrer) {
        if (user && user.isAdmin === true) {
            return <Redirect to="/admin/dashboard" />;
        } else {
            return <Redirect to="/user/dashboard" />;
        }
    }
    if (isAuthenticated()) {
        return <Redirect to="/"/>
    }
    };

    return (
        <>
            <div className='signin pt-5'>
        <div style={{ textAlign: "center", padding: 20 }}>
           <h1>Sign In</h1>
        </div>

        <Container style={{ width: '70%', paddingBottom: 50}}>
        <Form>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={handleChange('email')} 
            value={email} 
            type="email" 
            placeholder="Enter email" />
        </Form.Group>
      
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            onChange={handleChange('password')} 
            value={password}
            type="password" 
            placeholder="Enter Password" />
        </Form.Group>
        
        <Button className='button btn-success'
          onClick={clickSubmit} type="submit">
          Sign In
        </Button>

      </Form>
      {showLoading()}
        {showError()}
        </Container>

        {redirectUser()}
            </div>
            <Footer/>
        </>
    );
}


export default Signin;