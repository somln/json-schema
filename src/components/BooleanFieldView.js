import React from 'react';
import Switch from "react-switch";

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
        <div style={{ width: '100%' }}>
            {/* title */}
            <div style={{ width: '100%', paddingLeft: '5px', textAlign: 'left' }}>
                <span style={{ fontSize: '14px', color: '#8f8f8f', paddingLeft: '5px' }}>
                    {title}
                </span>
            </div>
            {/* switch */}
            <div style={{ width: '100%', marginTop: '5px' }}>
                <div style={{ width: '100%', textAlign: 'left' }}>
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
