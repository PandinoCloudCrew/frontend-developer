# URL State Management

La URL es el gestor de estado mas subutilizado en el desarrollo frontend. Esta integrada en el navegador, es compartible, sobrevive a refrescar la pagina, soporta navegacion hacia atras/adelante y habilita server-side rendering. Aun asi, la mayoria de los desarrolladores almacenan el estado de filtros, busquedas y paginacion en el estado del componente — que se evapora en el momento en que alguien comparte un enlace o refresca la pagina.

---

## Que Pertenece en la URL

URL state es el estado que deberia sobrevivir al compartir una pagina. Preguntate: "Si alguien copia esta URL y se la envia a un colega, deberian ver la misma vista?"

**Si — ponlo en la URL:**

| Tipo de estado  | URL de ejemplo                                 |
|-----------------|------------------------------------------------|
| Consulta de busqueda | `?q=typescript`                           |
| Filtros         | `?status=active&role=admin`                    |
| Paginacion      | `?page=3&pageSize=25`                          |
| Orden           | `?sort=name&dir=asc`                           |
| Tab activo      | `?tab=settings`                                |
| Elemento seleccionado | `/users/42` o `?selected=42`             |
| Modo de vista   | `?view=grid`                                   |

**No — mantenlo fuera de la URL:**

| Tipo de estado        | Por que no la URL                                  |
|-----------------------|----------------------------------------------------|
| Input de formulario a medio escribir | Cambia con demasiada frecuencia, no es estado compartible |
| Tooltip/dropdown abierto | Estado de UI efimero, irrelevante para otro usuario |
| Tokens de auth        | Riesgo de seguridad — las URLs se registran y comparten |
| Modal abierto/cerrado | Generalmente efimero (aunque los modales con deep-link son una excepcion) |
| Posicion de scroll    | El navegador maneja esto automaticamente            |

## La API `URLSearchParams`

No necesitas una libreria. El navegador tiene esto integrado.

```javascript
// Read parameters from the current URL
const params = new URLSearchParams(window.location.search);
const query = params.get("q");         // "typescript" or null
const page = Number(params.get("page")) || 1;
const tags = params.getAll("tag");     // ["react", "vue"]

// Build new parameters
const newParams = new URLSearchParams();
newParams.set("q", "typescript");
newParams.set("page", "3");
newParams.append("tag", "react");
newParams.append("tag", "vue");
console.log(newParams.toString()); // "q=typescript&page=3&tag=react&tag=vue"
```

```javascript
// Update the URL without a page reload
function setUrlParams(params: Record<string, string>) {
  const url = new URL(window.location.href);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
    else url.searchParams.delete(key);
  });
  window.history.pushState({}, "", url);
}
```

## Integracion con Frameworks

**React Router — `useSearchParams`:**

```tsx
import { useSearchParams } from "react-router-dom";

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") ?? "all";
  const page = Number(searchParams.get("page")) || 1;

  const setCategory = (cat: string) => {
    setSearchParams((prev) => {
      prev.set("category", cat);
      prev.set("page", "1"); // Reset page on filter change
      return prev;
    });
  };

  return (/* render with category and page */);
}
```

**Vue Router — `route.query`:**

```vue
<script setup>
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const router = useRouter();

const category = computed(() => route.query.category ?? 'all');
const page = computed(() => Number(route.query.page) || 1);

function setCategory(cat) {
  router.push({ query: { ...route.query, category: cat, page: '1' } });
}
</script>
```

**Angular — `ActivatedRoute`:**

```typescript
@Component({ /* ... */ })
export class ProductListComponent {
  category$ = this.route.queryParamMap.pipe(
    map(params => params.get('category') ?? 'all')
  );
  page$ = this.route.queryParamMap.pipe(
    map(params => Number(params.get('page')) || 1)
  );

  constructor(private route: ActivatedRoute, private router: Router) {}

  setCategory(cat: string) {
    this.router.navigate([], {
      queryParams: { category: cat, page: 1 },
      queryParamsHandling: 'merge',
    });
  }
}
```

## La URL como Fuente Unica de Verdad

Este es el concepto critico. La URL no deberia ser un espejo del estado del componente — deberia ser la fuente.

```tsx
// Wrong: state is the source, URL is a mirror
function SearchPage() {
  const [query, setQuery] = useState("");
  useEffect(() => {
    // Syncing state → URL is fragile, leads to race conditions
    setUrlParam("q", query);
  }, [query]);
}

// Right: URL is the source, component reads from it
function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const setQuery = (q: string) => {
    setSearchParams({ q }); // URL changes, component re-renders, done
  };
}
```

Cuando la URL es la fuente, no hay problema de sincronizacion. La URL cambia, el componente lee el nuevo valor, la UI se actualiza. Una direccion.

## Codificando Estado Complejo

**Arrays:** Usa claves repetidas o separacion por comas.

```javascript
// Repeated keys (standard-compliant)
// ?tag=react&tag=vue → params.getAll("tag") → ["react", "vue"]

// Comma-separated (simpler URLs)
// ?tags=react,vue → params.get("tags").split(",") → ["react", "vue"]
```

**Valores predeterminados:** Omite los valores predeterminados de la URL para mantenerla limpia.

```typescript
function buildSearchUrl(filters: Filters): string {
  const params = new URLSearchParams();
  // Only add non-default values
  if (filters.query) params.set("q", filters.query);
  if (filters.page > 1) params.set("page", String(filters.page));
  if (filters.sort !== "relevance") params.set("sort", filters.sort);
  return `?${params.toString()}`;
}
```

## Errores Comunes

**Almacenar todo en la URL.** Borradores de formularios, estado de modales, acordeones abiertos/cerrados — esto infla la URL y confunde a los usuarios que la comparten.

**Ignorar el URL state al renderizar por primera vez.** La pagina carga en `/products?category=electronics&page=3` pero el componente se inicializa con `category = "all"` y `page = 1`, ignorando la URL. Siempre lee de la URL al montar.

```tsx
// Wrong: ignores URL on mount
const [page, setPage] = useState(1);

// Right: reads from URL on mount
const [searchParams] = useSearchParams();
const page = Number(searchParams.get("page")) || 1;
```

**No codificar la entrada del usuario.** Si un usuario busca `price > 100 & sale`, ese `&` rompera tus parametros de URL. `URLSearchParams` maneja la codificacion automaticamente — usalo. Nunca concatenes strings de URL manualmente.

```javascript
// Dangerous: manual string concatenation
const url = `/search?q=${userInput}`; // XSS risk, encoding bugs

// Safe: URLSearchParams handles encoding
const params = new URLSearchParams({ q: userInput });
const url = `/search?${params}`;
```

**No reiniciar el estado dependiente.** El usuario esta en la pagina 5, cambia el filtro de categoria, y la URL aun dice `page=5` — pero la nueva categoria solo tiene 2 paginas. Reinicia la paginacion cuando los filtros cambien.

**Parametros que no hacen roundtrip.** Si `parse(serialize(state)) !== state`, tendras bugs sutiles. Prueba que tu codificacion/decodificacion de URL sea sin perdida.

## Puntos Clave

- Si el estado deberia sobrevivir al compartir un enlace, pertenece en la URL. Si no, no.
- La URL es la fuente de verdad, no un espejo del estado del componente. Lee de ella, no sincronices hacia ella.
- Usa `URLSearchParams` para la codificacion — nunca concatenes strings de URL con entrada de usuario.
- Lee el URL state al renderizar por primera vez. Ignorarlo es uno de los bugs mas comunes.
- Reinicia el estado dependiente (como paginacion) cuando el estado independiente (como filtros) cambie.
