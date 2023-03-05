'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from '../../api/axios';

export default function GoodsPage() {
  const [goods, setGoods] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/goods');

      setGoods(data);
    })();
  }, []);

  if (goods?.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      {goods.map((good: any) => (
        <>
          <div>
            {good.name}
          </div>
          {good.images.map((image: string) => (
            <Image
              width={100}
              height={100}
              src={image}
              alt="Goods picture"
            />
          ))}

        </>
      ))}
    </main>
  );
}
