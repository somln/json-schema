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
            initialData[key] = ''; 
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
                        updateData={(val) => setFormData({ ...formData, [key]: val })}
                        schema={fieldSchema}
                        updateIsValidMap={(isValid) => handleFieldValidity(key, isValid)}
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
                            updateData={(val) => setFormData({ ...formData, [key]: val })}
                            schema={fieldSchema}
                            updateIsValidMap={(isValid) => handleFieldValidity(key, isValid)}
                            isForEdit={isEditMode}
                        />
                    );
                } else {
                    return (
                        <StringFieldView
                            key={key}
                            title={fieldSchema.title}
                            data={formData[key]}
                            updateData={(val) => setFormData({ ...formData, [key]: val })}
                            schema={fieldSchema}
                            updateIsValidMap={(isValid) => handleFieldValidity(key, isValid)}
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
                        updateData={(val) => setFormData({ ...formData, [key]: val })}
                        schema={fieldSchema}
                        updateIsValidMap={(isValid) => handleFieldValidity(key, isValid)}
                        isForEdit={isEditMode}
                    />
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
