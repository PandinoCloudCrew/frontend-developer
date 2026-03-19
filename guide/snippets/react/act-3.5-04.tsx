// src/components/steps/CartStep.tsx
import type { useCheckout } from '../../hooks/useCheckout';

interface Props {
  checkout: ReturnType<typeof useCheckout>;
}

export default function CartStep({ checkout }: Props) {
  return (
    <>
      <h2>Tu carrito</h2>
      <ul className="cart-list">
        {checkout.cartItems.map((item) => (
          <li key={item.id}>
            {item.name} x{item.quantity} — $ {item.price * item.quantity}
          </li>
        ))}
      </ul>
      <p className="total">
        <strong>Total: $ {checkout.cartTotal}</strong>
      </p>

      <div className="actions">
        <button
          onClick={checkout.nextStep}
          disabled={!checkout.isStepValid}
        >
          Continuar al envío →
        </button>
      </div>
    </>
  );
}
