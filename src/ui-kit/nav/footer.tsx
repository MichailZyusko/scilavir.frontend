/* eslint-disable max-len */
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full px-15 bg-black">
      <div className="container mx-auto px-4 pt-20 pb-10">
        <ul className="text-white font-semibold text-xl flex justify-between mb-9">
          <li className="flex gap-6">
            <div className="flex flex-col gap-3 mr-36">
            <Link href="/catalogue">
              <p>каталог</p>
            </Link>
            <Link href="/#about-us">
              <p>о&nbsp;нас</p>
            </Link>
            <Link href="/delivery-and-payment">
              <p>доставка и оплата</p>
            </Link>
            </div>
            <div className="flex flex-col gap-3">
            <Link href="/">
              <p>избранное</p>
            </Link>
            <Link href="/">
              <p>корзина</p>
            </Link>
            <Link href="/">
              <p>личный кабинет</p>
            </Link>
            </div>
          </li>
          <li className="flex flex-col mr-72">
            <div className="mb-auto">
              <span className="text-white ">
                <a href="tel:+375293454545">+375 (29) 345-45-45</a>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <a href="https://t.me/agvento-test">
                <Image src="/images/telegram.svg" width={41.67} height={41.67} alt="telegram" />
              </a>
              <a href="viber://add?number=%2B375293454545">
                <Image src="/images/viber.svg" width={39.16} height={42.65} alt="viber" />
              </a>
              <a href="mailto:mail@example.com">
                <Image src="/images/gmail.svg" width={41.67} height={33.33} alt="gmail" />
              </a>
            </div>
          </li>
        </ul>
        <div className="flex gap-9 justify-center mb-8">
          <Image src="/images/visa.svg" width={70} height={23} alt="visa" />
          <Image src="/images/mastercard.svg" width={55} height={33} alt="mastercard" />
          <Image src="/images/apple-pay.svg" width={109} height={45} alt="apple-pay" />
          <Image src="/images/samsung-pay.svg" width={78} height={35} alt="samsung-pay" />
        </div>
        <div className="mb-10 flex gap-24 justify-center font-semibold text-xl text-white">
          <a href="/">
            Политика конфиденциальности
          </a>
          <a href="/">
            Пользовательское соглашение
          </a>
        </div>
        <div className="text-gray text-center">
          <p>
            ООО &laquo;Мир Бумаги&raquo;, УНП 012300021, Юридический адрес: Республика Беларусь, 220004, Республика Беларусь, г. Минск, Победителей, д. 7а., оф.&nbsp;13, 6&nbsp;эт. &middot; Регистрационный номер в&nbsp;Торговом реестре Республики Беларусь: 508044 от&nbsp;21.04.2021
          </p>
        </div>
      </div>
    </footer>
  );
}
