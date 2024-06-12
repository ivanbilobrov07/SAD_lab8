import axios from "axios";
import { useEffect, useState } from "react";
import { ProductType } from "../../types/types";
import { ProductList } from "../../components/components";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [products, setProducts] = useState<ProductType[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");

  const location = useLocation();
  const isAdmin = location.pathname.includes("admin");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get("/products");

        setProducts(() => data);
      } catch (error: unknown) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, []);

  const onAddProduct = async (e) => {
    e.preventDefault();

    const body = {
      title,
      description,
      image,
      price: Number(price),
      quantity: Number(quantity),
    };

    try {
      const { data } = await axios.post("/products", body);

      setProducts((products) => [...products, data]);
    } catch (error) {
      console.log(error.message);
    }

    setTitle("");
    setDescription("");
    setPrice("");
    setQuantity("");
    setImage("");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {isAdmin && (
        <form onSubmit={onAddProduct}>
          <label>
            Title
            <input
              onChange={({ currentTarget }) => setTitle(currentTarget.value)}
              value={title}
              type="text"
            />
          </label>
          <br />
          <label>
            Description
            <input
              onChange={({ currentTarget }) =>
                setDescription(currentTarget.value)
              }
              value={description}
              type="text"
            />
          </label>
          <br />
          <label>
            Price
            <input
              onChange={({ currentTarget }) => setPrice(currentTarget.value)}
              value={price}
              type="number"
            />
          </label>
          <br />
          <label>
            Quantity
            <input
              onChange={({ currentTarget }) => setQuantity(currentTarget.value)}
              value={quantity}
              type="number"
            />
          </label>
          <br />
          <label>
            Image
            <input
              onChange={({ currentTarget }) => setImage(currentTarget.value)}
              value={image}
              type="url"
            />
          </label>
          <button>Add product</button>
        </form>
      )}

      <ProductList products={products} />
    </div>
  );
};

export default HomePage;
