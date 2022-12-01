import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Select from '../../components/Select';
import ItemPedido from '../../components/ItemPedido';
import Total from '../../components/Total';

export default function Checkout() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const navigator = useNavigate();
  return (
    <body>
      <NavBar />
      <h1>Finalizar Pedido</h1>
      <div>
        <p>Item</p>
        <p>Descrição</p>
        <p>Quantidade</p>
        <p>Valor Unitário</p>
        <p>Sub-total</p>
        <p>Remover Item</p>
      </div>
      <div>
        {products.map((item, index) => (
          <button
            key={ index }
            data-testids={ `element-order-table-name-${index}` }
            onClick={ () => navigator(`/customer/orders/${index}`) }
            type="button"
          >
            <ItemPedido item={ item } index={ index } />
            <button
              onClick={ () => setProducts(products
                .filter((product) => product !== item)) }
              type="button"
            >
              Remover item

            </button>
          </button>
        ))}
      </div>
      <Total total={ total } />
      <h1>Detalhes e Endereços para Entrega</h1>
      <div>
        <div>
          <div>
            <h3>P. Vendedora Responsável:</h3>
            <Select />
          </div>
          <div>
            <h3>Endereço</h3>
            <input type="text" placeholder="Rua" />
          </div>
          <div>
            <input type="text" placeholder="Número" />
          </div>
        </div>
        <button type="submit">
          Finalizar Pedido
        </button>
      </div>
    </body>
  );
}
