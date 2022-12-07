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
  const [sellerId, setSellerId] = useState(0);
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
      const res = await PostAuth('/customer/checkout', reqBody, user.token);
      localStorage.setItem('sale', JSON.stringify([]));
      navigator(`/customer/orders/${res.saleId}`);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <NavBar />
      <h1>Finalizar Pedido</h1>
      <div>
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
          products.map((item, index) => (
            <div
              key={ index }
            >
              <ItemPedido item={ item } index={ index } />
              <button
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
      </div>
      <Total total={ total } />
      <h1>Detalhes e Endereços para Entrega</h1>
      <div>
        <div>
          <div>
            <h3>
              P. Vendedora Responsável:

            </h3>
            {sellers.length > 0
              ? <Select sellers={ sellers } setSellerId={ setSellerId } /> : null}
          </div>
          <div>
            <h3>Endereço</h3>
            <input
              data-testid="customer_checkout__input-address"
              value={ deliveryAddress }
              onChange={ (e) => setAdress(e.target.value) }
              type="text"
              placeholder="Rua"
            />
          </div>
          <div>
            <input
              data-testid="customer_checkout__input-address-number"
              value={ deliveryNumber }
              onChange={ (e) => setNumber(e.target.value) }
              type="text"
              placeholder="Número"
            />
          </div>
        </div>
        <button
          data-testid="customer_checkout__button-submit-order"
          type="button"
          onClick={ () => handleSubmit() }
          disabled={ disabled }
        >
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
}
