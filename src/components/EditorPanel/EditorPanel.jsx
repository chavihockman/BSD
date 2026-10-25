
import { useState } from "react";
import "./EditorPanel.css"
import Keyboard from "./Keyboard";
import LanguageSwitcher from "./LanguageSwitcher";
import StyleControls from "./StyleControls";
import AdvancedActions from "./AdvancedActions";
import FileActions from "./FileActions"

function EditorPanel({ onCharacterClick, onDeleteCharacter, onDeleteAll, onStyleChange,
  onUndo, applyToAll, onApplyToAllChange, onReplace, onSearch, onOpen, onSave, onSaveAs, onNew, currentFileName, onLogout, currentUser }) {
  const [language, setLanguage] = useState("hebrew");

  return (
    <div className="editor-panel">
      <div className="top-row">
        <AdvancedActions 
          className="advanced-actions"
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
          language={language}
          onCharacterClick={onCharacterClick}
          onDeleteCharacter={onDeleteCharacter}
          onDeleteAll={onDeleteAll}
        />
    </div>

  );
}
export default EditorPanel;