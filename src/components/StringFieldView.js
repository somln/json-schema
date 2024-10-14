import React from 'react';

const StringFieldView = ({ title, data, updateData, updateIsValidMap, isForEdit, minLength, maxLength, pattern = null }) => {

    const handleValueChange = (e) => {   
        const newValue = e.target.value;
        if (isForEdit) {    
            updateData(newValue);   
            updateIsValidMap(true);  
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
                    minLength={minLength} 
                    maxLength={maxLength}  
                    pattern={pattern || undefined} 
                />
            </div>
        </div>
    );
};

export default StringFieldView;
