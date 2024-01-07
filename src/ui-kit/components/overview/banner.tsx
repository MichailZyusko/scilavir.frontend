import Link from 'next/link';

export function Banner() {
  return (
    <div className="bg-banner bg-[#3B1D01] bg-opacity-50 bg-blend-multiply">
      <div className="container mx-auto h-80 flex justify-around items-center">
        <p className="text-4xl text-white font-light">
          <i className=" font-light">Наша</i>
        &nbsp;
          <strong>
            компания -
            <br />
            ваши будущие
          </strong>
          <br />
          <i>принадлежности</i>
        </p>

        <div>
          <p className="text-lg text-white leading-8 font-normal">Канцелярские товары оптом</p>
          <p className="text-lg text-white leading-8 font-normal mb-4">Быстро и надежно</p>
          <Link className=" bg-amber-300 px-4 py-2 font-medium leading-10" href="/catalogue">
            Перейти в каталог
          </Link>
        </div>
      </div>
    </div>
  );
}
