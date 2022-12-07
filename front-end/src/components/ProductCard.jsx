import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProductsContext from '../context/ProductsContext';

function ProductCard({ id, price, urlImage, name }) {
  const { sales, setSales } = useContext(ProductsContext);
  const [quantity, setQuantity] = useState(0);
  const [disabled, setDisabled] = useState(true);

  
  useEffect(() => {
    const localStorageSales = JSON.parse(localStorage.getItem('sale'));
    localStorageSales?.forEach((e) => {
      if (e.productId === id) setQuantity(e.quantity);
    });
  }, []);

  useEffect(() => {
    if (quantity <= 0) {
      return setDisabled(true);
    }
    return setDisabled(false);
  }, [quantity]);

  useEffect(() => {
    if (sales.some((e) => e.productId === id)) {
      const teste = sales.filter((e) => e.productId !== id);
      const teste2 = [...teste, { productId: id, quantity, unitPrice: price }]
        .filter((e) => e.quantity > 0);
      setSales(teste2);
    } else {
      const newSales = [...sales, { productId: id, quantity, unitPrice: price }]
        .filter((e) => e.quantity > 0);
      setSales(newSales);
    }
  }, [id, price, quantity, sales, setSales]);

  useEffect(() => {
    const setLocalStorage = () => {
      localStorage.setItem('sale', JSON.stringify(sales));
    };
    setLocalStorage();
  }, [sales]);
  
  return (
    <div>
      <span data-testid={ `customer_products__element-card-price-${id}` }>
        {price.replace('.', ',')}
      </span>
      <img
        height={ 250 }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
      />
      <span
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        {name}

      </span>
      <button
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        type="button"
        onClick={ () => setQuantity(Number(quantity) - 1) }
        disabled={ disabled }
      >
        -

      </button>
      <input
        data-testid={ `customer_products__input-card-quantity-${id}` }
        type="number"
        value={ quantity }
        onChange={ (e) => { setQuantity(e.target.value); } }
      />
      <button
        data-testid={ `customer_products__button-card-add-item-${id}` }
        type="button"
        onClick={ () => setQuantity(Number(quantity) + 1) }
      >
        +

      </button>
    </div>
  );
}

export default ProductCard;

ProductCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  urlImage: PropTypes.string,
}.isRequired;
