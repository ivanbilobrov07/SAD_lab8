import { FC } from "react";
import { CartProductType } from "../../../types/types";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  changeProductQuantity,
  deleteProductFromCart,
} from "../../../redux/cart/cart-api-thunk";
import { selectCart } from "../../../redux/selectors";

type Props = {
  data: CartProductType;
};

export const CartItem: FC<Props> = ({ data }) => {
  const {
    product: { image, price, title, id },
    quantity,
  } = data;

  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  const onAddQuantity = () => {
    dispatch(
      changeProductQuantity({
        cartId: cart.id,
        productId: id,
        quantity: quantity + 1,
      })
    );
  };

  const onRemoveQuantity = () => {
    if (quantity === 1) {
      onDelete();
      return;
    }

    dispatch(
      changeProductQuantity({
        cartId: cart.id,
        productId: id,
        quantity: quantity - 1,
      })
    );
  };

  const onDelete = () => {
    dispatch(deleteProductFromCart({ cartId: cart.id, productId: id }));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <img width={100} src={image} alt={title} />
      <h3>{title}</h3>
      <p>{quantity} шт.</p>
      <p>{price * quantity} грн</p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={onAddQuantity}>+</button>
        <button onClick={onRemoveQuantity}>-</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};
