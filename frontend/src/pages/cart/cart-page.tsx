import { useNavigate } from "react-router-dom";
import { CartList } from "../../components/components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { clearCart } from "../../redux/cart/cart-api-thunk";
import {
  selectCart,
  selectCartError,
  selectCartIsLoading,
} from "../../redux/selectors";

const CartPage = () => {
  const isCartLoading = useAppSelector(selectCartIsLoading);
  const cartData = useAppSelector(selectCart);
  const cartError = useAppSelector(selectCartError);

  const dispatch = useAppDispatch();
  const navigator = useNavigate();

  const onClearCart = () => {
    dispatch(clearCart({ cartId: cartData.id }));
  };

  if (isCartLoading) {
    return <div>Loading...</div>;
  }

  if (cartError) {
    return <div>{cartError}</div>;
  }

  const { products, totalPrice } = cartData;

  return (
    <div>
      <CartList cartItems={products} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p>Total Price: {totalPrice} грн</p>
        {products.length > 0 && (
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button onClick={onClearCart}>Clear Cart</button>
            <button onClick={() => navigator("/checkout", { replace: true })}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
