import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@/redux/hooks';
import {
  decreaseProductCounts,
  increaseProductCounts,
  selectCart,
  setProductsCount,
} from '@/app/cart/cart.slice';
import { useSelector } from 'react-redux';
import { Button } from '.';

type TProps = {
  productId: string;
};
export function AddToCartButton({ productId }: TProps) {
  const { cart } = useSelector(selectCart);
  const dispatch = useAppDispatch();

  const quantity = cart[productId];

  useEffect(() => {
    if (quantity) {
      dispatch(
        setProductsCount({
          id: productId,
          quantity,
        }),
      );
    }

    // !TODO: uncomment when we will support storing cart state on backend
    // (async () => {
    //   await updateClerkToken();

    //   // If user is not signed in, that means we store cart in local storage only
    //   if (!isSignedIn) return;

    //   if (quantity === 0) {
    //     await axios({
    //       url: `/cart/${productId}`,
    //       method: 'DELETE',
    //     });
    //     return;
    //   }

    //   if (!quantity) return;

    //   await axios({
    //     url: '/cart',
    //     method: 'POST',
    //     data: {
    //       productId,
    //       quantity,
    //     },
    //   });
    // })();
  }, [quantity, productId]);

  const addToCartHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(increaseProductCounts({ id: productId }));
    toast.success('Товар добавлен в корзину');
  };

  const removeFromCartHandler = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    dispatch(decreaseProductCounts({ id: productId }));
    toast.error('Товар удален из корзины');
  };

  return (
    <>
      {!quantity && (
        <Button size="xl" onClick={addToCartHandler}>
          В корзину
        </Button>
      )}
      {quantity !== undefined && quantity > 0 && (
        <div className="flex items-center w-fit border p-1.5 rounded-[10px] ml-auto mr-auto">
          <Button size="xs" onClick={removeFromCartHandler}>
            -
          </Button>
          <span className="mx-4">{quantity}</span>
          <Button size="xs" onClick={addToCartHandler}>
            +
          </Button>
        </div>
      )}
    </>
  );
}
