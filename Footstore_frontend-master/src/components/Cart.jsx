import React, { useState, useEffect } from 'react';
import { getCart } from './cartHelpers';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import Checkout from './Checkout';
import Footer from './Footer';

function Cart(props) {

    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);


    useEffect(() => {
        setItems(getCart())
    }, []);
    


    const showItems = items => {
        return (
            <div className="mt-3">
               <h4>Your cart has {`${items.length}`} items.</h4>
               <hr/>
               <Container fluid className="my-4">
                  <Row className="justify-content-center">
                     {items.map((product, i) => (
                       <ProductCard 
                       key={i} 
                       product={product} 
                       cartUpdate={true}
                       showRemoveProductButton={true}
                       setRun={setRun}
                       run={run}/>
                      ))}
                  </Row>
               </Container> 
            </div>
        )
    };


    const noItemsMessage = () => (
        <h4>Your cart is empty.<br/>
            <Link to="/shop">Continue shopping</Link>   
        </h4>
    )


    return (
        <>
            <Container fluid className="cart my-5 py-4 text-center">

            <h3>Shopping Cart</h3>

            <Row>

               <Col lg={6}>

                 { items.length > 0 ?
                   showItems(items) : 
                   noItemsMessage()
                 }

               </Col>

               <Col lg={6}>
                 <Checkout products={items}/>
               </Col>

            </Row>
            
        </Container>
        <Footer/>
        </>
    );
}

export default Cart;