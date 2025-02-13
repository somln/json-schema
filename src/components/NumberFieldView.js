import React from 'react';
import '../css/FieldView.css'; 
import { validate } from '../validator';

const NumberFieldView = ({ title, data, updateData, updateIsValid, isEditMode, schema }) => {

    const handleValueChange = (e) => {

        const newValue = parseFloat(e.target.value);
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
                <input
                    type='number'
                    value={data}
                    onChange={handleValueChange}
                    readOnly={!isEditMode}
                    defaultValue={schema.minimum}
                    min={schema.minimum}  
                    max={schema.maximum}  
                    step={1}  
                />
            </div>
        </div>
    );
};

export default NumberFieldView;
