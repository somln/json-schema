import React from 'react';
import Ajv from 'ajv';
import '../css/FieldView.css'; 

const StringFieldView = ({ title, data, updateData, updateIsValidMap, isForEdit, schema }) => {
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
        <div className="field-container">
            <div className="field-title">
                <span>{title}</span>
            </div>
            <div className="field-input">
                <input
                    type="text"
                    value={data}
                    onChange={handleValueChange}
                    readOnly={!isForEdit} 
                    className="input-text"
                    minLength={schema.minLength}  
                    maxLength={schema.maxLength}  
                    pattern={schema.pattern} 
                />
            </div>
        </div>
    );
};

export default StringFieldView;
