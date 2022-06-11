import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Container, Badge, Row, Col } from 'react-bootstrap';
import { isAuthenticated } from '../auth/userApi';
import { Link } from 'react-router-dom';
import { getPurchaseHistory } from "./userApi";
import moment from 'moment';
import Footer from '../components/Footer';

function UserDashboard(props) {

    const [history, setHistory] = useState([]);
    
    const {user: { _id, name, email, isAdmin }} = isAuthenticated();
    
    const token = isAuthenticated().token;

    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setHistory(data);
            }
        });
    };

    useEffect(() => {
        init(_id, token);
    }, []);

    return (
        <>
            <Container fluid className="my-5 py-4">

                <h1 className="text-center">User Dashboard</h1>

                <Container className="my-4">

                    <Row>

                        <Col sm={12} md={2} lg={2}>
                            <div>
                                <Link to="/cart"><Badge variant="success">My Cart</Badge></Link><br />
                                <Link to={`/profile/${_id}`}><Badge variant="success">Update Profile</Badge></Link>
                            </div>
                        </Col>
                 

                        <Col sm={12} md={10} lg={10}>
                            <Container className=" mx-auto">

                                <Card style={{ width: '100%' }}>
                                    <Card.Header><strong className="h5">User Information</strong></Card.Header>
     
                                    <ListGroup variant="flush">
                                        <ListGroup.Item><strong>Name :- </strong>{name}</ListGroup.Item>
                                        <ListGroup.Item><strong>Email :- </strong>{email}</ListGroup.Item>
                                        <ListGroup.Item><strong>Role :- </strong>{isAdmin === true ? 'Admin' : 'Registered User'} </ListGroup.Item>
                                    </ListGroup>
                                </Card>
     
                            </Container>
     
                            <Container className="my-5 mx-auto">
     
                                <Card style={{ width: '100%' }}>
     
                                    <Card.Header><strong className="h5">Purchase History</strong></Card.Header>
     
                                    <ListGroup variant="flush">
                     
                                        <ListGroup.Item>
                                            {history.map((h, i) => {
                                                return (
                                                    <div key={i}>
                                                        <hr />
                                                        {h.products.map((p, i) => {
                                                            return (
                                                                <div key={i}>
                                                                    <strong>Product name :-</strong> {p.name}<br />
                                                                    <strong>Product price :-</strong> Rs.{p.price}<br />
                                                                    <strong>Purchased date :-</strong> {moment(p.createdAt).fromNow()}<br />
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                );
                                            })}
                                        </ListGroup.Item>
                     
                                    </ListGroup>
     
                                </Card>
     
                            </Container>
                        </Col>

                    </Row>

                </Container>

            

            
            
            </Container>
            <Footer />
        </>
    );
}

export default UserDashboard;