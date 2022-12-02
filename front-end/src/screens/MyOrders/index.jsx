import React, { useState } from 'react';
import NavBar from '../../components/NavBar';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  console.log(setOrders);

  return (
    <div>
      <NavBar />
      {orders.map((item, index) => (
        <div key={ index }>
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
}
