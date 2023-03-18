'use client';

import { YMaps, Map, Placemark } from 'react-yandex-maps';

export function Footer() {
  return (
    <footer className="flex h-[500px] bg-gray justify-between items-center">
      <div>
        Info about mag
      </div>
      <div className="m-10">
        <YMaps>
          <Map
            width={400}
            height={400}
            defaultState={{ center: [53.890585, 25.300206], zoom: 17 }}
          >
            <Placemark geometry={[53.890585, 25.300206]} />
          </Map>
        </YMaps>
      </div>

    </footer>
  );
}
