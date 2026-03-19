// src/components/PostList.tsx
import { useLikes } from '../hooks/useLikes';

const posts = [
  { id: 1, title: 'Introducción a React Hooks' },
  { id: 2, title: 'State Machines con XState' },
  { id: 3, title: 'Optimistic Updates en la práctica' },
];

export default function PostList() {
  const { likes, toastMessage, toggleLike } = useLikes();

  return (
    <>
      <ul className="posts">
        {posts.map((post) => {
          const likeData = likes[post.id];
          return (
            <li key={post.id} className="post-card">
              <h3>{post.title}</h3>
              {likeData && (
                <button
                  className={`like-button${likeData.liked ? ' liked' : ''}`}
                  onClick={() => toggleLike(post.id)}
                  aria-label={likeData.liked ? 'Quitar like' : 'Dar like'}
                >
                  {likeData.liked ? '\u2764\uFE0F' : '\U0001F90D'}{' '}
                  {likeData.count}
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {toastMessage && (
        <div className="toast" role="alert">
          {toastMessage}
        </div>
      )}
    </>
  );
}
