
import { useState } from "react";
function FileActions({ onSave, onOpen, onSaveAs, currentFileName, onNew, currentUser, onLogout }) {
  const [fileName, setFileName] = useState("");

  function runAndClearField(action) {
    action(fileName);
    setFileName("");
  }

  return (
    <div className="file-actions">
      <div className="file-info">
        <span>קובץ פתוח: {currentFileName || "ללא שם"}</span>
        <span>משתמש: {currentUser}</span>
      </div>
      <div className="toolbar">
        <input
          value={fileName}
          onChange={(event) => setFileName(event.target.value)}
          placeholder="שם קובץ"
        />
        <button onClick={() => { onNew(); setFileName(""); }}>חדש</button>
        <button onClick={onSave} disabled={currentFileName === ""}>שמור</button>
        <button onClick={() => runAndClearField(onSaveAs)}>שמור בשם</button>
        <button onClick={() => runAndClearField(onOpen)}>פתח</button>
        <button onClick={onLogout}>יציאה</button>
      </div>
    </div>
  );
}
export default FileActions;
