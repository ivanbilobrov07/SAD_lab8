import { FC } from "react";
import { Link } from "react-router-dom";

import { CartProductType } from "../../../types/types";
import { CartItem } from "../../components";

type Props = {
  cartItems: CartProductType[];
};

export const CartList: FC<Props> = ({ cartItems }) => {
  if (!cartItems.length) {
    return <div>Your cart is empty</div>;
  }

  return (
    <ul>
      {cartItems.map((cartItem) => (
        <li key={cartItem.product.id}>
          <CartItem data={cartItem} />
        </li>
      ))}
    </ul>
  );
};
