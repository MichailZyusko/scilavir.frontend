/* eslint-disable max-len */
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer id="contacts" className="w-full px-15 bg-black">
      <div className="container mx-auto px-4 pt-20 pb-10">
        <ul className="text-white font-semibold text-xl flex justify-around mb-9">
          <li className="flex gap-6">
            <div className="flex flex-col gap-3">
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
          </li>
          <li className="flex gap-6">
            <div className="flex flex-col gap-3">
              <Link href="/favorite">
                <p>избранное</p>
              </Link>
              <Link href="/cart">
                <p>корзина</p>
              </Link>
              <Link href="/sign-in">
                <p>личный кабинет</p>
              </Link>
            </div>
          </li>
          <li className="flex flex-col">
            <div className="mb-auto">
              <span className="text-white ">
                <a href="tel:+375299357710">+8 (0154) 62-99-77</a>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <a href="https://t.me/michailZyusko">
                <Image
                  src="/images/telegram.svg"
                  width={41.67}
                  height={41.67}
                  alt="telegram"
                />
              </a>
              <a href="viber://add?number=%2B375293352180">
                <Image
                  src="/images/viber.svg"
                  width={39.16}
                  height={42.65}
                  alt="viber"
                />
              </a>
              <a href="mailto:mir.bumagi@mail.ru">
                <Image
                  src="/images/gmail.svg"
                  width={41.67}
                  height={33.33}
                  alt="gmail"
                />
              </a>
            </div>
          </li>
        </ul>
        <div className="flex gap-9 justify-center mb-8">
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
        <div className="mb-10 flex gap-24 justify-center font-semibold text-xl text-white">
          <a
            download="политика конфиденциальности.pdf"
            href="scilavir.frontend/public/images/about-us.svg"
          >
            Политика конфиденциальности
          </a>
          <a
            download="пользовательское соглашение.pdf"
            href="scilavir.frontend/public/images/about-us.svg"
          >
            Пользовательское соглашение
          </a>
        </div>
        <div className="text-gray text-center">
          <p>
            ООО &laquo;СКИЛЛАВИР&raquo;, УНП 591386206, Юридический адрес:
            Республика Беларусь, 231300 Гродненская область, г. Лида, ул.
            Кирова, д.&nbsp;29
          </p>
        </div>
      </div>
    </footer>
  );
}
