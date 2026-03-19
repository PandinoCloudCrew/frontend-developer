// src/components/FormularioUsuario.tsx — Validacion con React Hook Form + Zod
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usuarioSchema, type UsuarioForm } from '../schemas/usuario.schema';
import { useState } from 'react';

export default function FormularioUsuario() {
  const [mensajeExito, setMensajeExito] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsuarioForm>({
    resolver: zodResolver(usuarioSchema),
  });

  async function onSubmit(data: UsuarioForm) {
    setMensajeExito('');
    try {
      const res = await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json();
        // El servidor tambien valido y rechazo
        console.error('Errores del servidor:', body.errors);
        return;
      }
      setMensajeExito('Usuario creado exitosamente');
    } catch {
      console.error('Error al enviar los datos');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Nombre:
        <input type="text" {...register('nombre')} />
        {errors.nombre && <span className="error">{errors.nombre.message}</span>}
      </label>

      <label>
        Email:
        <input type="email" {...register('email')} />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </label>

      <label>
        Edad:
        <input type="number" {...register('edad', { valueAsNumber: true })} />
        {errors.edad && <span className="error">{errors.edad.message}</span>}
      </label>

      <label>
        Sitio web (opcional):
        <input type="url" {...register('sitioWeb')} />
        {errors.sitioWeb && (
          <span className="error">{errors.sitioWeb.message}</span>
        )}
      </label>

      {mensajeExito && <p className="exito">{mensajeExito}</p>}

      <button type="submit">Enviar</button>
    </form>
  );
}
