/* eslint-disable max-len */

'use client';

import { useEffect, useState } from 'react';
import axios from '@/api/axios';
import { Loader } from '@/ui-kit/spinners';
import { TCategory, TGroup } from '@/types';
import { CatalogueItem } from './cotalogue-item';

type TState = {
  categories: TCategory[] | [];
  groups: TGroup[] | [];
  isLoading: boolean;
};

export function Catalogue() {
  const [state, setState] = useState<TState>({
    categories: [],
    groups: [],
    isLoading: true,
  });

  useEffect(() => {
    (async () => {
      const [{ data: categories }, { data: groups }] = await Promise.all([
        axios.get<TCategory[]>('/categories/roots'),
        axios.get<TGroup[]>('/groups'),
      ]);

      setState({
        categories,
        groups,
        isLoading: false,
      });
    })();
  }, []);

  if (state.isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="mb-9">
        <h1 className="text-center text-4xl font-semibold mb-2.5">Подборки</h1>
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

      <div className="mb-32">
        <h1 className="text-center text-4xl font-semibold mb-2.5">Категории</h1>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1f',
          gap: '10px 10px',
          gridTemplateAreas: `
          "div1 div2"
          "div3 div2"
          "div4 div5"
          "div4 div6"
          "div7 div7"
          "div8 div9"
          "div10 div9"
        `,
        }}
        >
          {state.categories.map((category) => <CatalogueItem item={category} type="category" key={category.id} />)}
        </div>
      </div>
    </>
  );
}
