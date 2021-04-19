import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";

// pages for this product
import ProductPage from "./ProductPage.js";
import LoginPage from "./LoginPage.js";
import RegisterPage from "./RegisterPage.js";
import NavLayout from "../components/Layout/NavLayout";
import Footer from "../components/Layout/Footer"
import UploadProductPage from '../components/UploadsProductPage/UploadProductPage';
import ProductDetailPage from './ProductDetailPage';
import CartPage from './CartPage';
import MainPage from './MainPage';
import HistoryPage from './HistoryPage';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

const App = () => {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavLayout />
      <div style={{ minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(MainPage, null)} />
          <Route exact path="/shop" component={Auth(ProductPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/product/:productId" component={Auth(ProductDetailPage, null)} />
          <Route exact path="/user/cart" component={Auth(CartPage, true)} />
          <Route exact path="/history" component={Auth(HistoryPage, true)}/>
        </Switch>
      </div>
      <Footer/>
    </Suspense>
  );
}

export default App;
