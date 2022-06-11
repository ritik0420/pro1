import React from 'react';
import { Card, ListGroup, Container, Badge, Row, Col } from 'react-bootstrap';
import { isAuthenticated } from '../auth/userApi';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function AdminDashboard(props) {
    const {user: { name, email, isAdmin }} = isAuthenticated();
    return (
      <>
        <Container fluid className="my-5 py-4">

            <h1 className="text-center">Admin Dashboard</h1>

            <Container className="my-4">
            

            <Row>

              <Col sm={12} md={2} lg={2}>
                  <div>
                      <Link to="/create/category"><Badge variant="success">Add Category</Badge></Link><br/>
                      <Link to="/create/product"><Badge variant="success">Add Product</Badge></Link><br/>
                      <Link to="/admin/orders"><Badge variant="success">View Orders</Badge></Link><br/>
                      <Link to="/admin/products"><Badge variant="success">Manage Products</Badge></Link><br/>
                  </div>
              </Col>

              <Col sm={12} md={10} lg={10}>
                  <Container className="mx-auto">

                    <Card style={{ width: '100%' }}>
                    <Card.Header><strong className="h5">User Information</strong></Card.Header>

                    <ListGroup variant="flush">
                      <ListGroup.Item><strong>Name :- </strong>{name}</ListGroup.Item>
                      <ListGroup.Item><strong>Email :- </strong>{email}</ListGroup.Item>
                      <ListGroup.Item><strong>Role :- </strong>{isAdmin === true ? 'Admin' : 'Registered User' } </ListGroup.Item>
                    </ListGroup>
                    </Card>

                  </Container>
              </Col>

            </Row></Container>

            
        </Container>
        <Footer/>
        </>
    );
}

export default AdminDashboard;