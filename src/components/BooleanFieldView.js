import React from 'react';
import Switch from "react-switch";
import Ajv from 'ajv';
import '../css/BooleanFieldView.css'; 

const BooleanFieldView = ({ title, data, updateData, updateIsValidMap, isForEdit, schema }) => {
    const ajv = new Ajv();
    const validate = ajv.compile(schema);

    const handleValueChange = (newValue) => {   
        if (isForEdit) {
            updateData(newValue);

            const valid = validate(newValue);
            updateIsValidMap(valid);
        }
    };

    return (
        <div className="boolean-field-container">
            <div className="boolean-field-title">
                <span>{title}</span>
            </div>
            <div className="boolean-field-switch">
                <Switch
                    checked={data}
                    onChange={handleValueChange}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    onColor={"#52b640"}
                    readOnly={!isForEdit}
                />
            </div>
        </div>
    );
};

export default BooleanFieldView;
