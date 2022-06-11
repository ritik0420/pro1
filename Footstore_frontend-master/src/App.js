import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './components/Home';
import NavBar from './components/NavBar';
import PrivateRoute from './auth/PrivateRoute';
import UserDashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Shop from './components/Shop';
import ProductView from './components/ProductView';
import Cart from './components/Cart';
import Orders from './admin/Orders';
import Profile from './user/Profile';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import Footer from './components/Footer';



const App = () => {
  return (
      <BrowserRouter>
      <div className="App">
        <NavBar/>
          <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/shop" component={Shop} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/user/dashboard" component={UserDashboard}/>
          <AdminRoute path="/admin/dashboard" component={AdminDashboard}/>
          <AdminRoute path="/create/category" component={AddCategory}/>
          <AdminRoute path="/create/product" component={AddProduct}/>
          <Route path="/product/:productId" component={ProductView} />
          <Route path="/cart" component={Cart} />
          <AdminRoute path="/admin/orders" component={Orders}/>
          <AdminRoute path="/admin/products" component={ManageProducts}/>
          <AdminRoute path="/admin/product/update/:productId" component={UpdateProduct}/>
          <PrivateRoute path="/profile/:userId" component={Profile}/>
          </Switch>
          {/* <Footer/> */}
          </div>
      </BrowserRouter>
  );
};

export default App;