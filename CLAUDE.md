# Instrucciones del Proyecto

## Qué es este proyecto

Guía para desarrolladores frontend: 8 etapas progresivas, 3 niveles (🟢 Esencial, 🟡 Recomendado, 🔴 Avanzado), actividades de 45-60 minutos. Dirigida a personas con poca experiencia en desarrollo. Framework actual: Angular 19+.

## Antes de generar contenido

**SIEMPRE** lee `guide/LINEAMIENTOS.md` antes de crear o modificar actividades, lecturas, o contenido Angular. Es el estándar de formato, tono, estructura y nivel de detalle. No generes contenido sin haberlo leído.

## Reglas críticas

- **Idioma**: Prosa en español, jargon técnico en inglés
- **Audiencia**: Principiantes. No asumas que saben qué es una terminal, npm, DevTools, o cómo compilar
- **Actividades**: Cada actividad es un archivo separado en `actividades/`. Debe tener: Antes de empezar, Práctica paso a paso (instrucciones ejecutables sin ambigüedad), Qué puede salir mal (2-4 errores reales), Resultado esperado, Criterios de aceptación (binarios, verificables)
- **Lecturas**: 50-300 líneas, un solo tema, incluir anti-patterns
- **Angular**: Usar Angular 19+ (standalone, signals, `@if`/`@for`, `input()`/`output()`). No usar APIs legacy (`@Input`, `NgModule`, `*ngIf`, `*ngFor`)
- **Mockups**: Solo para resultados visuales. Deben mostrar exactamente lo que el estudiante obtendrá, no diseños refinados
- **Anti-patterns**: Siempre cubrir el camino negativo — cómo las cosas fallan, no solo cómo funcionan
- **Pilares de diseño**: La guía usa 7 pilares (Usabilidad, Resiliencia, Rendimiento, Seguridad, Accesibilidad, Mantenibilidad, Observabilidad). Cada actividad debe indicar qué pilares ejercita. Referencia: `guide/stage-1-foundations/lecturas/00-pilares-de-diseno.md`

## Estructura del proyecto

```
guide/
  LINEAMIENTOS.md              ← Estándar de formato (LEER PRIMERO)
  README.md                    ← Punto de entrada del estudiante
  frontend-guide.pen           ← Mockups (Pencil)
  stage-N-topic/
    README.md                  ← Índice de la etapa (~60 líneas)
    actividades/               ← Un archivo por actividad
    lecturas/                  ← Lecturas cortas agnósticas
    angular/                   ← Implementación Angular
    mockups/                   ← Imágenes de referencia visual
_internal/                     ← Documentos internos (no para estudiantes)
```

## Commits

- Mensajes en español
- Co-Authored-By al final
- Describir qué cambió y por qué
