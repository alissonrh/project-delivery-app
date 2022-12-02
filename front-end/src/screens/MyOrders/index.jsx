import React, { useState } from 'react';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  console.log(setOrders);

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
