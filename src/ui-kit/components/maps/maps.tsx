'use client';

import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

// !TODO: Replace with real data
export function Maps() {
  return (
    <section className="container mx-auto px-4 flex items-center justify-between mt-10">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
        <div
          className="h-32 flex items-center justify-center rounded-t-lg text-white text-3xl font-bold"
          style={{
            backgroundImage: 'url(/images/for-info-background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          Мир Бумаги
        </div>
        <div className="p-6 space-y-4 text-gray-700">
          <div>
            <span className="font-semibold text-gray-900">Address:</span>
            {' '}
            ул. Кирова, 29
          </div>
          <div>
            <span className="font-semibold text-gray-900">Phone:</span>
            {' '}
            <a href="tel:+375291234567" className="text-blue-600 hover:underline">
              +375 29 123 45 67
            </a>
          </div>
          <div>
            <span className="font-semibold text-gray-900">Email:</span>
            {' '}
            <a href="mailto:mir.bumagi@mail.ru" className="text-blue-600 hover:underline">
              mir.bumagi@mail.ru
            </a>
          </div>
        </div>
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
