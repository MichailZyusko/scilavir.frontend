"use client";

import axios from "@/api/axios";
import Link from "next/link";
import { Button } from "@/ui-kit/buttons";
import { useClerkToken } from "@/context/auth";
import { toast } from "react-toastify";
import { Loader } from "@/ui-kit/spinners";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "@clerk/nextjs";
import OrderForm from "@/ui-kit/components/cart/order-form";
import { FieldValues } from "react-hook-form";
import { clearCart, selectCart } from "../cart.slice";

export default function CartPage() {
  const { cart } = useSelector(selectCart);
  const dispatch = useDispatch();
  const { isSignedIn, isLoaded } = useUser();
  const { updateClerkToken } = useClerkToken();

  if (!isLoaded) {
    return <Loader />;
  }

  if (Object.keys(cart).length === 0) {
    return (
      <main className="flex flex-auto flex-col items-center justify-center px-44 mb-16">
        <h1 className="text-2xl font-semibold">Корзина пуста</h1>
        <Link href="/">
          <Button>Вернуться в главное меню</Button>
        </Link>
      </main>
    );
  }

  const onSubmitHandler = async (orderDetails: FieldValues) => {
    if (!isSignedIn) {
      toast.error("Для оформления заказа необходимо авторизоваться");
      return;
    }

    console.log({ orderDetails });

    // await updateClerkToken();
    // const orderPromise = axios.post('/orders', {
    //   cart,
    //   orderDetails,
    // });

    // const { status } = await toast.promise(orderPromise, {
    //   pending: 'Оформляем заказ...',
    //   success: 'Заказ успешно оформлен',
    //   error: 'Ошибка при оформлении заказа',
    // });

    // if (status === 201) {
    //   dispatch(clearCart());
    // }
  };

  return (
    <main className="px-44 mb-16">
      <OrderForm onSubmitHandler={onSubmitHandler} />
    </main>
  );
}
