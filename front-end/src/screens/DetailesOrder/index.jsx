import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { Get } from '../../api/requests';
import OrderDetailsItem from '../../components/OrderDetailsItem';
import HeaderOrdersDetail from '../../components/HeaderOrdersDetail';

/* const status = {
  0: 'Pendente',
  1: 'Preparando',
  2: 'Em Trânsito',
  3: 'Entregue',
}; */

export default function DetailsOrder() {
  const [products, setProducts] = useState();
  const [total, setTotal] = useState('0.00');
  const [order, setOrder] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getSellers = async () => {
      const res = await Get(`/customer/orders/${id}`);
      console.log(res);
      setProducts(res.products);
      setTotal(res.totalPrice);
      setOrder(res);
    };
    getSellers();
  }, []);
  return (
    <>
      <NavBar />
      <h1>Detalhes do Pedido</h1>
      <div>
        <HeaderOrdersDetail
          id={ order.id }
          sellerName={ order.sellerName }
          saleDate={ order.saleDate }
          status={ order.status }
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
              <OrderDetailsItem item={ item } index={ index } />
            </div>
          ))
        }
      </div>
      <div>
        <p
          data-testid="customer_order_details__element-order-total-price"
        >
          Total: R$
          {' '}
          {total.replace(/\./, ',')}
        </p>
      </div>
    </>
  );
}
