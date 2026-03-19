<Dialog
  title={<h2>Confirmar eliminación</h2>}
  actions={
    <>
      <button onClick={cancel}>Cancelar</button>
      <button onClick={confirm}>Eliminar</button>
    </>
  }
>
  <p>¿Estás seguro de que quieres eliminar este elemento?</p>
</Dialog>
