// src/hooks/useCheckout.ts — hook que reemplaza al servicio de wizard
import { useState, useMemo, useCallback } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface ShippingData {
  fullName: string;
  address: string;
  city: string;
  zipCode: string;
}

export interface PaymentData {
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export function useCheckout() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [cartItems] = useState<CartItem[]>([
    { id: 1, name: 'Camiseta React', price: 25, quantity: 2 },
    { id: 2, name: 'Sticker Pack', price: 5, quantity: 1 },
  ]);
  const [shippingData, setShippingData] = useState<ShippingData | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [cartItems],
  );

  const isStepValid = useMemo(() => {
    switch (currentStep) {
      case 1: return cartItems.length > 0;
      case 2: return shippingData !== null;
      case 3: return paymentData !== null;
      case 4: return true;
      default: return false;
    }
  }, [currentStep, cartItems, shippingData, paymentData]);

  const nextStep = useCallback(() => {
    if (isStepValid && currentStep < totalSteps) {
      setCurrentStep((s) => s + 1);
    }
  }, [isStepValid, currentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  }, [currentStep]);

  const reset = useCallback(() => {
    setCurrentStep(1);
    setShippingData(null);
    setPaymentData(null);
  }, []);

  return {
    currentStep, totalSteps, cartItems, shippingData, paymentData,
    cartTotal, isStepValid,
    nextStep, prevStep,
    saveShipping: setShippingData,
    savePayment: setPaymentData,
    reset,
  };
}
