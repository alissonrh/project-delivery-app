import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  
  return (
    <body>
      <h1>Meus Pedidos</h1>
      {orders.map((item, index) => (
        <div key={ index }>
          <p>{item}</p>
        </div>
      ))}
    </body>
  );
}
