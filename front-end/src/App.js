import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginProvider from './context/LoginProvider';
import ProductsProvider from './context/ProductsProvider';
import Products from './screens/Cliente/Products';
import Checkout from './screens/Checkout';
import DetailsOrder from './screens/DetailesOrder';
import MyOrders from './screens/MyOrders';

import Login from './screens/Comum/Login';
import Register from './screens/Comum/Register';
import SellerOrders from './screens/Vendedora/SellerOrders';
import SellerDetailsOrder from './screens/Vendedora/SellerDetailesOrder';
import StatusProvider from './context/StatusProvider';

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
        path="/customer/orders"
        element={
          <LoginProvider>
            <StatusProvider>
              <MyOrders />
            </StatusProvider>
          </LoginProvider>
        }
      />
      <Route
        path="/customer/orders/:id"
        element={
          <LoginProvider>
            <StatusProvider>
              <DetailsOrder />
            </StatusProvider>
          </LoginProvider>
        }
      />
      <Route
        path="/seller/orders"
        element={
          <ProductsProvider>
            <LoginProvider>
              <StatusProvider>
                <SellerOrders />
              </StatusProvider>
            </LoginProvider>
          </ProductsProvider>
        }
      />
      <Route
        path="/seller/orders/:id"
        element={
          <LoginProvider>
            <StatusProvider>
              <SellerDetailsOrder />
            </StatusProvider>
          </LoginProvider>
        }
      />
    </Routes>
  );
}

export default App;
