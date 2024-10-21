import React, { useState } from 'react';
import '../css/FieldView.css'; 
import { validate } from '../validator';

const StringFieldView = ({ title, data, updateData, updateIsValid, isEditMode, schema }) => {
    const [errorMessage, setErrorMessage] = useState('');
    
    const handleValueChange = (e) => {
        const newValue = e.target.value;
        if (isEditMode) {

            updateData(newValue);
            const valid = validate(schema, newValue);
            if (valid) {
                updateIsValid(true);
                setErrorMessage('');
            } else {
                updateIsValid(false);
                setErrorMessage('유효하지 않은 입력입니다.');
            }
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
                    readOnly={!isEditMode}
                    defaultValue={schema.default}
                    minLength={schema.minLength}
                    maxLength={schema.maxLength}
                    pattern={schema.pattern}
                />
            </div>
            <div className="error-message">
                {errorMessage}
            </div>
        </div>
    );
};

export default StringFieldView;
