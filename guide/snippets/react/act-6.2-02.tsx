// src/components/ErrorBoundary.tsx — Error Boundary nativo de React
import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('ErrorBoundary capturó:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h3>Esta seccion tuvo un problema</h3>
          <p>El resto de la pagina sigue funcionando.</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Reiniciar seccion
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Uso:
// <ErrorBoundary>
//   <ListaUsuarios />
// </ErrorBoundary>
//
// <ErrorBoundary>
//   <OtraSeccion />
// </ErrorBoundary>
