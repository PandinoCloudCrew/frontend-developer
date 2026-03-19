// src/components/SeguridadLab.tsx — App de practica con vulnerabilidades XSS
import { useState, useRef } from 'react';
import DOMPurify from 'dompurify';

export default function SeguridadLab() {
  const [comentario, setComentario] = useState('');
  const [urlPerfil, setUrlPerfil] = useState('');
  const [resultadoCalc, setResultadoCalc] = useState('');
  const [notas, setNotas] = useState<string[]>([]);
  const [nombreSaludo, setNombreSaludo] = useState('');

  const comentarioRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const calcRef = useRef<HTMLInputElement>(null);
  const nombreRef = useRef<HTMLInputElement>(null);
  const notaRef = useRef<HTMLInputElement>(null);

  // SEGURO: React escapa automaticamente con JSX
  // No usamos dangerouslySetInnerHTML con input del usuario

  function guardarUrl(url: string) {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      setUrlPerfil(url);
    } else {
      setUrlPerfil('');
      console.warn('URL rechazada: solo se permiten URLs http/https');
    }
  }

  function calcular(expresion: string) {
    const sanitizada = expresion.replace(/[^0-9+\-*/.() ]/g, '');
    if (sanitizada !== expresion) {
      setResultadoCalc('Solo numeros y operadores permitidos');
      return;
    }
    try {
      const resultado = new Function(`return (${sanitizada})`)();
      setResultadoCalc(String(resultado));
    } catch {
      setResultadoCalc('Expresion invalida');
    }
  }

  return (
    <div>
      <h1>Lab de Seguridad XSS</h1>

      {/* SEGURO: React escapa el contenido automaticamente */}
      <h2>Comentarios</h2>
      <p>{comentario}</p>
      <input ref={comentarioRef} type="text" placeholder="Escribe un comentario" />
      <button onClick={() => setComentario(comentarioRef.current?.value ?? '')}>
        Publicar
      </button>

      <h2>Enlace del perfil</h2>
      <input ref={urlRef} type="text" placeholder="URL de tu sitio web" />
      <button onClick={() => guardarUrl(urlRef.current?.value ?? '')}>
        Guardar
      </button>
      {urlPerfil && <a href={urlPerfil}>Visitar mi sitio</a>}

      <h2>Calculadora</h2>
      <input ref={calcRef} type="text" placeholder="Ej: 2+2" />
      <button onClick={() => calcular(calcRef.current?.value ?? '')}>
        Calcular
      </button>
      <p>Resultado: {resultadoCalc}</p>

      <h2>Saludo personalizado</h2>
      <input ref={nombreRef} type="text" placeholder="Tu nombre" />
      <button onClick={() => setNombreSaludo(nombreRef.current?.value ?? '')}>
        Saludar
      </button>
      {/* SEGURO: interpolacion JSX escapa automaticamente */}
      <p>Hola, {nombreSaludo}!</p>

      <h2>Notas guardadas</h2>
      <input ref={notaRef} type="text" placeholder="Nueva nota" />
      <button
        onClick={() => {
          const val = notaRef.current?.value ?? '';
          if (val) setNotas((prev) => [...prev, val]);
        }}
      >
        Guardar nota
      </button>
      <ul>
        {/* SEGURO: React escapa cada nota automaticamente */}
        {notas.map((nota, i) => (
          <li key={i}>{nota}</li>
        ))}
      </ul>
    </div>
  );
}
