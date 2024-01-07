/* eslint-disable max-len */

'use client';

import { Flowbite, Accordion, CustomFlowbiteTheme } from 'flowbite-react';

const theme: CustomFlowbiteTheme = {
  accordion: {
    root: {
      base: 'divide-y divide-gray-200 border-gray-200',
      flush: {
        off: 'rounded-lg border',
        on: 'border-b',
      },
    },
    content: {
      base: 'px-10 py-5 last:rounded-b-lg first:rounded-t-lg bg-black text-white',
    },
    title: {
      arrow: {
        base: 'h-8 w-8 ml-4 shrink-0',
        open: {
          off: '',
          on: 'rotate-180',
        },
      },
      base: 'bg-black flex w-full items-center justify-between first:rounded-t-lg last:rounded-b-lg py-5 px-5 text-left font-medium text-white',
      flush: {
        off: 'hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:hover:bg-gray-800 dark:focus:ring-gray-800',
        on: 'bg-transparent dark:bg-transparent',
      },
      heading: 'flex w-full flex-row items-center justify-between',
      open: {
        off: '',
        on: 'bg-black text-white',
      },
    },
  },
};

export function FAQ() {
  return (
    <>
      <h1 className="text-3xl font-semibold mx-auto my-5">Q&A 一 Ответы на самые частозадаваемые вопросы</h1>
      <div className="w-1/2 self-center">
        <Flowbite theme={{ theme }}>
          <Accordion collapseAll>
            <Accordion.Panel>
              <Accordion.Title>
                <div className="flex-2">
                  <p className="text-xl">
                    /1
                  </p>
                </div>
                <div className="flex-1 ml-10">
                  <p className="text-lg">
                    Каковы условия доставки и оплаты в вашем магазине?
                  </p>
                </div>
              </Accordion.Title>
              <Accordion.Content>
                <p>
                  Мы предлагаем различные варианты доставки и оплаты. Подробности доступны на странице &quot;Доставка и оплата&quot; нашего сайта.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                <div className="flex-2">
                  <p className="text-xl">
                    /2
                  </p>
                </div>
                <div className="flex-1 ml-10">
                  <p className="text-lg">
                    Как происходит возврат или обмен товара, если он не удовлетворяет моим требованиям?
                  </p>
                </div>
              </Accordion.Title>
              <Accordion.Content>
                <p>
                  У нас действует политика возврата и обмена. Если товар не удовлетворяет вашим ожиданиям, обратитесь к разделу &quot;Возврат и обмен&quot; для получения подробной информации о процедуре.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                <div className="flex-2">
                  <p className="text-xl">
                    /3
                  </p>
                </div>
                <div className="flex-1 ml-10">
                  <p className="text-lg">
                    Какие бренды канцелярских товаров вы предлагаете в своем ассортименте?
                  </p>
                </div>
              </Accordion.Title>
              <Accordion.Content>
                <p>
                  В нашем ассортименте представлены канцелярские товары от ведущих брендов, таких как [названия брендов]. Вы можете ознакомиться с полным списком на странице  &quot;Бренды&quot; нашего сайта.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                <div className="flex-2">
                  <p className="text-xl">
                    /4
                  </p>
                </div>
                <div className="flex-1 ml-10">
                  <p className="text-lg">
                    Как связаться с вашей службой поддержки для получения дополнительной информации?
                  </p>
                </div>
              </Accordion.Title>
              <Accordion.Content>
                <p>
                  Если у вас есть вопросы или вам требуется поддержка, свяжитесь с нашей службой поддержки по указанным контактам на странице &quot;Контакты&quot;. Мы готовы помочь вам.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                <div className="flex-2">
                  <p className="text-xl">
                    /5
                  </p>
                </div>
                <div className="flex-1 ml-10">
                  <p className="text-lg">
                    Есть ли у вас программы лояльности или акции для постоянных клиентов?
                  </p>
                </div>
              </Accordion.Title>
              <Accordion.Content>
                <p>
                  У нас есть программы лояльности и акции для постоянных клиентов. Подробности доступны в разделе &quot;Акции и скидки&quot; на сайте. Будем рады видеть вас в числе наших постоянных покупателей!
                </p>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        </Flowbite>
      </div>
    </>
  );
}
