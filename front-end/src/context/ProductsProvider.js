import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ProductsContext from './ProductsContext';
import { Get } from '../api/requests';

function ProductsProvider({ children }) {
  const [products, setProducts] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setProducts(await Get('/customer/products'));
    };
    getProducts();
  }, []);

  const contextProducts = useMemo(() => ({
    products,
  }), [products]);

  return (
    <ProductsContext.Provider value={ contextProducts }>
      { children }
    </ProductsContext.Provider>
  );
}

export default ProductsProvider;

ProductsProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
