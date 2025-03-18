
import { useForm } from "react-hook-form";
import { ICartItemForm } from "./interface";
import { MockCartItem } from "./mockData";

export const useCartController = () => {
  const formHandler = useForm<ICartItemForm>({
    defaultValues: {
      ...MockCartItem,
    },
  });
  // const formHandler = useForm<ICartItemForm>();
  const cartDetail = formHandler.watch();
  return { formHandler, cartDetail };
};
