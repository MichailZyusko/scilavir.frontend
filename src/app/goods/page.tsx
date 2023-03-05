'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';

export default function GoodsPage() {
  const [goods, setGoods] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get<{ goods: any[] }>('/goods');

      setGoods(data.goods);
    })();
  }, []);

  return (
    <main>
      {goods.map((good: any) => (<div>{good.name}</div>))}
    </main>
  );
}
