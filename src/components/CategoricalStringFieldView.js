import React from "react";
import Ajv from 'ajv';

const CategoricalStringFieldView = ({ title, data, updateData, updateIsValidMap, isForEdit, schema }) => {
    const ajv = new Ajv();
    const validate = ajv.compile(schema);

    const handleValueChange = (e) => {
        const newValue = e.target.value;
        if (isForEdit) {
            updateData(newValue);

            const valid = validate(newValue);
            updateIsValidMap(valid);
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
                    {schema.enum.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default CategoricalStringFieldView;
