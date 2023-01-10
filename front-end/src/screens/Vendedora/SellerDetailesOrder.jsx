import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Get } from '../../api/requests';
import OrderDetailsItem from '../../components/OrderDetailsItem';
import NavBarSeller from '../../components/NavBarSeller';
import HeaderOrdersSellerDetail from '../../components/HeaderOrdersSellerDetail';
import StatusContext from '../../context/StatusContext';

export default function SellerDetailsOrder() {
  const { setIdOrder, setStatus } = useContext(StatusContext);
  const [products, setProducts] = useState();
  const [total, setTotal] = useState('0.00');
  const [order, setOrder] = useState({});
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
    setIdOrder(id);
  }, []);
  return (
    <>
      <NavBarSeller />
      <h1
        className="text-2xl my-5"
        style={ {
          marginLeft: '5%',
          marginRight: '5%',
        } }
      >
        Detalhes do Pedido

      </h1>
      <div
        className="border-2 shadow-2xl"
        style={ {
          marginLeft: '5%',
          marginRight: '5%',
        } }
      >
        <HeaderOrdersSellerDetail
          id={ order.id }
          saleDate={ order.saleDate }
          statusDb={ order.status }
        />
        <div
          style={ {
            marginLeft: '5%',
            marginRight: '5%',
          } }
          className="grid grid-cols-6 text-center mt-2"
        >
          <p>Item</p>
          <p
            className="col-span-2"
          >
            Descrição

          </p>
          <p>Quantidade</p>
          <p>Valor Unitário</p>
          <p>Sub-total</p>
        </div>
        {
          products?.map((item, index) => (
            <div
              style={ {
                marginLeft: '5%',
                marginRight: '5%',
              } }
              className="grid grid-cols-6 text-center items-center justify-center my-3
          text-lg"
              key={ index }
            >
              <OrderDetailsItem rote="seller" item={ item } index={ index } />
            </div>
          ))
        }
        <div
          className="flex flex-row-reverse mx-3"
        >
          <p
            className="text-3xl my-3 bg-[#036B52] text-white p-1.5 text-center rounded"
            data-testid="seller_order_details__element-order-total-price"
          >
            Total: R$
            {' '}
            {total.replace(/\./, ',')}
          </p>
        </div>
      </div>
    </>
  );
}
