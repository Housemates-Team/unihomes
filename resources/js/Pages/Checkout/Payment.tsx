import React from 'react';
import { useReadLocalStorage } from 'usehooks-ts';
import { Head, useForm } from '@inertiajs/react';
import { useTypedPage } from '@/Hooks/useTypedPage';
import { Stripe } from '@/Components/Stripe';
import { HeaderNavigation } from '@/Layouts/HeaderNavigation';
import { Banner } from '@/Components/Banner';
import { Footer } from '@/Layouts/Footer';
import { CheckoutHeader } from './CheckoutHeader';

const Payment = () => {
  const page = useTypedPage();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const checkoutData: any = useReadLocalStorage('checkoutData');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { room, booking_period, application_url } = page.props as any;

  const { formData, data } = checkoutData;
  const { post } = useForm({ ...formData, room_id: room.id });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (data: any) => {
    post(`/room/${room.id}/checkout/confirm`, { ...data });
  };

  return (
    <>
      <Head title="Confirm payment" />
      <Banner />
      <HeaderNavigation />
      <CheckoutHeader
        roomId={room.id}
        roomName={room.name}
        propertyName={room.property.name}
        bookingPeriod={booking_period}
      />
      <main className="container py-10 px-32">
        <div className="mt-8 mb-24">
          <h1 className="text-3xl font-bold">Payment</h1>
          <p className="text-gray-600 text-lg max-w-2xl mt-4">
            Your room awaits! one last step to confirm your reservation, fill-in your bank details
            and pay for the room
          </p>
        </div>
        <div className="space-y-5 mt-10">
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Payment Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Make the required payment to complete reservation.
              </p>
            </div>

            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
              <div className="px-4 py-6 sm:p-8">
                <Stripe data={data} submitData={handleSubmit} room_id={room.id} url={application_url} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Payment;
