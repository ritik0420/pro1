import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth/userApi';
import { Button, Container, Form, Badge } from 'react-bootstrap';
import { addProduct, getCategories } from './adminApi';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function AddProduct(props) {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: '',
        formData: ''
    });

    const {
        name,
        description,
        price,
        categories,
        category,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData 
    } = values;
    

    const {user, token} = isAuthenticated();


    const init = () => {
        getCategories().then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            } else (
                setValues({...values, categories: data, formData: new FormData()})
            )
        })
    }

    useEffect(() => {
        init();
    }, [])


    const handleChange = name => event => {
        const value = name === 'photo'? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({...values, [name]: value})
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({...values, error: '', loading: true });

        addProduct(user._id, token, formData)
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    loading: false,
                    createdProduct: data.name
                })
            }
        })
    };


    const showError = () => (
        <div className="mt-3 alert alert-danger" style={{display: error ? '' : 'none'}}>
         {error}
        </div>
    );

    const showSuccess = () => (
        <div className="mt-3 alert alert-info" style={{display: createdProduct ? '' : 'none'}}>
          <h2>{`${createdProduct}`} is created.</h2>
        </div>
    );
    

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
        
        <h3 className="text-center">Add Product</h3>

        <Container className="my-4">    

            <Form onSubmit={clickSubmit}>

            <Form.Group controlId="formBasicPhoto">
                <Form.Label>Add Photo</Form.Label>
                <Form.Control
                className="btn-outline-success"
                  autoFocus
                  onChange={handleChange('photo')} 
                  type="file" 
                  accept="image/*"
                  name="photo" />
                  
              </Form.Group>

              <Form.Group controlId="formBasicName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  autoFocus
                  onChange={handleChange('name')} 
                  value={name} 
                  type="text" 
                  placeholder="Enter product name" />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows="3"
                  autoFocus
                  onChange={handleChange('description')} 
                  value={description} 
                  type="text" 
                  placeholder="Enter product description" />
              </Form.Group>

              <Form.Group controlId="formBasicPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  autoFocus
                  onChange={handleChange('price')} 
                  value={price} 
                  type="number" 
                  placeholder="Enter product price" />
              </Form.Group>

              <Form.Group controlId="formBasicCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  autoFocus
                  onChange={handleChange('category')}
                  value={category} >
                  <option>Select category</option>
                  {categories && categories.map((c, i) => (
                      <option key={i} value={c._id}>
                      {c.name}
                      </option>
                  ))}
                  </Form.Control>
              </Form.Group>

              <Form.Group controlId="formBasicQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  autoFocus
                  onChange={handleChange('quantity')} 
                  value={quantity} 
                  type="number" 
                  placeholder="Enter product quantity" />
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

export default AddProduct;