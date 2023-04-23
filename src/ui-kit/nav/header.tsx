'use client';

import { Navbar, Dropdown } from 'flowbite-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export function Header() {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  if (!domLoaded) return null;

  return (
    <header className="px-44 py-20">
      <div className="flex justify-between">
        <div>
          <Image src="/images/search.svg" width={24} height={24} alt="logo" />
        </div>
        <div className="flex">
          <Link href="favorite">
            <Image src="/images/favorite.svg" width={24} height={24} alt="logo" />
          </Link>
          <Image src="/images/profile.svg" width={24} height={24} alt="logo" className="mx-2.5" />
          <Image src="/images/cart.svg" width={24} height={24} alt="logo" />
        </div>
      </div>
      <div className="flex items-center justify-center mb-2.5">
        <Link href="/">
          <Image src="/images/logo.svg" width={250} height={125} alt="logo" priority />
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <Navbar>
          <Navbar.Collapse>
            <Dropdown
              arrowIcon
              inline
              label={<div>Каталог</div>}
            >
              <Dropdown.Item>
                <Link href="/navbars">
                  Для офиса
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href="/navbars">
                  Для школы
                </Link>
              </Dropdown.Item>
              <div className="mx-2.5 border-t-2 border-black" />
              <Dropdown.Item>
                <Link href="/catalogue">
                  Все товары
                </Link>
              </Dropdown.Item>
            </Dropdown>
            <Navbar.Link href="/#about-us">
              О нас
            </Navbar.Link>
            <Link href="/delivery-and-payment">
              Доставка и оплата
            </Link>
            <Link href="/#contacts">
              Контакты
            </Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
}
