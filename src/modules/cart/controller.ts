import { useForm } from "react-hook-form";
import { ICartItemForm } from "./interface";
import { MockCartItem } from "./config-json";

export const useCartController = () => {
  const formHandler = useForm<ICartItemForm>({
    defaultValues: {
      ...MockCartItem,
    },
  });
  const cartDetail = formHandler.watch();
  return { formHandler, cartDetail };
};
