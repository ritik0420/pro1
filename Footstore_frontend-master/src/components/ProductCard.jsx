import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import ProductImg from './ProductImg';
import { Link } from 'react-router-dom';
import { updateItem, removeItem } from './cartHelpers';



function ProductCard({product, 
                      cartUpdate = false,
                      showRemoveProductButton = false,
                      setRun = f => f,
                      run = undefined
                    }) 
    {
      const [count, setCount] = useState(product.count);

      const showStock = quantity => {
        return quantity > 0 ? (
          <span className="badge badge-warning badge-pill">In Stock </span>
        ) : (
          <span className="badge badge-danger badge-pill">Out of Stock </span>
        );
      };

      const handleChange = productId => event => {
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
          updateItem(productId, event.target.value);
        }
      };
    

      const showCartUpdateOptions = cartUpdate => {
        return (
          cartUpdate && (
            <div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Adjust Quantity</span>
                </div>
                <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
              </div>
            </div>
          )
        );
  };


      const showRemoveButton = showRemoveProductButton => {
        return (
          showRemoveProductButton && (
            <Button
              size="sm" variant="light" className="btn-outline-danger m-2"
              onClick={() => {
                removeItem(product._id);
                setRun(!run); // run useEffect in parent Cart
                window.location.reload();
              }}
            >
              Remove Product
            </Button>
          )
        );
      };

                        

  return (
    
    <Card className="mx-3 my-3" style={{ width: '18rem' }}>

      <Card.Body>

        <ProductImg item={product} url="products" />

        <Card.Title>{product.name}</Card.Title>

        <Card.Text>
          Rs.{product.price}
        </Card.Text>

        <p>{showStock(product.quantity)}</p>

        <Link to={`/product/${product._id}`}>
          <Button size="sm" variant="light" className="btn-outline-success">View</Button>
        </Link>

        {showRemoveButton(showRemoveProductButton)}

        {showCartUpdateOptions(cartUpdate)}
          
      </Card.Body>
    </Card>
        
  );
}

export default ProductCard;