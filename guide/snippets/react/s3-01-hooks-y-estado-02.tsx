import { useReducer } from 'react';

interface CartState {
  items: CartItem[];
  discount: number;
}

type CartAction =
  | { type: 'add'; item: CartItem }
  | { type: 'remove'; id: string }
  | { type: 'applyDiscount'; percent: number }
  | { type: 'clear' };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add':
      return { ...state, items: [...state.items, action.item] };
    case 'remove':
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case 'applyDiscount':
      return { ...state, discount: action.percent };
    case 'clear':
      return { items: [], discount: 0 };
  }
}

function Cart() {
  const [state, dispatch] = useReducer(cartReducer, { items: [], discount: 0 });

  return (
    <div>
      <p>Items: {state.items.length}</p>
      <button onClick={() => dispatch({ type: 'clear' })}>Vaciar</button>
    </div>
  );
}
