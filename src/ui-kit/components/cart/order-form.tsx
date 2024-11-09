import { FieldValues, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

type TProps = {
  onSubmitHandler: (data: FieldValues) => Promise<void>;
};

// !TODO: split into multiple components
export default function OrderForm({ onSubmitHandler }: TProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Получаем значения из формы
  const deliveryType = watch('deliveryType');
  const buyerType = watch('buyerType');
  const paymentType = watch('paymentType');

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="p-8 space-y-12 max-w-full w-full mx-auto bg-white shadow-lg rounded-lg"
    >
      {/* 1 / 3 Способ доставки */}
      <div className="space-y-4">
        <div className="text-lg font-bold mb-4 text-gray-700">1 / 3</div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Способ доставки
        </h2>
        <div className="grid grid-cols-2 gap-6 mt-4">
          {[
            { value: 'physical', label: 'Физ. лицо' },
            { value: 'legal', label: 'Юр. лицо' },
          ].map(({ value, label }) => (
            <label
              htmlFor="buyerType"
              key={value}
              className={`flex items-center justify-center border-2 rounded-lg p-4 cursor-pointer transition-all transform hover:scale-105 ${
                buyerType === value
                  ? 'bg-black text-white border-black shadow-md'
                  : 'bg-white border-cccccc'
              } hover:border-black hover:shadow-lg`}
            >
              <input
                type="radio"
                value={value}
                {...register('buyerType', {
                  required: 'Выберите тип покупателя',
                })}
                className="hidden"
              />
              <span className="text-lg font-medium text-gray-700">{label}</span>
            </label>
          ))}
        </div>
        <ErrorMessage
          errors={errors}
          name="buyerType"
          render={({ message }) => (
            <p className="text-red-500 mt-2">{message}</p>
          )}
        />

        <div className="grid grid-cols-3 gap-6 mt-4">
          {[
            { value: 'post', label: 'Почта' },
            { value: 'pickup', label: 'Самовывоз' },
            { value: 'courier', label: 'Курьер' },
          ].map(({ value, label }) => (
            <label
              htmlFor="deliveryType"
              key={value}
              className={`flex items-center justify-center border-2 rounded-lg p-4 cursor-pointer transition-all transform hover:scale-105 ${
                deliveryType === value
                  ? 'bg-black text-white border-black shadow-md'
                  : 'bg-white border-cccccc'
              } hover:border-black hover:shadow-lg`}
            >
              <input
                type="radio"
                value={value}
                {...register('deliveryType', {
                  required: 'Выберите тип доставки',
                })}
                className="hidden"
              />
              <span className="text-lg font-medium text-gray-700">{label}</span>
            </label>
          ))}
        </div>
        <ErrorMessage
          errors={errors}
          name="deliveryType"
          render={({ message }) => (
            <p className="text-red-500 mt-2">{message}</p>
          )}
        />

        {deliveryType === 'post' && (
          <div className="mt-6">
            <h4 className="text-lg font-medium text-gray-800 mb-2">
              Почтовая компания
            </h4>
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: 'belpochta', label: 'Белпочта' },
                { value: 'europochta', label: 'Европочта' },
              ].map(({ value, label }) => (
                <label
                  htmlFor="postCompany"
                  key={value}
                  className={`flex items-center justify-center border-2 rounded-lg p-4 cursor-pointer transition-all transform hover:scale-105 ${
                    watch('postCompany') === value
                      ? 'bg-black text-white border-black shadow-md'
                      : 'bg-white border-cccccc'
                  } hover:border-black hover:shadow-lg`}
                >
                  <input
                    type="radio"
                    value={value}
                    {...register('postCompany', {
                      required: 'Выберите почтовую компанию',
                    })}
                    className="hidden"
                  />
                  <span className="text-lg font-medium text-gray-700">
                    {label}
                  </span>
                </label>
              ))}
            </div>
            <ErrorMessage
              errors={errors}
              name="postCompany"
              render={({ message }) => (
                <p className="text-red-500 mt-2">{message}</p>
              )}
            />
          </div>
        )}

        {deliveryType === 'pickup' && (
          <div className="mt-6">
            <span className="text-lg font-medium text-gray-700">
              Адрес: г. Лида, ул. Кирова, 29
            </span>
          </div>
        )}

        {deliveryType === 'courier' && (
          <div className="mt-6">
            <span className="text-lg font-medium text-gray-700">
              Минимальный заказ: 350 BYN
            </span>
          </div>
        )}

        {deliveryType !== 'pickup' && (
          <div className="mt-6">
            <input
              type="text"
              placeholder="Адрес"
              {...register('address', { required: 'Введите адрес' })}
              className="w-full border border-cccccc rounded-lg px-4 py-3 focus:outline-none focus:border-black focus:ring-2 focus:ring-black transition shadow-sm hover:shadow-md"
            />
            <ErrorMessage
              errors={errors}
              name="address"
              render={({ message }) => (
                <p className="text-red-500 mt-2">{message}</p>
              )}
            />
          </div>
        )}
      </div>

      {/* 2 / 3 Получатель */}
      <div className="space-y-4">
        <div className="text-lg font-bold mb-4 text-gray-700">2 / 3</div>
        <h2 className="text-2xl font-semibold text-gray-800">Получатель</h2>

        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Имя"
            {...register('firstName', { required: 'Введите имя' })}
            className="w-full border border-cccccc rounded-lg px-4 py-3 focus:outline-none focus:border-black focus:ring-2 focus:ring-black transition shadow-sm hover:shadow-md"
          />
          <ErrorMessage
            errors={errors}
            name="firstName"
            render={({ message }) => (
              <p className="text-red-500 mt-2">{message}</p>
            )}
          />

          <input
            type="text"
            placeholder="Фамилия"
            {...register('lastName', { required: 'Введите фамилию' })}
            className="w-full border border-cccccc rounded-lg px-4 py-3 focus:outline-none focus:border-black focus:ring-2 focus:ring-black transition shadow-sm hover:shadow-md"
          />
          <ErrorMessage
            errors={errors}
            name="lastName"
            render={({ message }) => (
              <p className="text-red-500 mt-2">{message}</p>
            )}
          />

          <input
            type="text"
            placeholder="Отчество"
            {...register('middleName')}
            className="w-full border border-cccccc rounded-lg px-4 py-3 focus:outline-none focus:border-black focus:ring-2 focus:ring-black transition shadow-sm hover:shadow-md"
          />

          <input
            type="email"
            placeholder="E-mail"
            {...register('email', { required: 'Введите e-mail' })}
            className="w-full border border-cccccc rounded-lg px-4 py-3 focus:outline-none focus:border-black focus:ring-2 focus:ring-black transition shadow-sm hover:shadow-md"
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => (
              <p className="text-red-500 mt-2">{message}</p>
            )}
          />

          <input
            type="tel"
            placeholder="Телефон"
            {...register('phone', { required: 'Введите телефон' })}
            className="w-full border border-cccccc rounded-lg px-4 py-3 focus:outline-none focus:border-black focus:ring-2 focus:ring-black transition shadow-sm hover:shadow-md"
          />
          <ErrorMessage
            errors={errors}
            name="phone"
            render={({ message }) => (
              <p className="text-red-500 mt-2">{message}</p>
            )}
          />
        </div>
      </div>

      {/* 3 / 3 Оплата */}
      <div className="space-y-4">
        <div className="text-lg font-bold mb-4 text-gray-700">3 / 3</div>
        <h2 className="text-2xl font-semibold text-gray-800">Оплата</h2>
        <div className="grid grid-cols-3 gap-6 mt-4">
          {[
            { value: 'cash', label: 'Наличные' },
            { value: 'card', label: 'Карта' },
            { value: 'account', label: 'Расчетный счет' },
          ].map(({ value, label }) => (
            <label
              key={value}
              htmlFor="paymentType"
              className={`flex items-center justify-center border-2 rounded-lg p-4 cursor-pointer transition-all transform hover:scale-105 ${
                paymentType === value
                  ? 'bg-black text-white border-black shadow-md'
                  : 'bg-white border-cccccc'
              } hover:border-black hover:shadow-lg`}
            >
              <input
                type="radio"
                value={value}
                {...register('paymentType', {
                  required: 'Выберите тип оплаты',
                })}
                className="hidden"
              />
              <span className="text-lg font-medium text-gray-700">{label}</span>
            </label>
          ))}
        </div>
        <ErrorMessage
          errors={errors}
          name="paymentType"
          render={({ message }) => (
            <p className="text-red-500 mt-2">{message}</p>
          )}
        />
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-black text-white py-4 px-8 text-2xl font-semibold rounded-lg transition hover:bg-gray-800 transform hover:scale-105 hover:shadow-lg"
        >
          Оформить заказ
        </button>
      </div>
    </form>
  );
}
