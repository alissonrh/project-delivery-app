import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginProvider from './context/LoginProvider';
import ProductsProvider from './context/ProductsProvider';
import Products from './screens/Cliente/Products';
import Checkout from './screens/Checkout';
import DetailsOrder from './screens/DetailesOrder';

import Login from './screens/Comum/Login';
import Register from './screens/Comum/Register';

function App() {
  return (
    <Routes>
      <Route
        exact
        path="/register"
        element={
          <LoginProvider>
            <Register />
          </LoginProvider>
        }
      />
      <Route
        path="/"
        element={
          <Navigate to="/login" />
        }
      />
      <Route
        path="/login"
        element={
          <LoginProvider>
            <Login />
          </LoginProvider>
        }
      />
      <Route
        path="/customer/products"
        element={
          <ProductsProvider>
            <LoginProvider>
              <Products />
            </LoginProvider>
          </ProductsProvider>
        }
      />
      <Route
        path="/customer/checkout"
        element={
          <LoginProvider>
            <Checkout />
          </LoginProvider>
        }
      />
      <Route
        path="/customer/orders/:id"
        element={
          <LoginProvider>
            <DetailsOrder />
          </LoginProvider>
        }
      />
    </Routes>
  );
}

export default App;
