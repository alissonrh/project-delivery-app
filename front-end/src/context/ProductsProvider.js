import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ProductsContext from './ProductsContext';
import { Get } from '../api/requests';

function ProductsProvider({ children }) {
  const localStorageSales = JSON.parse(localStorage.getItem('sale'));
  const [products, setProducts] = useState(false);
  const [sales, setSales] = useState(localStorageSales || []);

  useEffect(() => {
    const getProducts = async () => {
      setProducts(await Get('/customer/products'));
    };
    getProducts();
  }, []);

  const contextProducts = useMemo(() => ({
    products,
    sales,
    setSales,
  }), [products, sales]);

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
