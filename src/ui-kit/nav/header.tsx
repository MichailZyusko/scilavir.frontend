/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import { Navbar } from 'flowbite-react';
import Link from 'next/link';
import Image from 'next/image';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { useForm, FormProvider } from 'react-hook-form';
import { useRef, useState } from 'react';
import { TProduct } from '@/types';
import { useFocusElement } from '@/hooks/useFocusElement';
import { SearchInput } from '../inputs';
import { ProductHorizontal } from '../components/products/product-horizontal';

export function Header() {
  const hookFormMethods = useForm();
  const [products, setProducts] = useState<TProduct[]>([]);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const [isSearchListFocused, setIsSearchListFocused] = useFocusElement(ref);

  return (
    <header className="w-full mt-10">
      <FormProvider {...hookFormMethods}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between">
            <div>
              <SearchInput
                setIsModalOpened={setIsModalOpened}
                setProducts={setProducts}
                isSearchListFocused={isSearchListFocused}
              />
            </div>
            <div className="flex items-center gap-2.5">
              <Link href="/favorite">
                <Image src="/images/favorite.svg" width={24} height={24} alt="favorite" />
              </Link>
              <Link href="/orders">
                <Image src="/images/orders.svg" width={24} height={24} alt="orders" />
              </Link>
              <Link href="/sign-in">
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
                <SignedOut>
                  <Image src="/images/profile.svg" width={24} height={24} alt="logo" />
                </SignedOut>
              </Link>
              <Link href="/cart">
                <Image src="/images/cart.svg" width={24} height={24} alt="cart" />
              </Link>
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
                <Navbar.Link href="/catalogue">
                  КАТАЛОГ
                </Navbar.Link>
                <Navbar.Link href="/#about-us">
                  О НАС
                </Navbar.Link>
                <Link href="/delivery-and-payment">
                  ДОСТАВКА И ОПЛАТА
                </Link>
                <Link href="/#contacts">
                  КОНТАКТЫ
                </Link>
              </Navbar.Collapse>
            </Navbar>
          </div>
        </div>
      </FormProvider>
      {isModalOpened && (
        <div className="flex flex-col">
          <div className="fixed w-screen h-screen z-[1] bg-zinc-400/75" />
          <div
            className="w-full flex items-center flex-col overflow-y-auto min-h-[350px] max-h-[350px] border-b-2 z-10 relative order-1 bg-white"
            ref={ref}
            onMouseEnter={() => {
              setIsSearchListFocused(true);
            }}
          >
            {products.length === 0
              ? (<div>По вашему запросу ничего не найдено</div>)
              : (
                products.map(({ id: productId, ...productWithOutId }) => (
                  <div
                    className="mb-4 ml-4 w-1/2"
                    onClick={() => {
                      setIsModalOpened(false);
                      setIsSearchListFocused(false);
                      setProducts([]);
                    }}
                  >
                    <ProductHorizontal
                      key={productId}
                      id={productId}
                      {...productWithOutId}
                    />
                  </div>
                ))
              )}
          </div>
        </div>

      )}
    </header>
  );
}
