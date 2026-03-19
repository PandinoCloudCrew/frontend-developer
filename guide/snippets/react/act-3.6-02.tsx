// src/components/CheckoutWizard.tsx — wizard con state machine
import { useCheckoutMachine } from '../hooks/useCheckoutMachine';
import CartStep from './steps/CartStep';
import ShippingStep from './steps/ShippingStep';
import PaymentStep from './steps/PaymentStep';
import ConfirmationStep from './steps/ConfirmationStep';

export default function CheckoutWizard() {
  const machine = useCheckoutMachine();

  const steps = ['Carrito', 'Envío', 'Pago', 'Confirmar'];

  const renderStep = () => {
    switch (machine.currentState) {
      case 'cart':         return <CartStep onNext={machine.next} />;
      case 'shipping':     return <ShippingStep machine={machine} />;
      case 'payment':      return <PaymentStep machine={machine} />;
      case 'confirmation': return <ConfirmationStep machine={machine} />;
    }
  };

  return (
    <div className="wizard">
      <div className="progress-bar">
        {steps.map((label, i) => (
          <div
            key={label}
            className={`step-indicator${
              machine.stepNumber >= i + 1 ? ' active' : ''
            }${machine.stepNumber > i + 1 ? ' completed' : ''}`}
          >
            {i + 1}. {label}
          </div>
        ))}
      </div>
      <p className="step-count">Paso {machine.stepNumber} de 4</p>
      {renderStep()}
    </div>
  );
}
