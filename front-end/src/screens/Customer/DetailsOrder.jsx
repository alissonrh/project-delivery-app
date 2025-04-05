import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { Get } from '../../api/requests';
import OrderDetailsItem from '../../components/OrderDetailsItem';
import HeaderOrdersDetail from '../../components/HeaderOrdersDetail';
import StatusContext from '../../context/StatusContext';

export default function DetailsOrder() {
  const { setIdOrder, setStatus } = useContext(StatusContext);
  const [products, setProducts] = useState();
  const [total, setTotal] = useState('0.00');
  const [order, setOrder] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getSellers = async () => {
      const res = await Get(`/customer/orders/${id}`);
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
      <NavBar />
      <h1
        className="text-2xl my-5"
        style={{
          marginLeft: '5%',
          marginRight: '5%',
        }}
      >
        Detalhes do Pedido

      </h1>
      <div
        className="border-2 shadow-2xl"
        style={{
          marginLeft: '5%',
          marginRight: '5%',
        }}
      >
        <HeaderOrdersDetail
          id={order.id}
          sellerName={order.sellerName}
          saleDate={order.saleDate}
          status={order.status}
        />
        <div
          style={{
            marginLeft: '5%',
            marginRight: '5%',
          }}
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
              style={{
                marginLeft: '5%',
                marginRight: '5%',
              }}
              className="grid grid-cols-6 text-center items-center justify-center my-3
            text-lg"
              key={index}
            >
              <OrderDetailsItem rote="customer" item={item} index={index} />
            </div>
          ))
        }
        <div
          className="flex flex-row-reverse mx-3"
        >
          <p
            className="text-3xl my-3 bg-[#036B52] text-white p-1.5 text-center rounded"
            data-testid="customer_order_details__element-order-total-price"
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
