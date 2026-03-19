// src/components/steps/ConfirmationStep.tsx
import type { useCheckout } from '../../hooks/useCheckout';

interface Props {
  checkout: ReturnType<typeof useCheckout>;
}

export default function ConfirmationStep({ checkout }: Props) {
  const handleConfirm = () => {
    alert(
      '¡Pedido confirmado! (En una app real, esto enviaría los datos al servidor)',
    );
    checkout.reset();
  };

  return (
    <>
      <h2>Resumen del pedido</h2>

      <section>
        <h3>Productos</h3>
        <ul>
          {checkout.cartItems.map((item) => (
            <li key={item.id}>
              {item.name} x{item.quantity} — ${' '}
              {item.price * item.quantity}
            </li>
          ))}
        </ul>
        <p>
          <strong>Total: $ {checkout.cartTotal}</strong>
        </p>
      </section>

      {checkout.shippingData && (
        <section>
          <h3>Envío</h3>
          <p>{checkout.shippingData.fullName}</p>
          <p>
            {checkout.shippingData.address}, {checkout.shippingData.city}{' '}
            {checkout.shippingData.zipCode}
          </p>
        </section>
      )}

      {checkout.paymentData && (
        <section>
          <h3>Pago</h3>
          <p>
            Tarjeta: **** **** ****{' '}
            {checkout.paymentData.cardNumber.slice(-4)}
          </p>
        </section>
      )}

      <div className="actions">
        <button onClick={checkout.prevStep}>← Volver al pago</button>
        <button className="confirm" onClick={handleConfirm}>
          Confirmar y pagar
        </button>
      </div>
    </>
  );
}
