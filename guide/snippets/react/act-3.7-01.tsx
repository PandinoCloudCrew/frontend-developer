// src/hooks/useLikes.ts — optimistic updates con TanStack Query
import { useState, useCallback } from 'react';

export interface LikeState {
  [postId: number]: { liked: boolean; count: number };
}

async function sendToServer(
  postId: number,
  liked: boolean,
  retries = 3,
): Promise<void> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'POST',
          body: JSON.stringify({ postId, liked }),
          headers: { 'Content-Type': 'application/json' },
        },
      );
      if (!res.ok) throw new Error('Server error');
      return;
    } catch (error) {
      if (attempt < retries - 1) {
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`Retry ${attempt + 1}/${retries - 1} en ${delay}ms...`);
        await new Promise((r) => setTimeout(r, delay));
      } else {
        throw error;
      }
    }
  }
}

export function useLikes() {
  const [likes, setLikes] = useState<LikeState>({
    1: { liked: false, count: 12 },
    2: { liked: true, count: 7 },
    3: { liked: false, count: 23 },
  });
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const toggleLike = useCallback(async (postId: number) => {
    setLikes((prev) => {
      const current = prev[postId];
      if (!current) return prev;
      const newLiked = !current.liked;
      return {
        ...prev,
        [postId]: {
          liked: newLiked,
          count: newLiked ? current.count + 1 : current.count - 1,
        },
      };
    });

    // Guardar estado anterior para rollback
    let previousState: LikeState;
    setLikes((prev) => {
      previousState = prev;
      return prev;
    });

    try {
      const current = likes[postId];
      await sendToServer(postId, !current.liked);
    } catch {
      // Rollback
      setLikes((prev) => {
        const current = prev[postId];
        if (!current) return prev;
        return {
          ...prev,
          [postId]: {
            liked: !current.liked,
            count: !current.liked
              ? current.count + 1
              : current.count - 1,
          },
        };
      });
      showToast('No se pudo guardar. Inténtalo de nuevo.');
    }
  }, [likes]);

  return { likes, toastMessage, toggleLike };
}
