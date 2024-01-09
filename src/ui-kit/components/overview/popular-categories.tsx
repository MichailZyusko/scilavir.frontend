'use client';

import { TGroup } from '@/types';
import { useState, useEffect } from 'react';
import axios from '@/api/axios';
import { Loader } from '@/ui-kit/spinners';
import { CatalogueItem } from '../catalogue/cotalogue-item';

type TState = {
  groups: TGroup[] | [];
  isLoading: boolean;
};

export function PopularGroups() {
  const [state, setState] = useState<TState>({
    groups: [],
    isLoading: true,
  });

  useEffect(() => {
    (async () => {
      const { data: groups } = await axios.get<TGroup[]>('/groups');

      setState({
        groups,
        isLoading: false,
      });
    })();
  }, []);

  if (state.isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="mt-16 mb-8 text-3xl font-semibold">Популярные подборки</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr 1fr',
        gap: '10px 10px',
        gridTemplateAreas: `
          "div1 div2"
          "div1 div3"
          "div4 div4"
        `,
      }}
      >
        {state.groups.map((group) => <CatalogueItem item={group} type="group" key={group.id} />)}
      </div>
    </div>
    </div>
  );
}
