'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
  name: z.string().nonempty(),
  email: z.string().email(),
  address: z.string().nonempty(),
});

type FormData = z.infer<typeof formSchema>;

const defaultValues: FormData = {
  name: '',
  email: '',
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

  // set form default values from global store after rehydration from local storage
  useEffect(() => {
    if (hasHydrated) {
      const { name, email, address } = useOrderStore.getState();
      reset({ name, email, address });
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
    const { name, email, address, restaurantAddress } =
      useOrderStore.getState();
    const restaurantId = dishes?.[0]?.restaurantId;
    const createOrder = CreateOrderSchema.parse({
      name,
      email,
      address,
      restaurantAddress,
      restaurantId,
      dishes,
    });
    mutate(createOrder);
  });

  const handleModalClose = () => {
    setIsModalOpen(false);
    clearOrder();
    router.replace('/');
  };

  // calculate additional values
  const isOrderEmpty = (dishes?.length ?? 0) === 0;
  const addressOptions = useMemo(
    () => predictions?.map(({ description }) => description),
    [predictions]
  );

  return (
    <>
      <form autoComplete="off" onSubmit={handleFormSubmit}>
        <div className="relative mb-60 aspect-video rounded-2xl bg-neutral-200">
          <Map className="h-full w-full rounded-2xl" />

          <div className="absolute bottom-0 left-1/2 w-full max-w-lg -translate-x-1/2 translate-y-1/2 rounded-2xl bg-white shadow-xl">
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
                    options={addressOptions}
                    error={fieldState.error?.message}
                    aria-invalid={fieldState.invalid}
                    onInput={setInput}
                  />
                )}
              />
              <Input
                placeholder="Ім'я"
                error={errors.name?.message}
                aria-invalid={Boolean(errors.name)}
                {...register('name')}
              />
              <Input
                placeholder="Email"
                error={errors.email?.message}
                aria-invalid={Boolean(errors.email)}
                {...register('email')}
              />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-2xl">
          <OrderList className="mb-12" />

          <Button className="w-full" type="submit" disabled={isOrderEmpty}>
            Підтвердити замовлення
          </Button>
        </div>
      </form>

      <ModalDialog
        open={isModalOpen}
        title="Замовлення підтверджено успішно!"
        acceptText="Супер"
        onAccept={handleModalClose}
      />
    </>
  );
}
