/* eslint-disable max-len */
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full px-15 bg-black">
      <div className="container mx-auto px-4 pt-20 pb-10">
        <ul className="text-white font-semibold text-2xl flex justify-between mb-24">
          <li>
            <Link href="/">
              <p className="block mb-6">каталог</p>
            </Link>
            <Link href="/">
              <p className="block mb-6">о&nbsp;нас</p>
            </Link>
            <Link href="/">
              <p>доставка и оплата</p>
            </Link>
          </li>
          <li>
            <Link href="/">
              <p className="block mb-6">избранное</p>
            </Link>
            <Link href="/">
              <p className="block mb-6">корзина</p>
            </Link>
            <Link href="/">
              <p>личный кабинет</p>
            </Link>
          </li>
          <li className="flex flex-col">
            <div className="mb-auto">
              <span className="text-white ">
                <a href="tel:+375293454545">+375 (29) 345-45-45</a>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <a href="https://t.me/agvento-test">
                <Image src="/images/telegram.svg" width={50} height={50} alt="telegram" />
              </a>
              <a href="viber://add?number=%2B375293454545">
                <Image src="/images/viber.svg" width={50} height={50} alt="viber" />
              </a>
              <a href="mailto:mail@example.com">
                <Image src="/images/gmail.svg" width={50} height={50} alt="gmail" />
              </a>
            </div>
          </li>
        </ul>
        <div className="flex gap-9 justify-center mb-20">
          <Image src="/images/visa.svg" width={82} height={27} alt="visa" />
          <Image src="/images/mastercard.svg" width={86} height={52} alt="mastercard" />
          <Image src="/images/apple-pay.svg" width={128} height={52} alt="apple-pay" />
          <Image src="/images/samsung-pay.svg" width={101} height={46} alt="samsung-pay" />
        </div>
        <div className="mb-10 flex gap-24 justify-center font-semibold text-2xl text-white">
          <p>
            Политика конфиденциальности
          </p>
          <p>
            Пользовательское соглашение
          </p>
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
