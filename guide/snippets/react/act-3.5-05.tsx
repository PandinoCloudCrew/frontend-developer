// src/components/steps/PaymentStep.tsx
import { useForm } from 'react-hook-form';
import type { PaymentData } from '../../hooks/useCheckout';

interface Props {
  checkout: {
    paymentData: PaymentData | null;
    cartTotal: number;
    savePayment: (data: PaymentData) => void;
    nextStep: () => void;
    prevStep: () => void;
  };
}

export default function PaymentStep({ checkout }: Props) {
  const { register, handleSubmit, formState: { isValid } } =
    useForm<PaymentData>({
      defaultValues: checkout.paymentData ?? undefined,
      mode: 'onChange',
    });

  const onSubmit = (data: PaymentData) => {
    checkout.savePayment(data);
    checkout.nextStep();
  };

  return (
    <>
      <h2>Datos de pago</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label htmlFor="cardNumber">Número de tarjeta</label>
          <input
            id="cardNumber"
            {...register('cardNumber', { required: true })}
            placeholder="1234 5678 9012 3456"
          />
        </div>
        <div className="row">
          <div className="field">
            <label htmlFor="expiry">Vencimiento</label>
            <input
              id="expiry"
              {...register('expiry', { required: true })}
              placeholder="MM/AA"
            />
          </div>
          <div className="field">
            <label htmlFor="cvv">CVV</label>
            <input
              id="cvv"
              {...register('cvv', { required: true })}
              placeholder="123"
            />
          </div>
        </div>
        <p className="total">
          Total a pagar: <strong>$ {checkout.cartTotal}</strong>
        </p>
        <div className="actions">
          <button type="button" onClick={checkout.prevStep}>
            ← Volver al envío
          </button>
          <button type="submit" disabled={!isValid}>
            Confirmar pedido →
          </button>
        </div>
      </form>
    </>
  );
}
