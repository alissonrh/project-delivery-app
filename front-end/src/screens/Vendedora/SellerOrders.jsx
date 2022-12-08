import React, { useEffect, useState } from 'react';
import { GetId } from '../../api/requests';
import NavBarSeller from '../../components/NavBarSeller';
import OrderCard from '../../components/OrderCard';

function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const getProducts = async (userId) => {
    setOrders(await GetId('seller/orders', { userId }));
  };

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    getProducts(userId);
  }, []);
  return (
    <div>
      <NavBarSeller />
      {orders?.map((e) => (
        <OrderCard
          rote="seller"
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

export default SellerOrders;
