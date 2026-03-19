interface DialogProps {
  title: React.ReactNode;
  actions: React.ReactNode;
  children: React.ReactNode;
}

function Dialog({ title, actions, children }: DialogProps) {
  return (
    <div className="dialog">
      <header>{title}</header>
      <main>{children}</main>
      <footer>{actions}</footer>
    </div>
  );
}
