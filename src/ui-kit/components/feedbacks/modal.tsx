import axios from '@/api/axios';
import { useClerkToken } from '@/context/auth';
import { RatingInput, TextInput } from '@/ui-kit/inputs';
import { Button, FlowbiteModalTheme, Modal } from 'flowbite-react';
import { Dispatch, SetStateAction } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const theme: FlowbiteModalTheme = {
  root: {
    base: 'fixed top-0 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full',
    show: {
      on: 'flex bg-gray-500 ',
      off: 'hidden',
    },
    sizes: {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      '3xl': 'max-w-3xl',
      '4xl': 'max-w-4xl',
      '5xl': 'max-w-5xl',
      '6xl': 'max-w-6xl',
      '7xl': 'max-w-7xl',
    },
    positions: {
      'top-left': 'items-start justify-start',
      'top-center': 'items-start justify-center',
      'top-right': 'items-start justify-end',
      'center-left': 'items-center justify-start',
      center: 'items-center justify-center',
      'center-right': 'items-center justify-end',
      'bottom-right': 'items-end justify-end',
      'bottom-center': 'items-end justify-center',
      'bottom-left': 'items-end justify-start',
    },
  },
  content: {
    base: 'relative h-full w-full p-4 md:h-auto',
    inner: 'relative rounded-lg bg-white shadow dark:bg-gray-700 flex flex-col max-h-[90vh]',
  },
  body: {
    base: 'p-6 flex-1 overflow-auto',
    popup: 'pt-0',
  },
  header: {
    base: 'flex items-start justify-between rounded-t dark:border-gray-600 border-b p-5',
    popup: 'p-2 border-b-0',
    title: 'text-xl font-medium text-gray-900 dark:text-white',
    close: {
      base: 'ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white',
      icon: 'h-5 w-5',
    },
  },
  footer: {
    base: 'flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600',
    popup: 'border-t',
  },
};

type TProps = {
  isOpened: string | undefined;
  setIsOpened: Dispatch<SetStateAction<'dismissible' | undefined>>;
  productId: string;
};

export function FeedbackCreationModal({ isOpened, setIsOpened, productId }: TProps) {
  const { updateClerkToken } = useClerkToken();
  const hookFormMethods = useForm();

  const onSubmit = async (data: FieldValues) => {
    await updateClerkToken();

    await toast.promise(axios.post('/feedbacks', {
      ...data,
      productId,
    }), {
      pending: 'Добавляем отзыв...',
      success: 'Отзыв успешно добавлен',
      error: 'Ошибка при добавлении отзыва',
    });
  };

  return (
    <Modal theme={theme} className="bg-zinc-400/75" dismissible show={isOpened === 'dismissible'} onClose={() => setIsOpened(undefined)}>
      <Modal.Header>Оставьте свой отзыв! Это важно для нас</Modal.Header>
      <Modal.Body>
        <FormProvider {...hookFormMethods}>
          <form onSubmit={hookFormMethods.handleSubmit(onSubmit)}>
            <TextInput
              label="Краткое описание"
              id="title"
              name="title"
              placeholder="Топ за свои деньги"
            />
            <TextInput
              label="Развернутый отзыв"
              id="description"
              name="description"
              placeholder="Покупал ребенку в школу в 1 класс. Прошло 11 лет и пользуемся всей семьей"
            />
            <RatingInput
              label="Рейтиг"
              name="rating"
              id="rating"
            />
          </form>
        </FormProvider>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            onSubmit(hookFormMethods.getValues());
            setIsOpened(undefined);
          }}
        >
          Оставить отзыв
        </Button>
        <Button
          color="gray"
          onClick={() => setIsOpened(undefined)}
        >
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
