import React, { useState, useEffect } from 'react';
import { isAuthenticated } from './../auth/userApi';
import { Link } from 'react-router-dom';
import { getBraintreeClientToken, processPayment, createOrder } from './componentApi';
import DropIn from 'braintree-web-drop-in-react';
import { emptyCart } from './cartHelpers';
import { Form } from 'react-bootstrap';

function Checkout({ products, setRun = f => f, run = undefined }) {

    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if (data.error) {
                setData({...data, error: data.error});
            } else {
                setData({clientToken: data.clientToken});
            }
        });
    };

    useEffect(() => {
        getToken(userId, token);
    }, []);

    const handleAddress = event => {
        setData({...data, address: event.target.value})
    }

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const showCheckout = () => {
        return isAuthenticated() ? 
                (
                    <div>{showDropin()}</div>
                ) 
                : 
                (
                    <Link to="/signin">
                       <button className="btn btn-outline-info">Sign In to checkout</button>
                    </Link>
                )
    };

    let deliveryAddress = data.address;

    const buy = () => {
        setData({ loading: true });
        // send the nonce to your server
        // nonce = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance
            .requestPaymentMethod()
            .then(data => {
                // console.log(data);
                nonce = data.nonce;
                // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
                // and also total to be charged
                // console.log(
                //     "send nonce and total to process: ",
                //     nonce,
                //     getTotal(products)
                // );
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                };

                processPayment(userId, token, paymentData)
                    .then(response => {
                        console.log(response);
                        // empty cart
                        // create order

                        const createOrderData = {
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            address: deliveryAddress
                        };

                        createOrder(userId, token, createOrderData)
                          .then(response => {
                            emptyCart(() => {
                             setRun(!run); // run useEffect in parent Cart
                             console.log('payment success and empty cart');
                              setData({
                                    loading: false,
                                    success: true
                                  });
                               });
                             })
                          .catch(error => {
                              console.log(error);
                                setData({ loading: false });
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        setData({ loading: false });
                    });
            })
            .catch(error => {
                // console.log("dropin error: ", error);
                setData({ ...data, error: error.message });
            });
    };

    const showDropin = () => (
        <div onBlur={() => setData({...data, error: ''})}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>

                   <div>
                     <Form.Group className="text-left" controlId="exampleForm.ControlTextarea1">
                     <Form.Label>Delivery address:</Form.Label>
                     <Form.Control as="textarea" rows="3"
                        autoFocus
                        onChange={handleAddress} 
                        value={data.address} 
                        type="text" 
                        placeholder="Type your delivery address here..." />
                     </Form.Group>
                   </div>

                   <DropIn 
                      options={{
                           authorization: data.clientToken,
                        }}
                      onInstance={instance => (data.instance = instance)} />

                      <button onClick={buy} className="btn btn-success btn-block">Pay</button>
                      
                </div>
            ) 
                : null }
        </div>
    );

    const showError = error => (
        <div 
            className="alert alert-danger my-2"
            style ={{display: error ? '' : 'none'}}
            >
            {error}
            </div>
    );

    const showSuccess = success => (
        <div 
            className="alert alert-info my-2"
            style ={{display: success ? '' : 'none'}}
            >
            Thanks! your payment was successful.
            </div>
    );

    const showLoading = loading => loading && <h4 className="alert alert-danger my-2">Loading...</h4>;

    return (
        <div className="mt-3">
            <h4>Your cart summary.</h4>
            <hr/>
            <h5>Total = Rs.{getTotal()}</h5>
    
            {showCheckout()}
            {showLoading(data.loading)}
            {showError(data.error)}
            {showSuccess(data.success)}
            
        </div>
    );
};

export default Checkout;