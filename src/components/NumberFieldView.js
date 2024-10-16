import React from 'react';
import Ajv from 'ajv';
import '../css/FieldView.css'; 

const NumberFieldView = ({ title, data, updateData, updateIsValid, isForEdit, schema }) => {
    const ajv = new Ajv();
    const validate = ajv.compile(schema);

    const handleValueChange = (e) => {
        const newValue = parseFloat(e.target.value);
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
                <input
                    type='number'
                    value={data}
                    onChange={handleValueChange}
                    readOnly={!isForEdit}
                    min={schema.minimum}  
                    max={schema.maximum}  
                    step={1}  
                />
            </div>
        </div>
    );
};

export default NumberFieldView;
