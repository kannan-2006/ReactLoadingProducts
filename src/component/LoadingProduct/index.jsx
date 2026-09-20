import React, { useEffect } from "react";
import { useState } from "react";
import "./index.css";

const LoadingProduct = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    const getProducts = async () => {
      try {
        let skip = null;
        if (count === 0) {
          skip = 0;
        } else {
          skip = count * 21;
        }
        const response = await fetch(
          `https://dummyjson.com/products?limit=21&skip=${skip}`,
        );
        const data = await response.json();
        if (data && data.products && data.products.length) {
          setProducts(data.products);
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
      }
    };
    getProducts();
  }, [count]);

  const onClickBtn = () => {
    setCount((prev) => prev + 1);
  };

  if (loading) {
    return <div>LoadingProduct....</div>;
  }

  return (
    <div className="products-container">
      <div className="products">
        {products.map((eachProducts) => (
          <div key={eachProducts.id}>
            <img src={eachProducts.thumbnail} alt={eachProducts.title} />
            <p>{eachProducts.title}</p>
          </div>
        ))}
      </div>
      <button onClick={onClickBtn} disabled={count > 5 ? true : false}>
        LoadMore
      </button> 
    </div>
  );
};

export default LoadingProduct;
