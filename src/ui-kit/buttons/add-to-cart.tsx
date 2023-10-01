import axios from '@/api/axios';
import { useEffect } from 'react';
import { useClerkToken } from '@/context/auth';
import { Button } from '.';

type TProps = {
  productId: string;
  quantity: number;
  setQuantity: (quantity: number) => void;
};
export function AddToCartButton({ productId, quantity = 0, setQuantity }: TProps) {
  const { updateClerkToken } = useClerkToken();

  useEffect(() => {
    (async () => {
      await updateClerkToken();

      if (!quantity) {
        await axios({
          url: `/cart/${productId}`,
          method: 'DELETE',
        });
        return;
      }

      await axios({
        url: '/cart',
        method: 'POST',
        data: {
          productId,
          quantity,
        },
      });
    })();
  }, [quantity, productId]);

  const addToCartHandler = async () => {
    setQuantity(quantity + 1);
  };

  const removeFromCartHandler = async () => {
    setQuantity(quantity - 1);
  };

  return (
    <>
      {quantity === 0 && <Button size="xl" onClick={addToCartHandler}>В корзину</Button> }
      {quantity > 0 && (
        <div className="flex items-center border p-1.5 rounded-[10px]">
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
