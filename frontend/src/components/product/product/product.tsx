import { FC } from "react";

import { ProductType } from "./index";

type Props = {
  data: ProductType;
};

export const Product: FC<Props> = ({ data }) => {
  const { title, price, image } = data;

  return (
    <div style={{ textAlign: "center" }}>
      <img width={200} src={image} alt={title} />
      <h3>{title}</h3>
      <span>{price} грн</span>
    </div>
  );
};
