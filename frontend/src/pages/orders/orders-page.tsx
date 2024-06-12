import axios from "axios";
import { useEffect, useState } from "react";
import { OrdersList } from "../../components/components";
import { OrderType } from "../../types/types";

const OrdersPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await axios.get("/orders");

        setOrders(() => data);
      } catch (error: unknown) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    getOrders();
  }, []);

  const onChangeStatus = async (orderId: string) => {
    const newStatus = prompt("Enter new status");

    try {
      const { data } = await axios.patch(`/orders/${orderId}/change-status`, {
        status: newStatus,
      });

      setOrders((orders) =>
        orders.map((order) => (order.id === data.id ? data : order))
      );
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

  return (
    <div>
      <OrdersList orders={orders} onChangeStatus={onChangeStatus} />
    </div>
  );
};

export default OrdersPage;
