import React, { useState } from 'react';
import ItemPedido from '../../components/ItemPedido';
import NavBar from '../../components/NavBar';
import Total from '../../components/Total';

const status = {
  0: 'Pendente',
  1: 'Preparando',
  2: 'Em Trânsito',
  3: 'Entregue',
};

export default function DetailsOrder() {
  const [profile, setProfile] = useState({
    pedido: 3,
    vendedor: 'Maria',
    data: '12/12/2020',
    status: status[1],
  });
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  return (
    <>
      <NavBar />
      <h1>Detalhes do Pedido</h1>
      <div>
        <div>
          <p>
            PEDIDO
            {' '}
            {profile.pedido}
          </p>
          <p>
            P. Vend:
            {' '}
            {profile.vendedor}
          </p>
          <p>
            P. Vend:
            {' '}
            {profile.data}
          </p>
          <p>
            P. Vend:
            {' '}
            {profile.status}
          </p>
        </div>
      </div>
      <div>
        <p>Item</p>
        <p>Descrição</p>
        <p>Quantidade</p>
        <p>Valor Unitário</p>
        <p>Sub-total</p>
        <p>Remover Item</p>
      </div>
      {products.map((item, index) => (
        <ItemPedido key={ index } item={ item } index={ index } />
      ))}
      <Total total={ total } />
    </>
  );
}
