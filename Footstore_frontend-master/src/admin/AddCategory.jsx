import React, { useState } from 'react';
import { isAuthenticated } from '../auth/userApi';
import { Button, Container, Form, Badge } from 'react-bootstrap';
import { addCategory } from './adminApi';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function AddCategory(props) {
    const [name, setName] = useState();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const {user, token} = isAuthenticated();

    const handleChange = (e) => {
        setError('');
        setName(e.target.value);
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        addCategory(user._id, token, {name})
        .then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setError('');
                setSuccess(true);
            }
        })
    };

    const showSuccess = () => {
        if (success) {
            return <h6 className="mt-3 text-success">{name} is created.</h6>
        }
    };

    const showError = () => {
        if (error) {
            return <h6 className="mt-3 text-danger">{name} already exists.</h6>
        }
    };

    const goBack = () => (
        <div className="my-5">
              <Link to="/admin/dashboard" className="h5 text-success">
                 <Badge variant="info">Back to dashboard</Badge>
              </Link>
            </div>
    );

    return (
        <>
            <div className="my-5 pt-5 mx-auto w-75">
          
            <h3 className="text-center">Add Category</h3>

            <Container className="my-4">

            <Form onSubmit={clickSubmit}>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  autoFocus
                  onChange={handleChange} 
                  value={name} 
                  type="text" 
                  placeholder="Enter category name" />
              </Form.Group>

              <Button className='button btn-success' type="submit">
                 Add
              </Button>

            </Form>

            {showError()}
            {showSuccess()}
            {goBack()}

        </Container>
            </div>
            <Footer/>
        </>
    );
}

export default AddCategory;