import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginProvider from './context/LoginProvider';
import ProductsProvider from './context/ProductsProvider';
import Products from './screens/Customer/Products';
import Checkout from './screens/Customer/Checkout';
import DetailsOrder from './screens/Customer/DetailsOrder';
import Order from './screens/Customer/Order';

import Login from './screens/Comum/Login';
import Register from './screens/Comum/Register';
import SellerOrders from './screens/Seller/SellerOrders';
import SellerDetailsOrder from './screens/Seller/SellerDetailesOrder';
import StatusProvider from './context/StatusProvider';
import AdmPage from './screens/Administrator/AdmPage';

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
              <Order />
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
      <Route
        path="/admin/manage"
        element={
          <LoginProvider>
            <AdmPage />
          </LoginProvider>
        }
      />
    </Routes>
  );
}

export default App;
