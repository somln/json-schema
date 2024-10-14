import React from 'react';
import Switch from "react-switch";
import '../css/BooleanFieldView.css'; 

const BooleanFieldView = ({ title, data, updateData, updateIsValidMap, isForEdit }) => {

    const handleValueChange = (newValue) => {   
        if (isForEdit) {   
            updateData(newValue);   
            updateIsValidMap(true); 
        } else {
            return;
        }
    };

    return (
        <div className="boolean-field-container">
            {/* title */}
            <div className="boolean-field-title">
                <span>{title}</span>
            </div>
            {/* switch */}
            <div className="boolean-field-switch">
                <div className="boolean-field-switch-inner">
                    {
                        isForEdit ? 
                            <Switch
                                checked={data}
                                onChange={handleValueChange}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                onColor={"#52b640"}
                            /> 
                            : 
                            <Switch
                                checked={data}
                                onChange={() => {}}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                onColor={"#008000"}
                            />
                    }
                </div>
            </div>
        </div>
    );
};

export default BooleanFieldView;
