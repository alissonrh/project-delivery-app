import React, { useEffect, useState } from 'react';
import { GetId } from '../../api/requests';
import NavBar from '../../components/NavBar';
import OrderCard from '../../components/OrderCard';

export default function MyOrders() {
  const [orders, setOrders] = useState();
  useEffect(() => {
    const getProducts = async () => {
      setOrders(await GetId('/customer/checkout', ));
    };
    getProducts();
  }, []);
  return (
    <div>
      <NavBar />
      {orders.map((e) => (
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
