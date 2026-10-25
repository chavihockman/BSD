const keyboardLayouts = {
  hebrew: ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ", "ק", "ר", "ש", "ת", "ך", "ם", "ן", "ף", "ץ"],
  english: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
  symbols: ["0","9","8","7","6","5","4","3","2","1","'", "?", "-", "!", "@", "#", ")", "(", "*", "&", "^", "%", "$", "£", "€", "+", "=", "_", "/", "|"],
  emojis: ["😂", "🤣", "🤪", "😜", "😝", "😛", "😆", "😅", "🙃", "🤭", "🥸","😁", "😄", "😹", "🥴", "🤡", "🤠", "🫠", "🫢", "🫣", "😎", "🤓", "🤯", "😏", "😬"]
};
  
function Keyboard({ language, onCharacterClick, onDeleteCharacter, onDeleteAll }) {
  const characters = keyboardLayouts[language] || [];
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
        </button>
        <button className="key" onClick={() => onCharacterClick(".")}>.</button>
        <button className="key key-function" onClick={onDeleteCharacter}>⌫</button>
      </div>
    </div>
  );
}


export default Keyboard;

