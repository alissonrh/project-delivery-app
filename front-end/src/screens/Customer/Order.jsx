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
    getProducts(userId);
  }, []);

  return (
    <>
      <NavBar />
      <div
        className="grid grid-cols-2 mt-12"
        style={ {
          marginLeft: '10%',
          marginRight: '10%',
        } }
      >
        {orders?.map((e) => (
          <OrderCard
            rote="customer"
            key={ e.id }
            id={ e.id }
            status={ e.status }
            totalPrice={ e.totalPrice }
            saleDate={ e.saleDate }
          />
        ))}
      </div>
    </>
  );
}
