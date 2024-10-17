import React, { useState} from 'react';
import BooleanFieldView from './components/BooleanFieldView';
import StringFieldView from './components/StringFieldView';
import NumberFieldView from './components/NumberFieldView';
import CategoricalStringFieldView from './components/CategoricalStringFieldView';
import ArrayFieldView from './components/ArrayFieldView';
import './css/DataView.css';
import schema from './dataSchema.json';

const DataView = () => {
    const [formData, setFormData] = useState({});
    const [isValid, setIsValid] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);

    const handleFieldValidity = (fieldName, isFieldValid) => {
        setIsValid((prevState) => ({    // isValid 객체를 업데이트
            ...prevState,               
            [fieldName]: isFieldValid,   // fieldName 키에 해당하는 값만 업데이트
        }));
    };

    const handleFieldData = (fieldName, val) =>  {   // formData 객체를 업데이트
        setFormData((prevState) => ({        
        ...prevState, 
        [fieldName]: val,          // fieldName 키에 해당하는 값만 업데이트
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
                        isEditMode={isEditMode}
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
                            isEditMode={isEditMode}
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
                            isEditMode={isEditMode}
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
                        isEditMode={isEditMode}
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
            case 'array':
                return (
                    <div key={key} className="array-field">
                        <ArrayFieldView
                        key={key} 
                        title={fieldSchema.title}
                        data={formData[key]}
                        updateData={(val) => handleFieldData(key, val)}
                        schema={fieldSchema}
                        updateIsValid={(isValid) => handleFieldValidity(key, isValid)}
                        isEditMode={isEditMode}
                    />    
                    </div>
                )    
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

/*
formData 객체의 구조 예시
{
  "booleanData": true,
  "stringData": "validdata",
  "numberData": 42,
  "selectedCategory": "Option 2",
  "objectData": {
    "subBoolean": false,
    "subString": "hello",
    "subNumber": 25,
    "subCategory": "Option 1"
  },
  "ArrayData": [
    {
      "subString": "item1",
      "subNumber": 10,
      "subBoolean": true
    },
    {
      "subString": "item2",
      "subNumber": 20,
      "subBoolean": false
    }
  ]
}
*/

/*
isValid 객체의 구조 예시
{
  "booleanData": true,
  "stringData": true,
  "numberData": true,
  "selectedCategory": true,
  "objectData.subBoolean": true,
  "objectData.subString": true,
  "objectData.subNumber": true,
  "objectData.subCategory": true,
  "ArrayData.0.subString": true,
  "ArrayData.0.subNumber": true,
  "ArrayData.0.subBoolean": true,
  "ArrayData.1.subString": true,
  "ArrayData.1.subNumber": false,
  "ArrayData.1.subBoolean": true
}
*/