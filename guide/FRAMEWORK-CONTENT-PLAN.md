# Plan de Contenido por Framework

> Documenta qué contenido específico de framework existe y qué falta por crear.

## Estado actual

| Framework | Archivos | Estado |
|-----------|:--------:|--------|
| 🅰️ Angular | 13 | ✅ Completo |
| ⚛️ React | 0 | 🔲 Placeholders solamente |
| 💚 Vue | 0 | 🔲 Placeholders solamente |

## Contenido Angular existente (modelo a seguir)

| Stage | Archivo | Contenido |
|:-----:|---------|-----------|
| 2 | `00-setup-angular.md` | `ng new`, estructura del proyecto, primer componente standalone |
| 2 | `01-componentes-en-angular.md` | `@Component`, standalone, `input()`/`output()`, `@if`/`@for`, `ng-content` |
| 2 | `02-api-de-componentes-angular.md` | Typed inputs, `model()`, `viewChild`, `host` |
| 3 | `01-signals-y-estado.md` | `signal()`, `computed()`, `effect()`, `linkedSignal()` |
| 3 | `02-servicios-e-inyeccion.md` | `@Injectable`, `inject()`, hierarchical injectors |
| 3 | `03-http-y-data-fetching.md` | `HttpClient`, `toSignal()`, `httpResource`, `@defer`, interceptors |
| 3 | `04-reactive-forms.md` | `FormGroup`, `FormControl`, validators, `valueChanges` |
| 3 | `05-router-y-url-state.md` | Angular Router, params, guards, resolvers |
| 4 | `01-angular-material-y-cdk.md` | CDK a11y, layout, overlay, drag-drop, Material |
| 5 | `01-rendimiento-en-angular.md` | `OnPush`, `@defer`, `track`, Signals vs Zone.js, `NgOptimizedImage` |
| 6 | `01-seguridad-en-angular.md` | Auto-sanitization, `DomSanitizer`, XSRF, `ErrorHandler` |
| 7 | `01-testing-en-angular.md` | `TestBed`, `@testing-library/angular`, HTTP testing, mocking |
| 8 | `01-arquitectura-angular.md` | Standalone vs modules, lazy routes, Nx, Analog |

## Plan React (13 archivos equivalentes)

Cada archivo debe:
- Cubrir el mismo tema que su equivalente Angular
- Seguir el formato de LINEAMIENTOS.md (lecturas: intro, contenido, anti-patterns, puntos clave)
- Usar React 19+ (Server Components awareness pero enfocado en client-side)
- Español con jargon técnico en inglés

| Stage | Archivo | Contenido React | Equivale a Angular |
|:-----:|---------|-----------------|---------------------|
| 2 | `00-setup-react.md` | Vite + React, estructura del proyecto, primer componente funcional, JSX | `00-setup-angular.md` |
| 2 | `01-componentes-en-react.md` | Componentes funcionales, JSX, props, children, conditional rendering, lists con `.map()` | `01-componentes-en-angular.md` |
| 2 | `02-api-de-componentes-react.md` | Props typing con TypeScript, `forwardRef`, controlled vs uncontrolled, `children` patterns | `02-api-de-componentes-angular.md` |
| 3 | `01-hooks-y-estado.md` | `useState`, `useReducer`, `useMemo`, `useCallback`, custom hooks | `01-signals-y-estado.md` |
| 3 | `02-context-y-providers.md` | `createContext`, `useContext`, provider pattern, cuándo NO usar Context | `02-servicios-e-inyeccion.md` |
| 3 | `03-data-fetching-react.md` | `fetch` + `useEffect`, TanStack Query (`useQuery`, `useMutation`), Suspense, loading/error states | `03-http-y-data-fetching.md` |
| 3 | `04-formularios-react.md` | React Hook Form, controlled vs uncontrolled, Zod integration, validation | `04-reactive-forms.md` |
| 3 | `05-react-router.md` | React Router v7, `useParams`, `useSearchParams`, loaders, guards con wrapper components | `05-router-y-url-state.md` |
| 4 | `01-ui-libraries-react.md` | Radix UI, Headless UI, shadcn/ui, Tailwind integration | `01-angular-material-y-cdk.md` |
| 5 | `01-rendimiento-en-react.md` | `React.memo`, `useMemo`/`useCallback`, `lazy`/`Suspense`, React Compiler, Profiler | `01-rendimiento-en-angular.md` |
| 6 | `01-seguridad-en-react.md` | Auto-escaping JSX, `dangerouslySetInnerHTML` + DOMPurify, Error Boundaries, XSS prevention | `01-seguridad-en-angular.md` |
| 7 | `01-testing-en-react.md` | `@testing-library/react`, `renderHook`, MSW integration, `jest-dom` matchers | `01-testing-en-angular.md` |
| 8 | `01-arquitectura-react.md` | Feature-based structure, Next.js/Remix, lazy routes, Nx/Turborepo | `01-arquitectura-angular.md` |

## Plan Vue (13 archivos equivalentes)

| Stage | Archivo | Contenido Vue | Equivale a Angular |
|:-----:|---------|---------------|---------------------|
| 2 | `00-setup-vue.md` | `create-vue` (Vite), estructura, primer SFC, `<script setup>` | `00-setup-angular.md` |
| 2 | `01-componentes-en-vue.md` | SFC, `<template>`, props con `defineProps`, `<slot>`, `v-if`/`v-for` | `01-componentes-en-angular.md` |
| 2 | `02-api-de-componentes-vue.md` | Props typing, `defineEmits`, `defineModel`, `useTemplateRef`, attrs fallthrough | `02-api-de-componentes-angular.md` |
| 3 | `01-reactividad-y-estado.md` | `ref()`, `reactive()`, `computed()`, `watch`/`watchEffect`, composables | `01-signals-y-estado.md` |
| 3 | `02-provide-inject.md` | `provide()`/`inject()`, InjectionKey typing, composables como servicios | `02-servicios-e-inyeccion.md` |
| 3 | `03-data-fetching-vue.md` | `useFetch` (Nuxt), TanStack Query for Vue, `<Suspense>`, loading/error | `03-http-y-data-fetching.md` |
| 3 | `04-formularios-vue.md` | VeeValidate + Zod, `v-model`, form validation, multi-step forms | `04-reactive-forms.md` |
| 3 | `05-vue-router.md` | Vue Router 4, `useRoute`, `useRouter`, navigation guards, query params | `05-router-y-url-state.md` |
| 4 | `01-ui-libraries-vue.md` | Headless UI (Vue), Radix Vue, PrimeVue, Tailwind integration | `01-angular-material-y-cdk.md` |
| 5 | `01-rendimiento-en-vue.md` | `v-memo`, `<KeepAlive>`, async components, `defineAsyncComponent`, Vapor Mode | `01-rendimiento-en-angular.md` |
| 6 | `01-seguridad-en-vue.md` | Auto-escaping templates, `v-html` + DOMPurify, `onErrorCaptured`, XSS prevention | `01-seguridad-en-angular.md` |
| 7 | `01-testing-en-vue.md` | `@testing-library/vue`, `mount`/`shallowMount` (Vue Test Utils), composable testing | `01-testing-en-angular.md` |
| 8 | `01-arquitectura-vue.md` | Feature-based structure, Nuxt 3, lazy routes, Pinia stores organization | `01-arquitectura-angular.md` |

## Orden de implementación

1. ⚛️ **React** — 13 archivos (~60% del mercado, mayor demanda)
2. 💚 **Vue** — 13 archivos (~15% del mercado)
3. 🔥 **Svelte** — futuro, si hay demanda

## Reglas para contenido de framework

- Seguir el mismo formato que los archivos Angular existentes
- Cubrir los mismos temas — el estudiante debe poder elegir cualquier framework y obtener la misma profundidad
- Incluir anti-patterns específicos del framework
- Usar la versión más reciente estable (React 19+, Vue 3.5+)
- No repetir la teoría de las lecturas agnósticas — ir directo a la implementación
- Incluir el setup del proyecto (equivalente a `ng new`) en el archivo 00
