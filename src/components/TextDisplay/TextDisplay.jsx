import "./TextDisplay.css";


function TextDisplay({ characters, highlightedCharacter, isActive, onFocus, onClose }) {
  function isHighlighted(item) {
    return highlightedCharacter !== "" && item.character === highlightedCharacter;
  }


  return (
    <div
      onClick={onFocus}
      className={isActive ? "text-display text-display-active" : "text-display"}
    >
      <button
        className="close-button"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
      >
        X
      </button>
      {characters.map((item, index) => (
        <span
          key={index}
          style={{
            ...item.style,
            backgroundColor: isHighlighted(item) ? "yellow" : "transparent",
          }}
        >
          {item.character}
        </span>
      ))}
    </div>
  );
}


export default TextDisplay;