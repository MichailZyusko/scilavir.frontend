/* eslint-disable max-len */

import { Metadata } from 'next';
import Image from 'next/image';

export default function DeliveryAndPaymentPage() {
  return (
    <main className="flex flex-col flex-auto w-full pt-10 pb-10">
      <div className="container mx-auto px-4">
        <h1 className="font-semibold text-3xl text-center mb-8">
          ДОСТАВКА И ОПЛАТА
        </h1>
        <div className="">
          <div className="max-w-3xl mb-8 flex flex-col">
            <p>
              Мы&nbsp;предлагаем удобные условия доставки и&nbsp;оплаты для
              наших клиентов.
            </p>
            <p className="mb-6">
              В&nbsp;нашем интернет-магазине канцелярских товаров вы&nbsp;можете
              выбрать наиболее удобный вариант доставки и&nbsp;оплаты
              в&nbsp;зависимости от&nbsp;вашего статуса&nbsp;&mdash; юридическое
              лицо или физическое лицо.
            </p>
            <div className="flex gap-9">
              <Image src="/images/visa.svg" width={70} height={23} alt="visa" />
              <Image
                src="/images/mastercard.svg"
                width={55}
                height={33}
                alt="mastercard"
              />
              <Image
                src="/images/apple-pay.svg"
                width={109}
                height={45}
                alt="apple-pay"
              />
              <Image
                src="/images/samsung-pay.svg"
                width={78}
                height={35}
                alt="samsung-pay"
              />
            </div>
          </div>
          <div className="mb-10 ml-auto max-w-3xl flex flex-col">
            <h2 className="font-semibold text-xl mb-3">
              Для юридических лиц доступны следующие варианты доставки:
            </h2>
            <ul className="list-decimal list-inside flex flex-col gap-2">
              <li>
                <p>
                  Почта (Белпочта, Европочта)&nbsp;&mdash; доставка
                  осуществляется по&nbsp;всей территории Беларуси. Этот вариант
                  подходит для тех, кто желает получить заказ почтовым
                  отправлением.
                </p>
              </li>
              <li>
                <p>
                  Самовывоз&nbsp;&mdash; вы&nbsp;можете забрать свой заказ
                  самостоятельно по&nbsp;адресу:ул. Кирова&nbsp;29. Удобное
                  время для самовывоза согласовывается заранее с&nbsp;нашими
                  менеджерами.
                </p>
              </li>
              <li>
                <p>
                  Курьерская доставка&nbsp;&mdash; осуществляется в&nbsp;Лидском
                  районе. Наш курьер доставит ваш заказ прямо до&nbsp;двери.
                  Доставка осуществляется, если сумма заказа выше 350&nbsp;р.
                </p>
              </li>
            </ul>
          </div>
          <div className="max-w-3xl mb-10 flex flex-col">
            <h2 className="font-semibold text-xl mb-3">
              Для физических лиц предлагаем следующие варианты доставки:
            </h2>
            <ul className="list-decimal list-inside flex flex-col gap-2">
              <li className="indent-1">
                <p>
                  Почта (Белпочта, Европочта)&nbsp;&mdash; мы&nbsp;осуществляем
                  доставку по&nbsp;всей территории Беларуси. Ваш заказ будет
                  доставлен почтовым отправлением в&nbsp;указанный вами адрес.
                </p>
              </li>
              <li>
                <p>
                  Самовывоз&nbsp;&mdash; вы&nbsp;можете самостоятельно забрать
                  свой заказ по&nbsp;адресу: ул. Кирова&nbsp;29. Для получения
                  заказа вам необходимо согласовать удобное время с&nbsp;нашими
                  менеджерами.
                </p>
              </li>
            </ul>
          </div>
          <div className="max-w-3xl flex flex-col mb-10 ml-auto ">
            <ul className="flex flex-col gap-2">
              <li>
                <p>
                  Также предлагаем услугу наложенного платежа при доставке
                  почтой. Это означает, что вы&nbsp;оплачиваете заказ только при
                  получении его почтовым отправлением.
                </p>
              </li>
              <li>
                <p>
                  Не&nbsp;забывайте, что при заказе на&nbsp;сумму ниже 350
                  рублей доставка курьером не&nbsp;доступна,
                  и&nbsp;вы&nbsp;можете выбрать только самовывоз.
                </p>
              </li>
              <li>
                <p>
                  Мы&nbsp;стремимся обеспечить нашим клиентам удобные условия
                  доставки и&nbsp;оплаты, чтобы вы&nbsp;могли насладиться
                  покупками в&nbsp;нашем интернет-магазине без лишних забот.
                  Если у&nbsp;вас возникли вопросы или вам требуется
                  дополнительная информация, наши менеджеры всегда готовы помочь
                  вам.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Доставка и оплата',
};
