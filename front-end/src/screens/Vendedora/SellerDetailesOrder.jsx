import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Get } from '../../api/requests';
import OrderDetailsItem from '../../components/OrderDetailsItem';
import NavBarSeller from '../../components/NavBarSeller';
import HeaderOrdersSellerDetail from '../../components/HeaderOrdersSellerDetail';

export default function SellerDetailsOrder() {
  const [products, setProducts] = useState();
  const [total, setTotal] = useState('0.00');
  const [order, setOrder] = useState({});
  const [status, setStatus] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const getSellers = async () => {
      const res = await Get(`/seller/orders/${id}`);
      setProducts(res.products);
      setTotal(res.totalPrice);
      setStatus(res.status);
      setOrder(res);
    };
    getSellers();
  }, []);
  return (
    <>
      <NavBarSeller />
      <h1>Detalhes do Pedido</h1>
      <div>
        <HeaderOrdersSellerDetail
          id={ order.id }
          saleDate={ order.saleDate }
          status={ status }
        />
        <div
          style={ {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '5px',
            marginLeft: '25%',
            marginRight: '25%',
          } }
        >
          <p>Item</p>
          <p>Descrição</p>
          <p>Quantidade</p>
          <p>Valor Unitário</p>
          <p>Sub-total</p>
        </div>
        {
          products?.map((item, index) => (
            <div
              key={ index }
            >
              <OrderDetailsItem rote="seller" item={ item } index={ index } />
            </div>
          ))
        }
      </div>
      <div>
        <p
          data-testid="seller_order_details__element-order-total-price"
        >
          Total: R$
          {' '}
          {total.replace(/\./, ',')}
        </p>
      </div>
    </>
  );
}
