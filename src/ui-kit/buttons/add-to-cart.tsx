import axios from '@/api/axios';
import { useEffect } from 'react';
import { useClerkToken } from '@/context/auth';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@/redux/hooks';
import {
  decreaseProductCounts, increaseProductCounts, selectCart, setProductsCount,
} from '@/app/cart/cart.slice';
import { useSelector } from 'react-redux';
import { handleError } from '@/utils';
import { Button } from '.';

type TProps = {
  productId: string;
  quantity?: number
};
export function AddToCartButton({ productId, quantity: q }: TProps) {
  const { cart } = useSelector(selectCart);
  const dispatch = useAppDispatch();
  const { updateClerkToken } = useClerkToken();

  const quantity = cart.get(productId) ?? q;

  useEffect(() => {
    dispatch(setProductsCount({
      id: productId,
      quantity: quantity ?? 0,
    }));
  }, [quantity, productId]);

  const addToCartHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await updateClerkToken();
      await axios({
        url: '/cart',
        method: 'POST',
        data: {
          productId,
          quantity,
        },
      });

      dispatch(increaseProductCounts({ id: productId }));
      toast.success('Товар добавлен в корзину');
    } catch (error) {
      handleError(error);
    }
  };

  const removeFromCartHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await updateClerkToken();
      await axios({
        url: '/cart',
        method: 'POST',
        data: {
          productId,
          quantity,
        },
      });

      if (quantity === 0) {
        await axios({
          url: `/cart/${productId}`,
          method: 'DELETE',
        });
      }

      dispatch(decreaseProductCounts({ id: productId }));
      toast.error('Товар удален из корзины');
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      {!quantity && <Button size="xl" onClick={addToCartHandler}>В корзину</Button> }
      {quantity !== undefined && quantity > 0 && (
        <div className="flex items-center w-fit border p-1.5 rounded-[10px]">
          <Button size="xs" onClick={removeFromCartHandler}>-</Button>
          <span className="mx-4">
            {quantity}
          </span>
          <Button size="xs" onClick={addToCartHandler}>+</Button>
        </div>
      )}
    </>
  );
}
