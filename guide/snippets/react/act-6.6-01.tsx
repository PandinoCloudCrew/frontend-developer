// src/components/PostCard.tsx — Optimistic update con rollback y TanStack Query retry
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface PostCardProps {
  postId: string;
  title: string;
  content: string;
  initialLiked?: boolean;
  initialLikeCount?: number;
}

async function toggleLikeApi(postId: string) {
  const res = await fetch(`/api/posts/${postId}/like`, { method: 'POST' });
  if (!res.ok) throw new Error('Error al guardar like');
  return res.json() as Promise<{ liked: boolean }>;
}

export default function PostCard({
  postId,
  title,
  content,
  initialLiked = false,
  initialLikeCount = 0,
}: PostCardProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [error, setError] = useState('');

  const mutation = useMutation({
    mutationFn: () => toggleLikeApi(postId),
    // TanStack Query retry con exponential backoff
    retry: 3,
    retryDelay: (attempt) => Math.pow(2, attempt) * 1000, // 1s, 2s, 4s
    onMutate: () => {
      // 1. Guardar estado anterior (para rollback)
      const prevLiked = liked;
      const prevCount = likeCount;

      // 2. Optimistic update
      setLiked(!prevLiked);
      setLikeCount(prevCount + (!prevLiked ? 1 : -1));
      setError('');

      return { prevLiked, prevCount };
    },
    onError: (_err, _vars, context) => {
      // 3. Rollback
      if (context) {
        setLiked(context.prevLiked);
        setLikeCount(context.prevCount);
      }
      setError('No se pudo guardar. Intenta de nuevo.');
    },
  });

  return (
    <article className="post-card">
      <h3>{title}</h3>
      <p>{content}</p>
      <button
        onClick={() => mutation.mutate()}
        className={liked ? 'liked' : ''}
        disabled={mutation.isPending}
      >
        {liked ? '\u2764\ufe0f' : '\ud83e\udd0d'} {likeCount}
      </button>
      {error && <span className="error-inline">{error}</span>}
    </article>
  );
}
