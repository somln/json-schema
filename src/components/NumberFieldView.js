import React from 'react';

const NumberFieldView = ({ title, data, updateData, updateIsValidMap, isForEdit, min, max, step}) => {

    const handleValueChange = (e) => {
        const newValue = parseFloat(e.target.value); 
        if (isForEdit && !isNaN(newValue)) {
            if (newValue >= min && newValue <= max) {
                updateData(newValue); 
                updateIsValidMap(true);
            }
        }
    };

    return (
        <div className='number-field-container'>
            <div className="string-field-title">
                <span>{title}</span>
            </div>
            <div className='number-field-input'>
                <input
                    type='number'
                    value={data}
                    onChange={handleValueChange}
                    readOnly={!isForEdit}
                    className='input-number'
                    min={min}  
                    max={max}  
                    step={step} 
                />
            </div>
        </div>
    );
}

export default NumberFieldView;
