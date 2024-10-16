import React, { useState, useEffect } from 'react';
import BooleanFieldView from './components/BooleanFieldView';
import StringFieldView from './components/StringFieldView';
import NumberFieldView from './components/NumberFieldView';
import CategoricalStringFieldView from './components/CategoricalStringFieldView';
import './css/DataView.css';
import schema from './dataSchema.json';

const DataView = () => {
    const [formData, setFormData] = useState({});
    const [isValid, setIsValid] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    
    useEffect(() => {
        const initialData = {};
        const initialValid = {};

        Object.keys(schema.properties).forEach((key) => {
            if (schema.properties[key].type === 'object') {  
                initialData[key] = {};
                Object.keys(schema.properties[key].properties).forEach((subKey) => {
                    const subFieldSchema = schema.properties[key].properties[subKey];

                    if (subFieldSchema.type === 'number') {
                        initialData[key][subKey] = subFieldSchema.minimum;;
                    } else {
                        initialData[key][subKey] = '';  
                    }
                });
            } else if (schema.properties[key].type === 'number') {
                initialData[key] = schema.properties[key].minimum;
            } else {
                initialData[key] = '';  
            }
            initialValid[key] = true;
        });

        setFormData(initialData);
        setIsValid(initialValid);
    }, []); 

    const handleFieldValidity = (fieldName, isFieldValid) => {
        setIsValid((prevState) => ({
            ...prevState,
            [fieldName]: isFieldValid,
        }));
    };

    const handleFieldData = (fieldName, val) =>  { 
        setFormData((prevState) => ({
        ...prevState,
        [fieldName]: val,  
        }));
    }; 

    const handleEditClick = () => {
        setIsEditMode(true);
    };

    const handleSaveClick = () => {
        if (Object.values(isValid).includes(false)) {
            alert('유효하지 않은 데이터가 있습니다. 다시 확인해주세요.');
            return;
        }

        setIsEditMode(false);
        alert('데이터가 저장되었습니다.');
    };

    const renderField = (key, fieldSchema) => {
        switch (fieldSchema.type) {
            case 'boolean':
                return (
                    <BooleanFieldView
                        key={key} 
                        title={fieldSchema.title}
                        data={formData[key]}
                        updateData={(val) => handleFieldData(key, val)}
                        schema={fieldSchema}
                        updateIsValid={(isValid) => handleFieldValidity(key, isValid)}
                        isForEdit={isEditMode}
                    />
                );
            case 'string':
                if (fieldSchema.enum) {
                    return (
                        <CategoricalStringFieldView
                            key={key} 
                            title={fieldSchema.title}
                            data={formData[key]}
                            updateData={(val) => handleFieldData(key, val)}
                            schema={fieldSchema}
                            updateIsValid={(isValid) => handleFieldValidity(key, isValid)}
                            isForEdit={isEditMode}
                        />
                    );
                } else {
                    return (
                        <StringFieldView
                            key={key} 
                            title={fieldSchema.title}
                            data={formData[key]}
                            updateData={(val) => handleFieldData(key, val)}
                            schema={fieldSchema}
                            updateIsValid={(isValid) => handleFieldValidity(key, isValid)}
                            isForEdit={isEditMode}
                        />
                    );
                }
            case 'number':
                return (
                    <NumberFieldView
                        key={key} 
                        title={fieldSchema.title}
                        data={formData[key]}
                        updateData={(val) => handleFieldData(key, val)}
                        schema={fieldSchema}
                        updateIsValid={(isValid) => handleFieldValidity(key, isValid)}
                        isForEdit={isEditMode}
                    />
                );
            case 'object':
                return (
                    <div key={key} className="object-field">
                        <h3>{fieldSchema.title}</h3>

                        {/* 객체 내부의 하위 필드들을 반복하면서 각각의 하위 필드를 렌더링 */}
                        {Object.keys(fieldSchema.properties).map((subKey) => (
                            renderField(`${key}.${subKey}`, fieldSchema.properties[subKey])
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="dataView-container">
            <div className="input-fields-box">
                {Object.keys(schema.properties).map((key) =>
                    renderField(key, schema.properties[key])
                )}

                <div className="edit-button-container">
                    <button onClick={handleEditClick} disabled={isEditMode}>
                        수정
                    </button>
                    <button
                        onClick={handleSaveClick}
                        disabled={!isEditMode || Object.values(isValid).includes(false)}
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataView;
