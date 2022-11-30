import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginProvider from './context/LoginProvider';

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
        exact
        path="/"
        element={
          <LoginProvider>
            <Login />
          </LoginProvider>
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
    </Routes>
  );
}

export default App;
