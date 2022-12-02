import React, { useContext } from 'react';
import NavBar from '../../components/NavBar';
import ProductsContext from '../../context/ProductsContext';
import ProductCard from '../../components/ProductCard';
import SalesCount from '../../components/SalesCount';

function Products() {
  const { products } = useContext(ProductsContext);
  return (
    <>
      <NavBar />
      {
        (products) && products
          .map(({ id, price, urlImage, name }) => (
            <ProductCard
              key={ id }
              id={ id }
              price={ price }
              urlImage={ urlImage }
              name={ name }
            />))
      }
      <SalesCount />
    </>
  );
}

export default Products;
