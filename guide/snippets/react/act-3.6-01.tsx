// src/hooks/useCheckoutMachine.ts — XState con React
import { useMachine } from '@xstate/react';
import { checkoutMachine } from '../machines/checkout.machine';

export function useCheckoutMachine() {
  const [state, send] = useMachine(checkoutMachine);

  const stateMap: Record<string, number> = {
    cart: 1,
    shipping: 2,
    payment: 3,
    confirmation: 4,
    done: 4,
  };

  return {
    currentState: state.value as string,
    stepNumber: stateMap[state.value as string] ?? 1,
    next: () => send({ type: 'NEXT' }),
    back: () => send({ type: 'BACK' }),
    validateShipping: (valid: boolean) =>
      send({ type: 'VALIDATE_SHIPPING', valid }),
    validatePayment: (valid: boolean) =>
      send({ type: 'VALIDATE_PAYMENT', valid }),
    confirm: () => send({ type: 'CONFIRM' }),
  };
}
