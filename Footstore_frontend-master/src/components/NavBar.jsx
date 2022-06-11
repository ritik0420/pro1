import React, { Fragment } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/userApi';
import { itemTotal } from './cartHelpers';

function NavBar(props) {
    return (
        <Navbar className='navbar' expand="lg" fixed="top">

          <Navbar.Brand 
            className="pl-5"
            style={{color: 'chartreuse'}} 
            onClick={() => props.history.push('/')}>FootStore</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            
        <Nav className="nav mx-auto">

            <Nav.Item 
                className="mx-2" 
                onClick={() => props.history.push('/')}>
                  Home
            </Nav.Item>

            <Nav.Item 
                className="mx-2" 
                onClick={() => props.history.push('/shop')}>
                  Shop
            </Nav.Item>

            <Nav.Item 
                className="mx-2" 
                onClick={() => props.history.push('/cart')}>
                  Cart <sup>
                        <small className="cart-badge">{itemTotal()}</small>
                      </sup>
            </Nav.Item>

          {isAuthenticated() && isAuthenticated().user.isAdmin === false && (
            <Nav.Item 
                className="mx-2" 
                onClick={() => props.history.push('/user/dashboard')}>Dashboard</Nav.Item>
          )}
          
          {isAuthenticated() && isAuthenticated().user.isAdmin === true && (
            <Fragment>
              <Nav.Item 
                className="mx-2" 
                onClick={() => props.history.push('/admin/dashboard')}>Admin Dashboard</Nav.Item>

              <Nav.Item 
                className="mx-2" 
                onClick={() => props.history.push('/user/dashboard')}>Dashboard</Nav.Item>
            </Fragment>
          )}


          </Nav>


        <Nav className="nav ml-auto mr-5">

          {!isAuthenticated() && (
            <Fragment>
              <Nav.Item 
                className="mx-2" 
                onClick={() => props.history.push('/Signin')}>Sign In</Nav.Item>

              <Nav.Item 
                className="mx-2" 
                onClick={() => props.history.push('/Signup')}>Sign Up</Nav.Item>
            </Fragment>
          )}

          {isAuthenticated() && (
              <Nav.Item 
                className="mx-2" 
                onClick={() => signout(() => {props.history.push('/')})}>Sign out</Nav.Item>
          )}

        </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
}

export default withRouter(NavBar);