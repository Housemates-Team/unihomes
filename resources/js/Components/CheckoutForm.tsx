import React, { useEffect, useState } from 'react';
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { InputError } from '@/Components/InputError';
import { Button } from '@/Common/button';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submitData: (data: any) => void;
  room_id: string;
  url: string;
};

export function CheckoutForm({ submitData, room_id, url }: Props) {
  const stripe = useStripe();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret',
    );

    if (!clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status as string) {
        case 'succeeded':
          submitData(paymentIntent);
          break;
        case 'processing':
          setIsLoading(true);
          break;
        case 'requires_payment_method':
          setErrorMessage('Your payment was not successful, please try again.');
          break;
        default:
          setErrorMessage('An unknown error occured during payment.');
          break;
      }
    });
  }, [stripe]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${url}/room/${room_id}/checkout/payment`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error) {
      setErrorMessage(error.message);
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'tabs' as const,
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" options={paymentElementOptions} className={'mt-5'} />
      <div className="flex justify-end mt-5">
        <Button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className={`mt-5 inline-flex px-5 py-3 items-center ${
            isLoading ? 'transition ease-in-out duration-150 cursor-not-allowed disabled' : ''
          }`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            'Pay now'
          )}
        </Button>
      </div>
      {errorMessage && <InputError className="mt-2" message={errorMessage} />}
    </form>
  );
}
