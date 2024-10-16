import React, { useState } from 'react';
import Ajv from 'ajv';
import '../css/FieldView.css'; 

const StringFieldView = ({ title, data, updateData, updateIsValid, isForEdit, schema }) => {
    const [errorMessage, setErrorMessage] = useState(''); 
    const ajv = new Ajv();
    const validate = ajv.compile(schema);

    const handleValueChange = (e) => {
        const newValue = e.target.value;
        if (isForEdit) {
            updateData(newValue);
            const valid = validate(newValue);

            if (!valid) {
                if (newValue.length < schema.minLength) {
                    setErrorMessage(`최소 ${schema.minLength}자 이상이어야 합니다.`);
                } else if (newValue.length > schema.maxLength) {
                    setErrorMessage(`최대 ${schema.maxLength}자 이하이어야 합니다.`);
                } else if (!new RegExp(schema.pattern).test(newValue)) {
                    setErrorMessage("알파벳 소문자와 숫자만 입력 가능합니다.");
                }
            } else {
                setErrorMessage('');
            }

            updateIsValid(valid);
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
