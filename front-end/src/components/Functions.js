function Field({ name, type, value, onChange, children }) {
    return <div className="form-group">
        <label htmlFor={name}>{children}</label>
        <input type={type} value={value} onChange={onChange} id={name} name={name} className="form-control" />
    </div>
}

function TextArea({ name, value, onChange, children }) {
    return <div className="form-group">
        <label htmlFor={name}>{children}</label>
        <textarea type="text" value={value} onChange={onChange} id={name} name={name} className="form-control" rows="5" />
    </div>
}

function Select({ name, value, onChange, children, options }) {
    return <div className="form-group">
        <label htmlFor={name}>{children}</label>
        <select value={value} onChange={onChange} id={name} name={name} className="form-select" multiple>
            {options.map(function (value, index) {
                return <option key={index} value={value[0]}>{value[1]}</option>
            })}
        </select>
    </div>
}

export default Field;
export { Field, TextArea, Select };