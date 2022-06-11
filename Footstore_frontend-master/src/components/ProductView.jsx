import React, { useState, useEffect } from 'react';
import { read, listRelated } from './componentApi';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ProductImg from './ProductImg';
import ProductCard from './ProductCard';
import { addItem } from './cartHelpers';
import { Redirect } from 'react-router-dom';
import Footer from './Footer';

function ProductView(props) {

    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    const showStock = quantity => {
        return quantity > 0 ? (
          <span className="badge badge-warning badge-pill">In Stock </span>
        ) : (
          <span className="badge badge-danger badge-pill">Out of Stock </span>
        );
      };

      const addToCart = () => {
        addItem(product, setRedirect(true));
      };

      const shouldRedirect = () => {
          if(redirect) {
              return <Redirect to="/cart"/>
          }
      }
    


    return (
        <>
            <Container className="my-5 py-4">

          <Row>

             <Col lg={6}>

               <div className="my-5">
               <ProductImg item={product} url="products"/>
               </div>
               
             </Col>

             <Col lg={6}>
             {shouldRedirect(redirect)}
                <h3 className="my-5">{product.name}</h3>
                <p className="my-5">{product.description}</p>
                <p>Rs.{product.price}</p>
                <p>{showStock(product.quantity)}</p>

                <Button size="lg" variant="success" onClick={addToCart}>Add to cart</Button>

             </Col>
          </Row>

          <Container fluid className="my-5 py-4">

           <h4 className="text-center">Related Products</h4>
           
           <Row className="justify-content-center">
             {relatedProduct.map((product, i) => (
             <ProductCard key={i} product={product}/>
              ))}
           </Row>

            </Container>
        </Container>
            <Footer/>
        </>
    );
}

export default ProductView;