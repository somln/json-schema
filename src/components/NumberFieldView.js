import React from 'react';
import Ajv from 'ajv';
import '../css/FieldView.css'; 

const NumberFieldView = ({ title, data, updateData, updateIsValidMap, isForEdit, schema }) => {
    const ajv = new Ajv();
    const validate = ajv.compile(schema);

    const handleValueChange = (e) => {
        const newValue = parseFloat(e.target.value);
        if (isForEdit && !isNaN(newValue)) {
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
                    type='number'
                    value={data}
                    onChange={handleValueChange}
                    readOnly={!isForEdit}
                    className='input-number'
                    min={schema.minimum}  
                    max={schema.maximum}  
                    step={1}  
                />
            </div>
        </div>
    );
};

export default NumberFieldView;
