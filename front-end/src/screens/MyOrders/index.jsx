import React, { useEffect, useState } from 'react';
import { GetId } from '../../api/requests';
import NavBar from '../../components/NavBar';
import OrderCard from '../../components/OrderCard';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const getProducts = async (userId) => {
    setOrders(await GetId('customer/orders', { userId }));
  };

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    console.log({ userId });
    getProducts(userId);
  }, []);
  return (
    <div>
      <NavBar />
      {orders?.map((e) => (
        <OrderCard
          key={ e.id }
          id={ e.id }
          status={ e.status }
          totalPrice={ e.totalPrice }
          saleDate={ e.saleDate }
        />
      ))}
    </div>
  );
}
