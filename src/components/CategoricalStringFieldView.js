import React from "react";

const CategoricalStringFieldView = ({ title, data, updateData, updateIsValidMap, isForEdit, options }) => {
    const handleValueChange = (e) => {
        const newValue = e.target.value;
        if (isForEdit) {
            updateData(newValue);
            updateIsValidMap(true);
        }
    };

    return (
        <div className="categorical-field-container">
            <div className="categorical-field-title">
                <span>{title}</span>
            </div>
            <div className="categorical-field-input">
                <select
                    value={data}
                    onChange={handleValueChange}
                    readOnly={!isForEdit}
                    className="input-text"
                >
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default CategoricalStringFieldView;
