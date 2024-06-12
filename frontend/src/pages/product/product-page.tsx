import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { ProductType } from "../../types/product";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addProductToCart } from "../../redux/cart/cart-api-thunk";
import { selectCart } from "../../redux/selectors";

const ProductPage = () => {
  const [data, setData] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigator = useNavigate();
  const isAdmin = location.pathname.includes("admin");

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);

  useEffect(() => {
    const getProductData = async () => {
      try {
        const { data } = await axios.get(`/products/${id}`);

        setData(() => data);
      } catch (error: unknown) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    getProductData();
  }, [id]);

  const onAddToCart = (productId: string) => {
    let flag = true;

    while (flag) {
      const quantityStr = window.prompt("Enter quantity");

      if (!quantityStr) {
        return;
      }

      const quantity = Number(quantityStr);

      if (quantity) {
        flag = false;

        dispatch(addProductToCart({ cartId: cart.id, productId, quantity }));

        break;
      }
    }
  };

  const onChangeProduct = async () => {
    const title = window.prompt("Enter title", data?.title);
    const description = window.prompt("Enter description", data?.description);
    const price = window.prompt("Enter price", String(data?.price));
    const quantity = window.prompt("Enter quantity", String(data?.quantity));
    const image = window.prompt("Enter image", data?.image);

    try {
      const { data: response } = await axios.put(`/products/${data?.id}`, {
        title,
        description,
        image,
        price: Number(price),
        quantity: Number(quantity),
      });

      setData(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const onDeleteProduct = async () => {
    try {
      await axios.delete(`/products/${data?.id}`);

      navigator("/admin", { replace: true });
    } catch (error) {
      console.log(error.message);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>No data for this product</div>;
  }

  const { title, image, description, price, quantity, id: productId } = data;

  return (
    <div>
      <h2>{title}</h2>
      <div style={{ display: "flex", gap: "100px" }}>
        <img src={image} width={500} alt={title} />
        <div>
          <p>{description}</p>
          <p>{price} грн</p>
          <p>Quantity - {quantity}</p>
          {isAdmin ? (
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={onChangeProduct}>Change product</button>
              <button onClick={onDeleteProduct}>Delete product</button>
            </div>
          ) : (
            <button onClick={() => onAddToCart(productId)}>Add to cart</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
