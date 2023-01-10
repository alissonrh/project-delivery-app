import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Select from '../../components/Select';
import ItemPedido from '../../components/ItemPedido';
import Total from '../../components/Total';
import { Get, PostAuth } from '../../api/requests';

export default function Checkout() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [sellers, setSellers] = useState([]);
  const [user, setUser] = useState();
  const [sellerId, setSellerId] = useState('');
  const [deliveryAddress, setAdress] = useState('');
  const [deliveryNumber, setNumber] = useState('');
  const [disabled, setDisabled] = useState(true);

  const totalValue = () => {
    const totalValueProducts = products.reduce((acc, product) => (
      acc + (product.quantity * product.unitPrice)
    ), 0);
    setTotal(totalValueProducts);
  };

  useEffect(() => {
    if (products <= 0 || deliveryNumber === '' || deliveryAddress === '') {
      return setDisabled(true);
    }
    return setDisabled(false);
  }, [products, deliveryNumber, deliveryAddress]);

  useEffect(() => {
    const getSellers = async () => {
      const res = await Get('/customer/checkout');
      setSellers(res);
    };
    getSellers();
  }, []);

  useEffect(() => {
    const getProducts = () => {
      const productsStorage = JSON.parse(localStorage.getItem('sale'));
      const userStorage = JSON.parse(localStorage.getItem('user'));
      setUser(userStorage);
      setProducts(productsStorage);
    };
    getProducts();
  }, []);

  const navigator = useNavigate();

  useEffect(() => {
    totalValue();
    localStorage.setItem('sale', JSON.stringify(products));
  }, [products]);

  const handleSubmit = async () => {
    const newProduct = products.map((product) => ({
      productId: product.productId,
      quantity: product.quantity,
    }));
    try {
      const reqBody = {
        saleInfo: {
          userId: user.id,
          sellerId,
          deliveryAddress,
          deliveryNumber,
        },
        sales: newProduct,
      };
      console.log(reqBody);
      const res = await PostAuth('/customer/checkout', reqBody, user.token);
      localStorage.setItem('sale', JSON.stringify([]));
      navigator(`/customer/orders/${res.saleId}`);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <NavBar />
      <h1
        className="text-2xl my-5"
        style={ {
          marginLeft: '10%',
          marginRight: '10%',
        } }
      >
        Finalizar Pedido

      </h1>

      <article
        className="border-2 p-3 shadow-2xl"
        style={ {
          marginLeft: '10%',
          marginRight: '10%',
        } }
      >
        <div
          className="grid grid-cols-7 text-center"
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
          <p>Excluir</p>
        </div>

        {
          products.map((item, index) => (
            <div
              className="grid grid-cols-7 text-center items-center justify-center my-3
            text-lg"
              key={ index }
            >
              <ItemPedido item={ item } index={ index } />
              <button
                className="bg-[#2FC18C] text-white rounded-r-md"
                onClick={ () => setProducts(products
                  .filter((product) => product !== item)) }
                type="button"
                data-testid={ `customer_checkout__element-order-table-remove-${index}` }
              >
                Remover item
              </button>
            </div>
          ))
        }
        <Total
          total={ total }
        />
      </article>

      <h1
        className="text-2xl my-5"
        style={ {
          marginLeft: '10%',
          marginRight: '10%',
        } }
      >
        Detalhes e Endereços para entrega

      </h1>
      <div
        className="border-2 p-3 shadow-2xl mb-12 flex flex-col items-center"
        style={ {
          marginLeft: '10%',
          marginRight: '10%',
        } }
      >
        <div
          className="flex"
        >
          <div
            className="flex flex-col px-12"
          >
            <h3>
              P. Vendedora Responsável

            </h3>
            {console.log(sellers)}
            {sellers.length > 0
              ? <Select sellers={ sellers } setSellerId={ setSellerId } /> : null}
          </div>
          <div
            className="px-12"
          >
            <h3>Endereço</h3>
            <input
              className="shadow-md appearance-none border border-verde-escuro
            rounded w-full py-2 px-3
            text-gray-700 mt-1.5 mb-3 leading-tight
            focus:outline-none focus:shadow-outline
            focus:border focus:border-verde-claro"
              data-testid="customer_checkout__input-address"
              value={ deliveryAddress }
              onChange={ (e) => setAdress(e.target.value) }
              type="text"
              placeholder="Rua"
            />
          </div>
          <div
            className="px-12"
          >
            <h3>Número</h3>
            <input
              className="shadow-md appearance-none border border-verde-escuro
            rounded w-full py-2 px-3
            text-gray-700 mt-1.5 mb-3 leading-tight
            focus:outline-none focus:shadow-outline
            focus:border focus:border-verde-claro"
              data-testid="customer_checkout__input-address-number"
              value={ deliveryNumber }
              onChange={ (e) => setNumber(e.target.value) }
              type="text"
              placeholder="Número"
            />
          </div>
        </div>
        <button
          className={
            `${disabled
              ? 'opacity-40'
              : 'opacity-100'}
            text-2xl my-3 bg-[#036B52] text-white p-1.5 w-56 text-center rounded`
          }
          data-testid="customer_checkout__button-submit-order"
          type="button"
          onClick={ () => handleSubmit() }
          disabled={ disabled }
        >
          Finalizar Pedido
        </button>
      </div>
    </>
  );
}
