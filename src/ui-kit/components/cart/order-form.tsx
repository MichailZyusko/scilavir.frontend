import { FieldValues, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

type TProps = {
  onSubmitHandler: (data: FieldValues) => Promise<void>;
};
// TODO: split in separate components
export default function OrderForm({ onSubmitHandler }: TProps) {
  const {
    register, handleSubmit, watch, formState: { errors },
  } = useForm();

  const deliveryType = watch('deliveryType');

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="p-8 space-y-8">
      {/* Section 1: Delivery Method */}
      <div>
        <h2 className="text-lg font-bold mb-4">1 / 3 способ доставки</h2>
        {/* Buyer Type */}
        <div className="mb-4">
          <div className="flex space-x-4">
            <label className="flex items-center" htmlFor="buyerType">
              <input
                type="radio"
                value="physical"
                {...register('buyerType', { required: 'Выберите тип покупателя' })}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">физ. лицо</span>
            </label>
            <label className="flex items-center" htmlFor="buyerType">
              <input
                type="radio"
                value="legal"
                {...register('buyerType', { required: 'Выберите тип покупателя' })}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">юр. лицо</span>
            </label>
          </div>
          <ErrorMessage
            errors={errors}
            name="buyerType"
            render={({ message }) => <p className="text-red-500 mt-2">{message}</p>}
          />
        </div>
        {/* Delivery Type */}
        <div className="mb-4">
          <div className="space-y-2">
            <label className="flex items-center" htmlFor="deliveryType">
              <input
                type="radio"
                value="post"
                {...register('deliveryType', { required: 'Выберите тип доставки' })}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">почта ( по всей Беларуси)</span>
            </label>
            <label className="flex items-center" htmlFor="deliveryType">
              <input
                type="radio"
                value="pickup"
                {...register('deliveryType', { required: 'Выберите тип доставки' })}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">самовывоз (г. Лида, ул. Кирова, 2)</span>
            </label>
            <label className="flex items-center" htmlFor="deliveryType">
              <input
                type="radio"
                value="courier"
                {...register('deliveryType', { required: 'Выберите тип доставки' })}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">курьер ( заказ от 350 БУН)</span>
            </label>
          </div>
          <ErrorMessage
            errors={errors}
            name="deliveryType"
            render={({ message }) => <p className="text-red-500 mt-2">{message}</p>}
          />
        </div>
        {/* Post Company */}
        {deliveryType === 'post' && (
          <div className="mb-4">
            <div className="flex space-x-4">
              <label className="flex items-center" htmlFor="postCompany">
                <input
                  type="radio"
                  value="belpochta"
                  {...register('postCompany', { required: 'Выберите почтовую компанию' })}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">белпочта</span>
              </label>
              <label className="flex items-center" htmlFor="postCompany">
                <input
                  type="radio"
                  value="europochta"
                  {...register('postCompany', { required: 'Выберите почтовую компанию' })}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">европочта</span>
              </label>
            </div>
            <ErrorMessage
              errors={errors}
              name="postCompany"
              render={({ message }) => <p className="text-red-500 mt-2">{message}</p>}
            />
          </div>
        )}
        {/* Address */}
        {deliveryType !== 'pickup' && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="адрес"
              {...register('address', { required: 'Введите адрес' })}
              className="w-full border px-4 py-2"
            />
            <ErrorMessage
              errors={errors}
              name="address"
              render={({ message }) => <p className="text-red-500 mt-2">{message}</p>}
            />
          </div>
        )}

      </div>

      {/* Section 2: Recipient Information */}
      <div>
        <h2 className="text-lg font-bold mb-4">2 / 3 получатель</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <input
              type="text"
              placeholder="имя"
              {...register('firstName', { required: 'Введите имя' })}
              className="w-full border px-4 py-2"
            />
            <ErrorMessage
              errors={errors}
              name="firstName"
              render={({ message }) => <p className="text-red-500 mt-2">{message}</p>}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="фамилия"
              {...register('lastName', { required: 'Введите фамилию' })}
              className="w-full border px-4 py-2"
            />
            <ErrorMessage
              errors={errors}
              name="lastName"
              render={({ message }) => <p className="text-red-500 mt-2">{message}</p>}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="отчество"
              {...register('middleName')}
              className="w-full border px-4 py-2"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="e-mail"
              {...register('email', { required: 'Введите e-mail' })}
              className="w-full border px-4 py-2"
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => <p className="text-red-500 mt-2">{message}</p>}
            />
          </div>
          <div>
            <input
              type="tel"
              placeholder="телефон"
              {...register('phone', { required: 'Введите телефон' })}
              className="w-full border px-4 py-2"
            />
            <ErrorMessage
              errors={errors}
              name="phone"
              render={({ message }) => <p className="text-red-500 mt-2">{message}</p>}
            />
          </div>
        </div>
      </div>

      {/* Section 3: Payment Method */}
      <div>
        <h2 className="text-lg font-bold mb-4">3 / 3 оплата</h2>
        <div className="flex space-x-4">
          <label className="flex items-center" htmlFor="paymentType">
            <input
              type="radio"
              value="cash"
              {...register('paymentType', { required: 'Выберите тип оплаты' })}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2">наличные</span>
          </label>
          <label className="flex items-center" htmlFor="paymentType">
            <input
              type="radio"
              value="card"
              {...register('paymentType', { required: 'Выберите тип оплаты' })}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2">карта</span>
          </label>
          <label className="flex items-center" htmlFor="paymentType">
            <input
              type="radio"
              value="account"
              {...register('paymentType', { required: 'Выберите тип оплаты' })}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2">расчетный счет</span>
          </label>
        </div>
        <ErrorMessage
          errors={errors}
          name="paymentType"
          render={({ message }) => <p className="text-red-500 mt-2">{message}</p>}
        />
      </div>

      {/* Submit Button */}
      <div>
        <button type="submit" className="w-full bg-black text-white py-4">
          Оформить заказ
        </button>
      </div>
    </form>
  );
}
