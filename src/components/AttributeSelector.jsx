// Renders a row of clickable "pill" buttons for choosing one value from a list.
// This satisfies the requirement that attributes are set "by clicking on one
// of several values" rather than typing free text or using a dropdown.
export default function AttributeSelector({ label, options, value, onChange }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="attribute-options">
        {options.map((option) => (
          <button
            type="button"
            key={option}
            className={`attribute-option ${value === option ? 'selected' : ''}`}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
