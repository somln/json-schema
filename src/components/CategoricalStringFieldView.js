import React from "react";
import '../css/FieldView.css'; 
import { validate } from '../validator';

const CategoricalStringFieldView = ({ title, data, updateData, updateIsValid, isEditMode, schema }) => {

    const handleValueChange = (e) => {
        const newValue = e.target.value;
        if (isEditMode) {
            updateData(newValue); 
            updateIsValid(validate(schema, newValue));
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
                    disabled={!isEditMode}
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
}

export default CategoricalStringFieldView;
