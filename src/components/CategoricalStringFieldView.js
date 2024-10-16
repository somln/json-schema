import React from "react";
import Ajv from 'ajv';
import '../css/FieldView.css'; 

const CategoricalStringFieldView = ({ title, data, updateData, updateIsValid, isForEdit, schema }) => {
    const ajv = new Ajv();
    const validate = ajv.compile(schema);

    const handleValueChange = (e) => {
        const newValue = e.target.value
        if (isForEdit) {
            updateData(newValue); 
            updateIsValid(validate(newValue));
        }
    };

    return (
        <div className="field-container">
            <div className="field-title">
                <span>{title}</span>
            </div>
            <div className="field-input">
                <select
                    value={data}
                    onChange={handleValueChange}
                    readOnly={!isForEdit}
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
