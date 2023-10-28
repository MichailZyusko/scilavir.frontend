/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import Image from 'next/image';
import { Carousel, FlowbiteCarouselTheme } from 'flowbite-react';
import { useEffect, useState } from 'react';
import axios from '@/api/axios';
import { useClerkToken } from '@/context/auth';
import { FeedbackCreationModal } from './modal';

export type TFeedbackItem = {
  id: string;
  title: string;
  description: string;
  author: string;
  rating: number;
  createdAt: string;
};

const theme: FlowbiteCarouselTheme = {
  root: {
    base: 'flex relative h-full w-full',
    leftControl: 'absolute top-0 -left-16 flex h-full items-center justify-center px-4 focus:outline-none',
    rightControl: 'absolute top-0 -right-16 flex h-full items-center justify-center px-4 focus:outline-none',
  },
  indicators: {
    active: {
      off: 'bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800',
      on: 'bg-white dark:bg-gray-800',
    },
    base: 'h-3 w-3 rounded-full',
    wrapper: 'absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3',
  },
  item: {
    base: 'absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2',
    wrapper: 'w-full flex-shrink-0 transform cursor-grab snap-center',
  },
  control: {
    base: 'inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10',
    icon: 'h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6',
  },
  scrollContainer: {
    base: 'flex h-full w-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg',
    snap: 'snap-x',
  },
};

function FeedbackItem({
  description, title, createdAt, rating,
}: Omit<TFeedbackItem, 'id'>) {
  return (
    <article className="flex flex-col w-full rounded-md">
      <div className="bg-zinc-300 w-full self-stretch flex-grow flex-col pt-5 pb-10 px-5 max-md:max-w-full">
        <div className="flex  items-start justify-between  max-md:flex-wrap">
          <span className="flex justify-start">
            {new Array(rating).fill(0).map(() => (
              <Image
                loading="lazy"
                src="/images/star.svg"
                alt="rating"
                className="object-cover object-center"
                width={24}
                height={24}
              />
            ))}
          </span>
          <time className="overflow-hidden text-black text-ellipsis text-base leading-[125%]">
            {new Intl.DateTimeFormat().format(new Date(createdAt))}
          </time>
        </div>
        <h2 className="text-black text-xl font-semibold leading-[150%]">
          {title}
        </h2>
        <p className="overflow-hidden text-black text-ellipsis whitespace-nowrap text-base leading-[125%] max-w-[500px] max-md:max-w-full">
          {description}
        </p>
      </div>
    </article>
  );
}

type TFeedbackProps = {
  productId: string;
};
export function Feedbacks({ productId }: TFeedbackProps) {
  const [
    isFeedbackCreationModalOpen,
    setIsFeedbackCreationModalOpen,
  ] = useState<'dismissible' | undefined>();
  const [feedbacks, setFeedbacks] = useState<TFeedbackItem[]>([]);
  const { updateClerkToken } = useClerkToken();

  const leaveFeedback = () => {
    setIsFeedbackCreationModalOpen('dismissible');
  };

  useEffect(() => {
    (async () => {
      await updateClerkToken();
      const { data } = await axios.get(`/feedbacks/products/${productId}`);
      setFeedbacks(data);
    })();
  }, [productId, isFeedbackCreationModalOpen]);

  return (
    <div className="flex items-center justify-center my-16 w-full">
      {feedbacks.length
        ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <Carousel
              indicators
              theme={theme}
              leftControl={(
                <Image
                  src="/images/arrow-left.svg"
                  alt="arrow-left"
                  className="object-cover object-center"
                  width={24}
                  height={24}
                />
            )}
              rightControl={(
                <Image
                  src="/images/arrow-right.svg"
                  alt="arrow-right"
                  className="object-cover object-center"
                  width={24}
                  height={24}
                />
            )}
              className="h-fit rounded-lg"
            >
              {feedbacks.map(({ id, ...feedback }) => <FeedbackItem key={id} {...feedback} />)}
            </Carousel>
            <div className="flex flex-col justify-center items-center">
              <h2>Товар не соответсвует заявленным качествам?</h2>
              <p>
                Пожалуйста,
                {' '}
                <span
                  className="underline text-blue-700 cursor-pointer"
                  onClick={leaveFeedback}
                >
                  оставьте свой отзыв
                </span>
              </p>
            </div>
          </div>
        )
        : (
          <div className="flex flex-col justify-center items-center">
            <h2>Для данного товара отзывы остутствуют</h2>
            <p>
              Пожалуйста,
              {' '}
              <span
                className="underline text-blue-700 cursor-pointer"
                onClick={leaveFeedback}
              >
                оставьте отзыв
              </span>
            </p>
          </div>
        )}

      <FeedbackCreationModal
        isOpened={isFeedbackCreationModalOpen}
        setIsOpened={setIsFeedbackCreationModalOpen}
        productId={productId}
      />
    </div>
  );
}
