

import { useState } from "react";
import "./App.css";
import TextDisplay from "./components/TextDisplay/TextDisplay";
import EditorPanel from "./components/EditorPanel/EditorPanel";
import { saveFile, loadFile, fileExists, deleteFile } from "./fileStorage";
import LoginScreen from "./components/LoginScreen/LoginScreen";

const DEFAULT_TEXT_STYLE = { color: "black", fontSize: 24, fontFamily: "Courier" };

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [textStyle, setTextStyle] = useState(DEFAULT_TEXT_STYLE);
  const [applyToAll, setApplyToAll] = useState(true);
  const [highlightedCharacter, setHighlightedCharacter] = useState("");
  const [documents, setDocuments] = useState([{ characters: [], history: [], fileName: "" }]);
  const [activeIndex, setActiveIndex] = useState(0);

  const document = documents[activeIndex];
  const characters = document.characters;
  const history = document.history;
  const currentFileName = document.fileName

  function getHistoryWithCurrentState() {
    return [...history, { characters, textStyle, fileName: currentFileName }];
  }

  function createEmptyDocument() {
    return { characters: [], history: [], fileName: "" };
  }

  function clearHighlight() {
    setHighlightedCharacter("");
  }

  function addCharacter(character) {
    updateDocument({
      history: getHistoryWithCurrentState(),
      characters: [...characters, { character, style: textStyle }],
    });
  }

  function deleteLastCharacter() {
    updateDocument({
      history: getHistoryWithCurrentState(),
      characters: characters.slice(0, -1),
    });
  }

  function deleteAllText() {
    clearHighlight();
    updateDocument({
      history: getHistoryWithCurrentState(),
      characters: [],
    });
  }


  function changeTextStyle(styleProperty, value) {
    setTextStyle({ ...textStyle, [styleProperty]: value });
    if (applyToAll) {
      updateDocument({
        history: getHistoryWithCurrentState(),
        characters: characters.map((item) => ({
          ...item,
          style: { ...item.style, [styleProperty]: value },
        })),
      });
    } else {
      updateDocument({ history: getHistoryWithCurrentState() });
    }
  }


  function undoLastAction() {
    if (history.length === 0) return;
    clearHighlight();
    const previousState = history[history.length - 1];
    setTextStyle(previousState.textStyle);
    updateDocument({
      characters: previousState.characters,
      fileName: previousState.fileName,
      history: history.slice(0, -1),
    });
  }

  function replaceCharacter(characterToFind, replacement) {
    if (characterToFind === "") return;
    clearHighlight();
    updateDocument({
      history: getHistoryWithCurrentState(),
      characters: characters.map((item) =>
        item.character === characterToFind
          ? { ...item, character: replacement }
          : item
      ),
    });
  }

  function isNewFile() {
    return currentFileName === "";
  }


  function saveCurrentFile() {
    saveFile(currentUser, currentFileName, characters);
  }

  function saveAsNewName(newFileName) {
    if (newFileName === "") return;
    if (newFileName === currentFileName) return;
    if (fileExists(currentUser, newFileName) && !window.confirm("הקובץ קיים. לדרוס אותו?")) return;
    saveFile(currentUser, newFileName, characters);
    if (!isNewFile()) {
      deleteFile(currentUser, currentFileName);
    }
    updateDocument({ fileName: newFileName });
  }

  function openSavedText(fileName) {
    const loadedCharacters = loadFile(currentUser, fileName);
    if (loadedCharacters === null) {
      alert("הקובץ לא קיים.");
      return;
    }
    clearHighlight();
    updateDocument({
      history: getHistoryWithCurrentState(),
      characters: loadedCharacters,
      fileName: fileName,
    });
  }

  function startNewFile() {
    clearHighlight();
    setDocuments([...documents, createEmptyDocument()]);
    setActiveIndex(documents.length);
  }

  function updateDocument(changes) {
    setDocuments(
      documents.map((doc, index) =>
        index === activeIndex ? { ...doc, ...changes } : doc
      )
    );
  }

  function focusDocument(index) {
    clearHighlight();
    setActiveIndex(index);
  }

  function offerToSaveDocument(doc) {
    if (doc.characters.length === 0 || doc.fileName !== "") return;
    if (!window.confirm("לשמור את הטקסט לפני הסגירה?")) return;
    const fileName = window.prompt("שם הקובץ:");
    if (fileName) {
      saveFile(currentUser, fileName, doc.characters);
    }
  }

  function closeDocument(index) {
    if (documents.length === 1) return;
    offerToSaveDocument(documents[index]);
    clearHighlight();
    setDocuments(documents.filter((doc, docIndex) => docIndex !== index));
    setActiveIndex(getActiveIndexAfterClose(index));
  }

  function getActiveIndexAfterClose(closedIndex) {
    if (closedIndex < activeIndex) return activeIndex - 1;
    if (closedIndex === activeIndex) return Math.max(0, closedIndex - 1);
    return activeIndex;
  }

  function logoutUser() {
    documents.forEach(offerToSaveDocument);
    clearHighlight();
    setDocuments([createEmptyDocument()]);
    setActiveIndex(0);
    setCurrentUser("");
    setTextStyle(DEFAULT_TEXT_STYLE);
    setApplyToAll(true);
  }


  if (currentUser === "") {
    return <LoginScreen onLoginSuccess={setCurrentUser} />;
  }
  else {
    return (
      <div>
        <div className="documents-area">
          {documents.map((doc, index) => (
            <TextDisplay
              key={index}
              characters={doc.characters}
              highlightedCharacter={index === activeIndex ? highlightedCharacter : ""}
              isActive={index === activeIndex}
              onFocus={() => focusDocument(index)}
              onClose={() => closeDocument(index)}
            />
          ))}
        </div>
        <div className="app">
          <EditorPanel
            onCharacterClick={addCharacter}
            onDeleteCharacter={deleteLastCharacter}
            onDeleteAll={deleteAllText}
            onStyleChange={changeTextStyle}
            onUndo={undoLastAction}
            applyToAll={applyToAll}
            onApplyToAllChange={setApplyToAll}
            onReplace={replaceCharacter}
            onSearch={setHighlightedCharacter}
            onSave={saveCurrentFile}
            onOpen={openSavedText}
            onSaveAs={saveAsNewName}
            currentFileName={currentFileName}
            onNew={startNewFile}
            currentUser={currentUser}
            onLogout={logoutUser}
          />
        </div>
      </div>
    );
  }
}
export default App;


