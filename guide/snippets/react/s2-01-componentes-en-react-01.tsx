interface UserCardProps {
  name: string;
  role: string;
}

function UserCard({ name, role }: UserCardProps) {
  return (
    <article className="card">
      <h2>{name}</h2>
      <p>{role}</p>
    </article>
  );
}
