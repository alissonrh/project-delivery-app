import React, { useEffect, useState } from 'react';
import { GetId } from '../../api/requests';
import NavBarSeller from '../../components/NavBarSeller';
import OrderCard from '../../components/OrderCard';

function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const getProducts = async (sellerId) => {
    setOrders(await GetId('seller/orders', { sellerId }));
  };

  useEffect(() => {
    const sellerId = JSON.parse(localStorage.getItem('user')).id;
    getProducts(sellerId);
  }, []);

  return (
    <>
      <NavBarSeller />
      <div
        className="grid grid-cols-2 mt-12"
        style={ {
          marginLeft: '10%',
          marginRight: '10%',
        } }
      >
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
    </>
  );
}

export default SellerOrders;
