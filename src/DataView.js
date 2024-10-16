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
            if (schema.properties[key].type === 'object') {  // type이 object인 경우
                initialData[key] = {};
                Object.keys(schema.properties[key].properties).forEach((subKey) => {
                    const subFieldSchema = schema.properties[key].properties[subKey];

                    if (subFieldSchema.type === 'number') {
                        initialData[key][subKey] = subFieldSchema.minimum   // 초기값을 minimum으로 설정
                    } else {
                        initialData[key][subKey] = '';  // 그 외 타입은 빈 값으로 설정
                    }
                });
            } else if (schema.properties[key].type === 'number') {
                initialData[key] = schema.properties[key].minimum || 0;  // 숫자 타입에 대한 처리
            } else {
                initialData[key] = '';   // type이 object가 아닌 경우 
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
            case 'object':
                return (
                    <div key={key} className="object-field">
                        {/* 객체 필드의 제목을 h3 요소로 렌더링 */}
                        <h3>{fieldSchema.title}</h3>

                        {/* 객체 내부의 하위 필드들을 반복하면서 각각의 하위 필드를 렌더링 */}
                        {Object.keys(fieldSchema.properties).map((subKey) => (
                            // 각 하위 필드는 `${key}.${subKey}`로 고유한 키 값을 생성하여 다시 renderField를 호출
                            renderField(`${key}.${subKey}`, fieldSchema.properties[subKey])
                        ))}
                    </div>
                );
            default:
                // 필드 타입이 정의된 케이스가 없을 때 null을 반환
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
