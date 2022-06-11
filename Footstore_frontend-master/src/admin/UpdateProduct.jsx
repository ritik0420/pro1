import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth/userApi';
import { Button, Container, Form, Badge } from 'react-bootstrap';
import { getCategories, updateProduct, getProduct } from './adminApi';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function UpdateProduct({match}) {

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        quantity: '',
        photo: '',
        loading: false,
        error: false,
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    const [categories, setCategories] = useState([]);

    const { user, token } = isAuthenticated();

    const {
        name,
        description,
        price,
        // categories,
        category,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;


    const init = productId => {
        getProduct(productId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                // populate the state
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    shipping: data.shipping,
                    quantity: data.quantity,
                    formData: new FormData()
                });
                // load categories
                initCategories();
            }
        });
    };

    // load categories and set form data
    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

    useEffect(() => {
        init(match.params.productId);
    }, []);


    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        updateProduct(match.params.productId, user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    loading: false,
                    error: false,
                    redirectToProfile: true,
                    createdProduct: data.name
                });
            }
        });
    };


    const showError = () => (
        <div className="mt-3 alert alert-danger" style={{display: error ? '' : 'none'}}>
         {error}
        </div>
    );

    const showSuccess = () => (
        <div className="mt-3 alert alert-info" style={{display: createdProduct ? '' : 'none'}}>
          <h2>{`${createdProduct}`} is updated!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    

    const goBack = () => (
        <div className="my-5">
              <Link to="/admin/products" className="h5 text-success">
                 <Badge variant="info">Back to Manage Products</Badge>
              </Link>
            </div>
    );

    return (
        <>
            <div className="my-5 pt-4 mx-auto w-75">

        <h3 className="text-center">Update Product</h3>

          <Container className="my-4">

            <Form onSubmit={clickSubmit}>

            <Form.Group controlId="formBasicPhoto">
                <Form.Label>Add Photo</Form.Label>
                <Form.Control
                className="btn-outline-success"
                  autoFocus
                  onChange={handleChange('photo')} 
                  type="file" 
                  name="photo"
                  accept="image/*"
                   />
                  
              </Form.Group>

              <Form.Group controlId="formBasicName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  autoFocus
                  onChange={handleChange('name')} 
                  value={name} 
                  type="text" 
                   />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows="3"
                  autoFocus
                  onChange={handleChange('description')} 
                  value={description} 
                  type="text" 
                   />
              </Form.Group>

              <Form.Group controlId="formBasicPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  autoFocus
                  onChange={handleChange('price')} 
                  value={price} 
                  type="number" 
                  />
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
                  />
            </Form.Group>

              <Button className='button btn-success' type="submit">
                 Save Changes
              </Button>

            </Form>

            {showLoading()}
            {showError()}
            {showSuccess()}
            {goBack()}

        </Container>
            </div>
            <Footer/>
        </>
    );
}

export default UpdateProduct;