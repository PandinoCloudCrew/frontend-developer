// src/components/ContactForm.tsx — React Hook Form + Zod
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactForm } from '../schemas/contact.schema';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactFormPage() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur', // validación al salir del campo
  });

  const onSubmit = async (data: ContactForm) => {
    if (submitState === 'submitting') return;

    setSubmitState('submitting');
    try {
      // Simular envío al servidor (2 segundos)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitState('success');
      reset();
    } catch {
      setSubmitState('error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          {...register('name')}
          aria-invalid={errors.name ? 'true' : undefined}
        />
        {errors.name && (
          <p className="error" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          aria-invalid={errors.email ? 'true' : undefined}
        />
        {errors.email && (
          <p className="error" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="subject">Asunto</label>
        <input
          id="subject"
          {...register('subject')}
          aria-invalid={errors.subject ? 'true' : undefined}
        />
        {errors.subject && (
          <p className="error" role="alert">
            {errors.subject.message}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="message">Mensaje</label>
        <textarea
          id="message"
          rows={5}
          {...register('message')}
          aria-invalid={errors.message ? 'true' : undefined}
        />
        {errors.message && (
          <p className="error" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <button type="submit" disabled={submitState === 'submitting'}>
        {submitState === 'submitting' ? 'Enviando...' : 'Enviar mensaje'}
      </button>

      {submitState === 'success' && (
        <p className="success" role="status">
          ¡Mensaje enviado correctamente!
        </p>
      )}
      {submitState === 'error' && (
        <p className="error" role="alert">
          Error al enviar. Inténtalo de nuevo.
        </p>
      )}
    </form>
  );
}
