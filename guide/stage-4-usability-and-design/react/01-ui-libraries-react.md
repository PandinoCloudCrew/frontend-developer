# UI Libraries para React



> El ecosistema headless UI de React: Radix UI, shadcn/ui, Headless UI y React Aria. Cuándo usar cada uno y cómo integrar Tailwind CSS.

---

## Contenido
- [El enfoque headless](#el-enfoque-headless)
- [Radix UI: primitivas headless](#radix-ui-primitivas-headless)
- [shadcn/ui: el stack recomendado](#shadcnui-el-stack-recomendado)
- [Headless UI y React Aria](#headless-ui-y-react-aria)
- [Tailwind CSS con React](#tailwind-css-con-react)
- [Anti-patterns](#anti-patterns)

---

## El Enfoque Headless

Las bibliotecas headless proporcionan **comportamiento y accesibilidad sin estilos**. Tú controlas cómo se ve; la biblioteca se encarga de la lógica compleja: focus management, keyboard navigation, ARIA attributes, animaciones de apertura/cierre.

En Angular, el CDK (Component Dev Kit) cumple este rol. En React, el ecosistema headless tiene varias opciones con diferentes enfoques.

---

## Radix UI: Primitivas Headless

Radix es la biblioteca headless más popular de React. Provee primitivas como Dialog, Dropdown, Tooltip, Tabs, Accordion --- todas accesibles out of the box.

```bash
npm install @radix-ui/react-dialog
```

```
import * as Dialog from '@radix-ui/react-dialog';

function ConfirmDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button>Eliminar</button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-96">
          <Dialog.Title className="text-lg font-semibold">
            Confirmar eliminación
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-gray-500">
            ¿Estás seguro? Esta acción no se puede deshacer.
          </Dialog.Description>
          <div className="mt-4 flex justify-end gap-2">
            <Dialog.Close asChild>
              <button className="px-4 py-2 border rounded">Cancelar</button>
            </Dialog.Close>
            <button className="px-4 py-2 bg-red-600 text-white rounded">
              Eliminar
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

Radix maneja automáticamente: focus trap, Escape para cerrar, ARIA roles, animaciones de entrada/salida y click fuera del dialog.

Radix en React ≈ Angular CDK: proporciona comportamiento complejo sin imponer estilos.

---

## shadcn/ui: El Stack Recomendado

shadcn/ui **no es una biblioteca npm** --- es una colección de componentes que se copian a tu proyecto. Están construidos sobre Radix + Tailwind CSS y son completamente personalizables porque viven en tu código.

```bash
# Inicializar shadcn/ui en tu proyecto
npx shadcn@latest init

# Agregar componentes individuales
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add input
```

Esto crea archivos en `src/components/ui/`:

```
// Los componentes viven en tu código — puedes modificarlos
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

function App() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Eliminar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>
            ¿Estás seguro? Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
```

**Por qué shadcn/ui es la recomendación:**
- Componentes accesibles (Radix) + estilos modernos (Tailwind).
- No es una dependencia --- los componentes son tu código. Puedes modificar cualquier detalle.
- La comunidad más activa del ecosistema React en 2026.

shadcn/ui en React ≈ spartan/ui en Angular: componentes copy-paste construidos sobre primitivas headless + Tailwind.

---

## Headless UI y React Aria

### Headless UI

De Tailwind Labs. Menos componentes que Radix, pero diseñados específicamente para Tailwind:

```bash
npm install @headlessui/react
```

Ideal si solo necesitas unos pocos componentes (Menu, Listbox, Dialog, Popover) y ya usas Tailwind.

### React Aria (Adobe)

La opción con **máxima accesibilidad**. Adobe la usa internamente y cumple con WCAG al nivel más estricto:

```bash
npm install react-aria-components
```

```
import { Button, Dialog, DialogTrigger, Modal } from 'react-aria-components';

function Example() {
  return (
    <DialogTrigger>
      <Button>Abrir</Button>
      <Modal>
        <Dialog>
          <h2>Título</h2>
          <p>Contenido del dialog</p>
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}
```

React Aria es más verbose pero cubre edge cases de accesibilidad que otras bibliotecas ignoran (internationalization, mobile screen readers, drag and drop accesible).

### Cuándo usar cada una

| Biblioteca | Cuándo usarla |
|-----------|--------------|
| **shadcn/ui** | La mayoría de proyectos. Componentes listos + personalización total |
| **Radix** (directo) | Cuando necesitas primitivas headless sin estilos predefinidos |
| **React Aria** | Cuando la accesibilidad es un requisito crítico (gobierno, salud, finanzas) |
| **Headless UI** | Proyectos pequeños que solo necesitan 3-4 componentes + Tailwind |

---

## Tailwind CSS con React

Tailwind se integra directamente con `className` en JSX:

```
function Badge({ label, variant }: { label: string; variant: 'success' | 'warning' }) {
  const colors = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${colors[variant]}`}>
      {label}
    </span>
  );
}
```

### La utilidad `cn()`

shadcn/ui incluye `cn()` (basado en `clsx` + `tailwind-merge`) para combinar clases condicionalmente:

```bash
npm install clsx tailwind-merge
```

```
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

```
function Button({ variant, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded font-medium',
        variant === 'primary' && 'bg-slate-900 text-white',
        variant === 'secondary' && 'border border-slate-300',
        className // permite override desde el consumidor
      )}
      {...props}
    />
  );
}
```

---

## Anti-patterns

- **Instalar Material UI o Chakra para usar 3 componentes.** Estas bibliotecas son enormes. Si solo necesitas un Dialog, un Dropdown y un Toast, usa shadcn/ui y agrega solo lo que necesitas.
- **Construir componentes accesibles desde cero.** Focus trap, keyboard navigation y ARIA attributes son difíciles de implementar correctamente. Usa Radix, React Aria o shadcn/ui que ya lo resolvieron.
- **Concatenar strings de clases Tailwind sin `cn()`.** Sin `tailwind-merge`, clases conflictivas no se resuelven: `"p-4 p-2"` aplica ambas. `cn('p-4', 'p-2')` resuelve a `"p-2"`.
- **Copiar componentes de shadcn/ui sin entenderlos.** Los componentes viven en tu código. Si no entiendes cómo funcionan, no podrás modificarlos ni debuggearlos. Lee el código fuente de cada componente que copies.

---

## Puntos Clave

- shadcn/ui (Radix + Tailwind) es la recomendación para la mayoría de proyectos React. Componentes accesibles, personalizables y sin dependencias pesadas.
- Radix proporciona primitivas headless con accesibilidad y keyboard handling incluidos. Es el CDK de React.
- React Aria es la opción cuando la accesibilidad es un requisito crítico (máximo cumplimiento WCAG).
- `cn()` (clsx + tailwind-merge) es la forma correcta de combinar clases Tailwind condicionalmente en React.
- No instales bibliotecas de componentes completas si solo necesitas unos pocos. shadcn/ui permite agregar componentes individuales.


