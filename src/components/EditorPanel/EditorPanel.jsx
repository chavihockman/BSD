
import { useState } from "react";
import "./EditorPanel.css"
import Keyboard from "./Keyboard";
import LanguageSwitcher from "./LanguageSwitcher";
import StyleControls from "./StyleControls";
import AdvancedActions from "./AdvancedActions";
import FileActions from "./FileActions"

const keyboardLayouts = {
  hebrew: ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ", "ק", "ר", "ש", "ת", "ך", "ם", "ן", "ף", "ץ"],
  english: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
  symbols: ["'", "?", "-", "!", "@", "#", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ")", "("],
  emojis: ["😂", "🤣", "🤪", "😜", "😝", "😛", "😆", "😅", "🙃", "🤭", "🥸","😁", "😄", "😹", "🥴", "🤡", "🤠", "🫠", "🫢", "🫣", "😎", "🤓", "🤯", "😏", "😬"]
};

function EditorPanel({ onCharacterClick, onDeleteCharacter, onDeleteAll, onStyleChange,
  onUndo, applyToAll, onApplyToAllChange, onReplace, onSearch, onOpen, onSave, onSaveAs, onNew, currentFileName, onLogout, currentUser }) {
  const [language, setLanguage] = useState("hebrew");

  return (
    <div className="editor-panel">
      <div className="top-row">
        <AdvancedActions
          onUndo={onUndo}
          onReplace={onReplace}
          onSearch={onSearch} />
                  <FileActions
          onSave={onSave}
          onOpen={onOpen}
          onSaveAs={onSaveAs}
          currentFileName={currentFileName}
          onNew={onNew}
          currentUser={currentUser}
          onLogout={onLogout} />
      </div>

      <div className="chip-row">
        <StyleControls
          onStyleChange={onStyleChange}
          onApplyToAllChange={onApplyToAllChange}
          applyToAll={applyToAll} />
      </div>

            <div className="chip-row">
        <LanguageSwitcher onLanguageChange={setLanguage} />
      </div>
              <Keyboard
          characters={keyboardLayouts[language]}
          onCharacterClick={onCharacterClick}
          onDeleteCharacter={onDeleteCharacter}
          onDeleteAll={onDeleteAll}
        />
    </div>

  );
}
export default EditorPanel;