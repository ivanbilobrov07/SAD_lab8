import { Suspense } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export const Layout = () => {
  const location = useLocation();
  const isAdmin = location.pathname.includes("admin");

  return (
    <div>
      <Suspense>
        {isAdmin ? (
          <div style={{ display: "flex", gap: "20px" }}>
            <Link to="/admin">Products</Link>
            <Link to="/admin/orders">Orders</Link>
          </div>
        ) : (
          <div style={{ display: "flex" }}>
            <Link style={{ marginLeft: "auto" }} to="/cart">
              <img
                width={40}
                src="https://www.svgrepo.com/show/80543/shopping-cart-outline.svg"
                alt=""
              />
            </Link>
          </div>
        )}
        <Outlet />
      </Suspense>
    </div>
  );
};
