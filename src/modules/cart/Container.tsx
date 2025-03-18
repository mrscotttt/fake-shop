"use client";

import { FC } from "react";
import { useCartController } from "./controller";
import { CartStep1Container } from "./views/step-1-view-cart/Container";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CartContainer: FC<any> = () => {
  const { formHandler, cartDetail } = useCartController();
  return (
    <>
      <CartStep1Container formHandler={formHandler}  cartDetail={cartDetail} />
    </>
  );
};
