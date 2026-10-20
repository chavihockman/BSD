

function EditorPanel({ onCharacterClick }) {
  const letters = ["א", "ב", "ג"];


  return (
    <div>
      {letters.map((letter) => (
        <button key={letter} onClick={() => onCharacterClick(letter)}>
          {letter}
        </button>
      ))}
    </div>
  );
}


export default EditorPanel;

