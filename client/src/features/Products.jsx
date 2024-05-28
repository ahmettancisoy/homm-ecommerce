import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/`);

    if (!response.data) return false;

    setProducts(response.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 px-6 pt-12 justify-center">
      {products.map((m) => (
        <ProductItem key={m._id} data={m} />
      ))}
    </div>
  );
};

export default Products;
