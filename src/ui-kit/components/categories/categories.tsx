import Link from 'next/link';
import { Button } from '../../buttons';

export function Categories() {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex flex-col w-[calc(50%+1.5rem)]">
          <Link className="w-full h-80 bg-gray flex flex-col justify-between p-8" href="/products">
            <div>
              <h3 className="text-xl font-semibold">Бумага</h3>
              <p>Текст</p>
            </div>

            <div>
              <p>Начиная от 1 BYN</p>
              <Button>Купить сейчас</Button>
            </div>
          </Link>

          <div className="border-white border-t-[1.5rem] w-full" />

          <Link className="w-full h-80 bg-gray flex flex-col justify-between p-8" href="/products">
            <div>
              <h3 className="text-xl font-semibold">Ежедневники и блокноты</h3>
              <p>Текст</p>
            </div>

            <div>
              <p>Начиная от 1 BYN</p>
              <Button>Купить сейчас</Button>
            </div>
          </Link>
        </div>

        <div className="border-white border-l-[1.5rem]" />

        <Link className="w-[calc(50%-1.5rem)] h-160 bg-gray flex flex-col justify-between p-8" href="/products">
          <div>
            <h3 className="text-xl font-semibold">Пишущие пренадлежности</h3>
            <p>Текст</p>
          </div>

          <div>
            <p>Начиная от 1 BYN</p>
            <Button>Купить сейчас</Button>
          </div>
        </Link>
      </div>

      <div className="border-white border-t-[1.5rem] w-full" />

      <div className="flex justify-between">
        <Link className="w-[calc(50%-1.5rem)] h-160 bg-gray flex flex-col justify-between p-8" href="/products">
          <div>
            <h3 className="text-xl font-semibold">Канцелярские инструменты</h3>
            <p>Текст</p>
          </div>

          <div>
            <p>Начиная от 1 BYN</p>
            <Button>Купить сейчас</Button>
          </div>
        </Link>

        <div className="border-white border-l-[1.5rem]" />

        <div className="flex flex-col w-[calc(50%+20px)]">
          <Link className="w-full h-80 bg-gray flex flex-col justify-between p-8" href="/products">
            <div>
              <h3 className="text-xl font-semibold">Тетради</h3>
              <p>Текст</p>
            </div>

            <div>
              <p>Начиная от 1 BYN</p>
              <Button>Купить сейчас</Button>
            </div>
          </Link>

          <div className="border-white border-t-[1.5rem] w-full" />

          <Link className="w-full h-80 bg-gray flex flex-col justify-between p-8" href="/products">
            <div>
              <h3 className="text-xl font-semibold">Органайзеры</h3>
              <p>Текст</p>
            </div>

            <div>
              <p>Начиная от 1 BYN</p>
              <Button>Купить сейчас</Button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
