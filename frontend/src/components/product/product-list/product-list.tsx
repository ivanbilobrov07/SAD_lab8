import { FC } from "react";
import { Link } from "react-router-dom";

import { ProductType } from "./index";
import { Product } from "../../components";

type Props = {
  products: ProductType[];
};

export const ProductList: FC<Props> = ({ products }) => {
  if (!products.length) {
    return "Nothing here yet";
  }

  return (
    <ul style={{ display: "flex", gap: "20px" }}>
      {products.map((product) => (
        <li
          style={{
            border: "solid 1px black",
            padding: "20px",
            borderRadius: "15px",
          }}
          key={product.id}
        >
          <Link to={`product/${product.id}`}>
            <Product data={product} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
