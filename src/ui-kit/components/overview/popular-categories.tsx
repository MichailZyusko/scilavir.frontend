import Image from 'next/image';
import { Button } from '../../buttons';

export function PopularCategories() {
  return (
    <div className="container mx-auto px-4">
      <h2 className="mt-16 mb-8 text-3xl font-semibold">Популярные категории</h2>
      <div className="flex justify-between">
        <div className="flex flex-col w-1/2">
          <div className="w-full h-80 flex flex-col justify-between relative">
            <Image
              src="/images/Frame 68.svg"
              className="h-80 absolute object-cover -z-10"
              alt=""
            />
            <div>
              <h3 className="text-xl font-semibold">Для офиса</h3>
              <p>
                От&nbsp;стильных ручек и&nbsp;элегантных блокнотов
                до&nbsp;функциональных органайзеров
              </p>
            </div>
            <div>
              <p>Начиная от 1 BYN</p>
              <Button>Купить сейчас</Button>
            </div>
          </div>
          <div className="border-white border-t-[20px] w-full" />
          <div className="w-full h-80 flex flex-col justify-between relative">
            <Image src="/images/Frame 69.svg" className="h-80 absolute object-cover -z-10" alt="" />
            <div>
              <h3 className="text-xl font-semibold">Творчество</h3>
              <p>
                От&nbsp;разноцветных маркеров и&nbsp;профессиональных красок
                до&nbsp;творческих блокнотов и&nbsp;художественных инструментов
              </p>
            </div>
            <div>
              <p>Начиная от 1 BYN</p>
              <Button>Купить сейчас</Button>
            </div>
          </div>
        </div>
        <div className="border-white border-l-[20px]" />
        <div className="w-1/2 h-[660px] flex flex-col justify-between relative">
          <Image src="/images/Frame 70.svg" className="h-[660px] absolute object-cover -z-10" alt="" />
          <div>
            <h3 className="text-xl font-semibold">Для школы</h3>
            <p>
              От&nbsp;ярких тетрадей и&nbsp;умных ручек до&nbsp;практичных
              рюкзаков и&nbsp;компактных органайзеров
            </p>
          </div>
          <div>
            <p>Начиная от 1 BYN</p>
            <Button>Купить сейчас</Button>
          </div>
        </div>
      </div>

      <div className="border-white border-l-[20px]" />
      <div className=" w-full h-72 flex flex-col justify-between relative">
        <Image src="/images/Frame 71.svg" className="h-72 absolute object-cover -z-10" alt="" />
        <div>
          <h3 className="text-xl font-semibold">Для печати</h3>
          <p>
            От&nbsp;качественной бумаги и&nbsp;картриджей до&nbsp;эргономичных
            принтеров и&nbsp;аксессуаров для офисной техники
          </p>
        </div>
        <div>
          <p>Начиная от 1 BYN</p>
          <Button>Купить сейчас</Button>
        </div>
      </div>
    </div>
  );
}
