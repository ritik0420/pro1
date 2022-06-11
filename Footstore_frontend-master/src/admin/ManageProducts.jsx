import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem, Badge, Button } from 'react-bootstrap';
import { isAuthenticated } from './../auth/userApi';
import { getProducts, deleteProduct } from './adminApi';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function ManageProducts(props) {

    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated();

    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    useEffect(() => {
        loadProducts();
    }, []);


    return (
        <>
            <Container fluid className="my-5 py-4 text-center">
           <h1 className="text-center">Manage Products</h1>

           <Container>
              <Row>
                 <Col lg={12}>
                 
                   <h3 className="my-2 text-success">Total {products.length} products.</h3>
                   
                    <ListGroup>
                        {products.map((p, i) => (
                            <ListGroupItem key={i} className="d-flex justify-content-between align-items-center">

                                <strong>{p.name}</strong>
                               
                                <div>

                                <Link to={`/product/${p._id}`}>
                                    <span className="mx-1"><Badge variant="info">View</Badge></span>
                                </Link>

                                <Link to={`/admin/product/update/${p._id}`}>
                                    <span className="mx-1"><Badge variant="warning">Update</Badge></span>
                                </Link>

                                <span className="mx-1" style={{cursor: 'pointer'}}><Badge onClick={() => destroy(p._id)} variant="danger">Delete</Badge></span>
                                </div>

                            </ListGroupItem>
                        ))}
                    </ListGroup>
                 </Col>
              </Row>
           </Container>

            </Container>
            <Footer/>
        </>
    );
}

export default ManageProducts;