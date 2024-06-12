import { Route, Routes } from "react-router-dom";
import { lazy, useEffect } from "react";

import { Layout } from "./components/components";
import { useAppDispatch } from "./hooks";
import { createCart, getCartById } from "./redux/cart/cart-api-thunk";

const HomePage = lazy(() => import("./pages/home"));
const ProductPage = lazy(() => import("./pages/product"));
const CartPage = lazy(() => import("./pages/cart"));
const CheckoutPage = lazy(() => import("./pages/checkout"));
const OrdersPage = lazy(() => import("./pages/orders"));

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const cart = localStorage.getItem("persist:cart");

    if (!cart) {
      dispatch(createCart());
      return;
    }

    try {
      const cartData = JSON.parse(JSON.parse(cart).data);
      dispatch(getCartById(cartData.id));
    } catch (error) {
      dispatch(createCart());
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="admin" element={<HomePage />} />
        <Route path="admin/product/:id" element={<ProductPage />} />
        <Route path="admin/orders" element={<OrdersPage />} />
      </Route>
    </Routes>
  );
}

export default App;
