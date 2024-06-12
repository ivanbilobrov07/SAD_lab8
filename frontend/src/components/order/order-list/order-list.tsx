import { FC } from "react";

import { OrderType } from "../../../types/types";
import { OrderItem } from "../../components";

type Props = {
  orders: OrderType[];
  onChangeStatus: (status: string) => void;
};

export const OrdersList: FC<Props> = ({ orders, onChangeStatus }) => {
  if (!orders.length) {
    return <div>No orders</div>;
  }

  return (
    <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {orders.map((order) => (
        <li key={order.id}>
          <OrderItem data={order} onChangeStatus={onChangeStatus} />
        </li>
      ))}
    </ul>
  );
};
