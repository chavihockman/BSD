function DeleteActions({ onDeleteCharacter, onDeleteAll }) {
  return (
    <div className="toolbar">
      <button onClick={onDeleteCharacter}>מחק תו</button>
      <button onClick={onDeleteAll}>מחק הכול</button>
    </div>
  );
}


export default DeleteActions;