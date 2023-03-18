'use client';

import { Navbar, Dropdown } from 'flowbite-react';
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
          <Image src="/images/like.svg" width={24} height={24} alt="logo" />
          <Image src="/images/profile.svg" width={24} height={24} alt="logo" className="mx-2.5" />
          <Image src="/images/cart.svg" width={24} height={24} alt="logo" />
        </div>
      </div>
      <div className="flex items-center justify-center mb-2.5">
        <Image src="/images/logo.svg" width={250} height={125} alt="logo" priority />
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
                <Navbar.Link href="/navbars">
                  Для офиса
                </Navbar.Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Navbar.Link href="/navbars">
                  Для школы
                </Navbar.Link>
              </Dropdown.Item>
              <div className="mx-2.5 border-t-2 border-black" />
              <Dropdown.Item>
                <Navbar.Link href="/navbars">
                  Все товары
                </Navbar.Link>
              </Dropdown.Item>
            </Dropdown>
            <Navbar.Link href="/#about-us">
              О нас
            </Navbar.Link>
            <Navbar.Link href="/navbars">
              Доставка и оплата
            </Navbar.Link>
            <Navbar.Link href="/navbars">
              Контакты
            </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
}
