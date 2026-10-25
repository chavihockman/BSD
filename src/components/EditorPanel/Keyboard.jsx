
function Keyboard({ characters, onCharacterClick, onDeleteCharacter, onDeleteAll }) {
  return (
    <div className="keyboard">
      {characters.map((character) => (
        <button
          key={character}
          className="key"
          onClick={() => onCharacterClick(character)}
        >
          {character}
        </button>
      ))}


      <div className="keyboard-bottom-row">
        <button className="key key-function" onClick={onDeleteAll}>
          clear
        </button>
        <button className="key" onClick={() => onCharacterClick(",")}>,</button>
        <button className="key key-space" onClick={() => onCharacterClick(" ")}>
          רווח
        </button>
        <button className="key" onClick={() => onCharacterClick(".")}>.</button>
        <button className="key key-function" onClick={onDeleteCharacter}>⌫</button>
      </div>
    </div>
  );
}


export default Keyboard;

