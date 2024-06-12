import { useNavigate } from "react-router-dom";
import { CartList } from "../../components/components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectCart } from "../../redux/selectors";
import axios from "axios";
import { useState } from "react";
import { createCart } from "../../redux/cart/cart-api-thunk";

const CheckoutPage = () => {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const cartData = useAppSelector(selectCart);

  const dispatch = useAppDispatch();
  const navigator = useNavigate();

  const { products, totalPrice } = cartData;

  const onCreateOrder = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/orders", {
        cart: cartData,
        email,
        address,
        status: "CREATED",
      });

      console.log(data);

      setEmail("");
      setAddress("");
      dispatch(createCart());
      navigator("/", { replace: true });
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <CartList cartItems={products} />
      <p>Total Price: {totalPrice} грн</p>
      <form onSubmit={onCreateOrder}>
        <label>
          Email
          <input
            onChange={({ currentTarget }) => setEmail(currentTarget.value)}
            type="email"
          />
        </label>
        <label>
          Address
          <input
            onChange={({ currentTarget }) => setAddress(currentTarget.value)}
            type="text"
          />
        </label>
        <button>Create Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
