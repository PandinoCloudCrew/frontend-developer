// src/components/CheckoutWizard.tsx
import { useCheckout } from '../hooks/useCheckout';
import CartStep from './steps/CartStep';
import ShippingStep from './steps/ShippingStep';
import PaymentStep from './steps/PaymentStep';
import ConfirmationStep from './steps/ConfirmationStep';

export default function CheckoutWizard() {
  const checkout = useCheckout();

  const renderStep = () => {
    switch (checkout.currentStep) {
      case 1: return <CartStep checkout={checkout} />;
      case 2: return <ShippingStep checkout={checkout} />;
      case 3: return <PaymentStep checkout={checkout} />;
      case 4: return <ConfirmationStep checkout={checkout} />;
    }
  };

  const steps = ['Carrito', 'Envío', 'Pago', 'Confirmar'];

  return (
    <div className="wizard">
      <div className="progress-bar">
        {steps.map((label, i) => (
          <div
            key={label}
            className={`step-indicator${
              checkout.currentStep >= i + 1 ? ' active' : ''
            }${checkout.currentStep > i + 1 ? ' completed' : ''}`}
          >
            {i + 1}. {label}
          </div>
        ))}
      </div>
      <p className="step-count">
        Paso {checkout.currentStep} de {checkout.totalSteps}
      </p>
      {renderStep()}
    </div>
  );
}
