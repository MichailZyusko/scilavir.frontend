import { Button } from '../../buttons';

export function PopularCategories() {
  return (
    <div className="container mx-auto">
      <h2 className="mt-16 mb-8 text-3xl font-semibold">Популярные категории</h2>
      <div className="flex justify-between">
        <div className="flex flex-col w-1/2">
          <div className="w-full h-80 bg-gray flex flex-col justify-between p-8">
            <div>
              <h3 className="text-xl font-semibold">Текст</h3>
              <p>Текст</p>
            </div>

            <div>
              <p>Начиная от 1 BYN</p>
              <Button>Купить сейчас</Button>
            </div>
          </div>
          <div className="border-white border-t-[20px] w-full" />
          <div className="w-full h-80 bg-gray flex flex-col justify-between p-8">
            <div>
              <h3 className="text-xl font-semibold">Текст</h3>
              <p>Текст</p>
            </div>

            <div>
              <p>Начиная от 1 BYN</p>
              <Button>Купить сейчас</Button>
            </div>
          </div>
        </div>
        <div className="border-white border-l-[20px]" />

        <div className="w-1/2 h-160 bg-gray flex flex-col justify-between p-8">
          <div>
            <h3 className="text-xl font-semibold">Текст</h3>
            <p>Текст</p>
          </div>

          <div>
            <p>Начиная от 1 BYN</p>
            <Button>Купить сейчас</Button>
          </div>
        </div>

      </div>
    </div>
  );
}
