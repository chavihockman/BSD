const styleGroups = [
  {
    title: "צבע",
    property: "color",
    options: [
      { label: "שחור", value: "black" },
      { label: "אדום", value: "red" },
      { label: "כחול", value: "blue" },
      { label: "ירוק", value: "green" },
      { label: "צהוב", value: "yellow" },
      { label: "סגול", value: "purple" },
      { label: "כתום", value: "orange" },
      { label: "ורוד", value: "pink" },
      { label: "חום", value: "brown" },
      { label: "אפור", value: "gray" },
    ],
  },
  {
    title: "גודל",
    property: "fontSize",
    options: [
      { label: "קטן", value: "18px" },
      { label: "בינוני", value: "24px" },
      { label: "גדול", value: "36px" },
    ],
  },
  {
    title: "גופן",
    property: "fontFamily",
    options: [
      { label: "Arial", value: "Arial" },
      { label: "Courier", value: "Courier New" },
      { label: "Times", value: "Times New Roman" },
      { label: "Tahoma", value: "Tahoma" },
      { label: "Segoe UI", value: "Segoe UI" },
    ],
  },
];


function StyleControls({ onStyleChange, onApplyToAllChange, applyToAll }) {
  return (
    <div className="toolbar">
      {styleGroups.map((group) => (
        <select
          defaultValue=""
          key={group.property}
          onChange={(event) => onStyleChange(group.property, event.target.value)}>
          <option value="" disabled="hidden">{group.title}</option>
          {group.options.map((option) => (
            <option key={option.label} value={option.value}>{option.label}</option>
          ))}
        </select>
      ))}
      <button
        className={applyToAll ? "toggle toggle-on" : "toggle"}
        onClick={() => onApplyToAllChange(!applyToAll)}>
        {applyToAll ? "כל הטקסט" : "מכאן והלאה"}
      </button>
    </div>
  );
}
export default StyleControls;

