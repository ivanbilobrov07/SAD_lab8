import { FC } from "react";
import { OrderType } from "../../../types/types";

type Props = {
  data: OrderType;
  onChangeStatus: (status: string) => void;
};

export const OrderItem: FC<Props> = ({ data, onChangeStatus }) => {
  const { id, email, status, cart, address } = data;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "5px",
        alignItems: "center",
        border: "1px solid black",
        borderRadius: "15px",
      }}
    >
      <p>{email}</p>
      <p>{address}</p>
      <p>{cart.totalPrice} грн</p>
      <p>{status}</p>
      <button onClick={() => onChangeStatus(id)}>Change status</button>
    </div>
  );
};
