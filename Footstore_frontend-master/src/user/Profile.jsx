import React, { useState, useEffect } from 'react';
import { isAuthenticated } from './../auth/userApi';
import { read, update, updateUser } from './userApi';
import { Container, Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';

function Profile({match}) {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        success: false
    });

    const {token} = isAuthenticated();
    const {name, email, password, error, success} = values;

    const init = (userId) => {
        //console.log(userId)
        read(userId, token).then(data => {
            if(data.error) {
                setValues({...values, error: true})
            } else {
                setValues({...values, name: data.name, email: data.email})
            }
        })
    };

    useEffect(() => {
        init(match.params.userId);
    }, []);


    const handleChange = name => e => {
        setValues({...values, error: false, [name]: e.target.value});
    };

    const clickSubmit = (e) => {
        e.preventDefault();
        update(match.params.userId, token, {name, email, password}).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                updateUser(data, () => {
                    setValues({...values, name: data.name, email: data.email, success: true})
                })
            }
        })
    };

    const redirectUser = (success) => {
        if(success) {
            return <Redirect to="/user/dashboard"/>
        }
    }


    return (
        <>
            <div className="profile my-5 pt-4 mx-auto">
            
           <h1 className="text-center">Profile</h1>
           
           <Container style={{ width: '70%', paddingBottom: 50}}>
        <Form>

        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            onChange={handleChange('name')} 
            value={name}
            type="text" 
            />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            onChange={handleChange('email')} 
            value={email}
            type="email" 
            />
          </Form.Group>
      
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
          onChange={handleChange('password')} 
          value={password}
          type="password" 
          />
        </Form.Group>
        
        <Button 
          className='button btn-success' 
          onClick={clickSubmit} type="submit">
          Save Changes
        </Button>
      
        </Form>
      
        </Container>

        {redirectUser(success)}
        
            </div>
            <Footer/>
        </>
    );
}

export default Profile;