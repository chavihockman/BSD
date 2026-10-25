

function LanguageSwitcher({ onLanguageChange }) {
  return (
    <div className="toolbar">
      <button onClick={() => onLanguageChange("hebrew")}>עברית</button>
      <button onClick={() => onLanguageChange("english")}>English</button>
      <button onClick={() => onLanguageChange("symbols")}>123</button>
      <button onClick={() => onLanguageChange("emojis")}>😀</button>
    </div>
  );
}


export default LanguageSwitcher;