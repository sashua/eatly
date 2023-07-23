'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { MdRestaurant } from 'react-icons/md';
import z from 'zod';
import { addOrder } from '~/lib/api';
import { useAutocompleteService, useRestaurantQuery } from '~/lib/hooks';
import { CreateOrderSchema } from '~/lib/schemas';
import { useOrderStore, useStore } from '~/lib/store';
import { Map } from './Map';
import { OrderList } from './OrderList';
import { Button, Combobox, Input } from './common';
import { ModalDialog } from './common/ModalDialog';

const formSchema = z.object({
  name: z.string().nonempty("Вкажіть ім'я"),
  phone: z.string().regex(/^\+?3?8?(0\d{9})$/, 'Вкажіть номер телефону'),
  address: z.string().nonempty('Вкажіть адресу доставки'),
});

type FormData = z.infer<typeof formSchema>;

const defaultValues: FormData = {
  name: '',
  phone: '',
  address: '',
};

export function OrderForm() {
  const router = useRouter();

  // get values from global store
  const dishes = useStore(useOrderStore, s => s.dishes);
  const deliveryTime = useStore(useOrderStore, s => s.deliveryTime);
  const hasHydrated = useStore(useOrderStore, s => s._hasHydrated);
  const setClientInfo = useOrderStore(s => s.setClientInfo);
  const clearOrder = useOrderStore(s => s.clearOrder);

  // get current order restaurant
  const { data: restaurant } = useRestaurantQuery(dishes?.[0]?.restaurantId);
  const { mutate, isLoading } = useMutation({
    mutationFn: addOrder,
    onSuccess: () => {
      setIsModalOpen(true);
    },
  });

  // set up google autocomplete
  const { predictions, setInput } = useAutocompleteService();

  // set up react-hook-form
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  // set up modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // return to the main page if the order is empty
  useEffect(() => {
    if (dishes && !dishes.length) router.replace('/');
  }, [dishes, router]);

  // set form default values from global store after rehydration from local storage
  useEffect(() => {
    if (hasHydrated) {
      const { name, phone, address } = useOrderStore.getState();
      reset({ name, phone, address });
    }
  }, [hasHydrated, reset]);

  // sync form inputs with global store and autocomplete service
  useEffect(() => {
    const subscription = watch((data, { name }) => {
      setClientInfo(data);
      if (name === 'address') {
        setInput('');
      }
    });
    return subscription.unsubscribe;
  }, [setClientInfo, setInput, watch]);

  // event handlers
  const handleFormSubmit = handleSubmit(async (data: FormData) => {
    const { name, phone, address, restaurantAddress } =
      useOrderStore.getState();
    const restaurantId = dishes?.[0]?.restaurantId;
    const createOrder = CreateOrderSchema.parse({
      name,
      phone,
      address,
      restaurantAddress,
      restaurantId,
      dishes,
    });
    mutate(createOrder);
  });

  // calculate additional values
  const isOrderEmpty = (dishes?.length ?? 0) === 0;
  const addressOptions = useMemo(
    () => predictions?.map(({ description }) => description),
    [predictions]
  );

  return (
    <>
      <form autoComplete="off" onSubmit={handleFormSubmit}>
        <div className="mb-16 rounded-2xl  sm:relative sm:mb-72 sm:bg-neutral-200 md:mb-64 lg:mb-56">
          <Map className="aspect-square w-full rounded-2xl sm:aspect-video" />

          <div className="mt-10 w-full rounded-2xl bg-white shadow-xl sm:absolute sm:bottom-0 sm:left-1/2 sm:mt-auto sm:max-w-lg sm:-translate-x-1/2 sm:translate-y-3/4 md:translate-y-2/3 lg:translate-y-1/2">
            <div className="flex items-center justify-between gap-4 rounded-t-2xl bg-neutral-950 px-6 py-4">
              <p className="text-2xl font-medium text-neutral-50">
                {restaurant?.name}
              </p>
              <p className="flex flex-col items-center gap-0.5">
                <span className="text-sm text-neutral-200">Час доставки</span>
                <span className="text-lg text-neutral-50">
                  {deliveryTime?.text}
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-4 px-6 pb-10 pt-6">
              <Controller
                name="address"
                control={control}
                render={({ field, fieldState }) => (
                  <Combobox
                    {...field}
                    placeholder="Адреса доставки"
                    disabled={isLoading}
                    options={addressOptions}
                    error={fieldState.error?.message}
                    aria-invalid={fieldState.invalid}
                    onInput={setInput}
                  />
                )}
              />
              <Input
                placeholder="Ім'я"
                disabled={isLoading}
                error={errors.name?.message}
                aria-invalid={Boolean(errors.name)}
                {...register('name')}
              />
              <Input
                placeholder="Телефон"
                disabled={isLoading}
                error={errors.phone?.message}
                aria-invalid={Boolean(errors.phone)}
                {...register('phone')}
              />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-2xl">
          <OrderList className="mb-10 sm:mb-12" disabled={isLoading} />

          <Button
            className="w-full"
            type="submit"
            disabled={isOrderEmpty || isLoading}
          >
            <span>Підтвердити замовлення</span>
            <MdRestaurant
              className={clsx('h-5 w-5', isLoading && 'animate-bounce')}
            />
          </Button>
        </div>
      </form>

      <ModalDialog
        open={isModalOpen}
        title="Дякуємо за замовлення!"
        acceptText="Супер"
        onAccept={clearOrder}
      >
        <p>Очікуйте на на нашого кур&apos;єра за мить ⚡️</p>
      </ModalDialog>
    </>
  );
}
