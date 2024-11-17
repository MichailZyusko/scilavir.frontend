'use client';

import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

// !TODO: Replace with real data
export function Maps() {
  return (
    <section className="flex items-center justify-around mt-10">
      <div>
        <pre>
          Name: Мир Бумаги
          Address: ул. Кирова, 6
          Phone: +375 29 123 45 67
          Email: jhone.duo@gmail.com
        </pre>
      </div>
      <YMaps>
        <Map
          defaultState={{ center: [53.893324, 25.292552], zoom: 16 }}
          width="500px"
          height="500px"
          modules={['geoObject.addon.hint']}
        >
          <Placemark
            geometry={[53.893324, 25.292552]}
            properties={{
              iconLayout: 'default#image',
              // !TODO: add noraml icon
              // iconImageHref: Pointer,
              iconImageSize: [24, 24],
              iconImageOffset: [-12, -12],
            }}
          />
        </Map>
      </YMaps>
    </section>
  );
}
