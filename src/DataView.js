import React, { useState } from 'react';
import BooleanFieldView from './components/BooleanFieldView';
import StringFieldView from './components/StringFieldView';
import NumberFieldView from './components/NumberFieldView';
import CategoricalStringFieldView from './components/CategoricalStringFieldView';
import './css/DataView.css';
import schema from './dataSchema.json';

const DataView = () => {
    const [booleanData, setBooleanData] = useState(true);
    const [stringData, setStringData] = useState('hello');
    const [numberData, setNumberData] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('Option 1');
    const [isValid, setIsValid] = useState({ booleanData: true, stringData: true, numberData: true, selectedCategory: true });
    const [isEditMode, setIsEditMode] = useState(false);

    const handleFieldValidity = (fieldName, isFieldValid) => {
        setIsValid(prevState => ({
            ...prevState,
            [fieldName]: isFieldValid
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

    const stringSchema = schema.properties.stringData;
    const numberSchema = schema.properties.numberData;
    const categorySchema = schema.properties.selectedCategory;

    return (
        <div className="dataView-container">
            <div className="input-fields-box">
                <div>
                    <BooleanFieldView
                        title={schema.properties.booleanData.title}
                        data={booleanData}
                        updateData={setBooleanData}
                        schema={schema.properties.booleanData}
                        updateIsValidMap={(isValid) => handleFieldValidity('booleanData', isValid)}
                        isForEdit={isEditMode}
                    />
                </div>
                <div>
                    <StringFieldView
                        title={stringSchema.title}
                        data={stringData}
                        updateData={setStringData}
                        schema={stringSchema}
                        updateIsValidMap={(isValid) => handleFieldValidity('stringData', isValid)}
                        isForEdit={isEditMode}
                    />
                </div>
                <div>
                    <NumberFieldView
                        title={numberSchema.title}
                        data={numberData}
                        updateData={setNumberData}
                        schema={numberSchema}
                        updateIsValidMap={(isValid) => handleFieldValidity('numberData', isValid)}
                        isForEdit={isEditMode}
                    />
                </div>
                <div>
                    <CategoricalStringFieldView
                        title={categorySchema.title}
                        data={selectedCategory}
                        updateData={setSelectedCategory}
                        schema={categorySchema}
                        updateIsValidMap={(isValid) => handleFieldValidity('selectedCategory', isValid)}
                        isForEdit={isEditMode}
                    />
                </div>

                <div className="edit-button-container">
                    <button onClick={handleEditClick} disabled={isEditMode}>
                        수정
                    </button>
                    <button onClick={handleSaveClick} disabled={!isEditMode || Object.values(isValid).includes(false)}>
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataView;
