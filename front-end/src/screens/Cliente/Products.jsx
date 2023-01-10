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
      <div className="flex flex-wrap justify-around">
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
      </div>

      <SalesCount />
    </>
  );
}

export default Products;
