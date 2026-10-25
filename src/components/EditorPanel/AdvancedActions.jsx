import { useState } from "react";

function AdvancedActions({ onUndo, onReplace , onSearch }) {
  const [characterToFind, setCharacterToFind] = useState("");
  const [replacement, setReplacement] = useState("");
  const [characterToSearch, setCharacterToSearch] = useState("");

  return (
    <div className="toolbar">
      <button onClick={onUndo}>בטל</button>
        <input
        value={characterToSearch}
        onChange={(event) => {setCharacterToSearch(event.target.value);
             onSearch(event.target.value)}}
        placeholder="תו לחיפוש"
        maxLength={1}
        />
        <input
        value={replacement}
        onChange={(event) => setReplacement(event.target.value)}
        placeholder="להחליף ב..."
        maxLength={1}
        />
       <button onClick={() => onReplace(characterToSearch, replacement)}>החלף </button>
    </div>
  );
}

export default AdvancedActions;