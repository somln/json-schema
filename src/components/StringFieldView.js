import React from 'react';
import Ajv from 'ajv';

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
        <div className="string-field-container">
            <div className="string-field-title">
                <span>{title}</span>
            </div>
            <div className="string-field-input">
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
