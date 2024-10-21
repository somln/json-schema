import React from 'react';
import Switch from "react-switch";
import '../css/FieldView.css'; 

const BooleanFieldView = ({ title, data, updateData, updateIsValid, isEditMode, schema }) => {

    const handleValueChange = (newValue) => {   
        if (isEditMode) {
            updateData(newValue);
            updateIsValid(title);
        }
    };

    return (
        <div className="field-container">
            <div className="field-title">
                <span>{title}</span>
            </div>
            <div className="field-input">
                <Switch
                    checked={data !== undefined ? data : false} 
                    onChange={handleValueChange}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    onColor={"#52b640"}
                    readOnly={!isEditMode}
                />
            </div>
        </div>
    );
};

export default BooleanFieldView;
