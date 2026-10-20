
import { useState } from "react";
import TextDisplay from "./Component/TextDisplay/TextDisplay";
import EditorPanel from "./Component/EditorPanel/EditorPanel";

function App() {
  const [text, setText] = useState("");

  function addCharacter(character) {
    setText(text + character);
  }


  return (
    <div>
     <TextDisplay text={text} />
      <EditorPanel onCharacterClick={addCharacter} />
    </div>
  );
}
export default App;