// src/components/steps/ShippingStep.tsx
import { useForm } from 'react-hook-form';
import type { ShippingData } from '../../hooks/useCheckout';

interface Props {
  checkout: {
    shippingData: ShippingData | null;
    saveShipping: (data: ShippingData) => void;
    nextStep: () => void;
    prevStep: () => void;
  };
}

export default function ShippingStep({ checkout }: Props) {
  const { register, handleSubmit, formState: { isValid } } =
    useForm<ShippingData>({
      defaultValues: checkout.shippingData ?? undefined,
      mode: 'onChange',
    });

  const onSubmit = (data: ShippingData) => {
    checkout.saveShipping(data);
    checkout.nextStep();
  };

  return (
    <>
      <h2>Datos de envío</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label htmlFor="fullName">Nombre completo</label>
          <input id="fullName" {...register('fullName', { required: true })} />
        </div>
        <div className="field">
          <label htmlFor="address">Dirección</label>
          <input id="address" {...register('address', { required: true })} />
        </div>
        <div className="field">
          <label htmlFor="city">Ciudad</label>
          <input id="city" {...register('city', { required: true })} />
        </div>
        <div className="field">
          <label htmlFor="zipCode">Código postal</label>
          <input id="zipCode" {...register('zipCode', { required: true })} />
        </div>
        <div className="actions">
          <button type="button" onClick={checkout.prevStep}>
            ← Volver al carrito
          </button>
          <button type="submit" disabled={!isValid}>
            Continuar al pago →
          </button>
        </div>
      </form>
    </>
  );
}
