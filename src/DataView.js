import React, { useState, useEffect } from 'react';
import BooleanFieldView from './components/BooleanFieldView';
import StringFieldView from './components/StringFieldView';
import NumberFieldView from './components/NumberFieldView';
import CategoricalStringFieldView from './components/CategoricalStringFieldView';
import './css/DataView.css';
import Ajv from 'ajv';
import schema from './dataSchema.json'; 

const DataView = () => {
    const [booleanData, setBooleanData] = useState(true); 
    const [stringData, setStringData] = useState('Hello'); 
    const [numberData, setNumberData] = useState(0); 
    const [selectedCategory, setSelectedCategory] = useState('Option 1'); 
    const [isValid, setIsValid] = useState(true); 
    const [isEditMode, setIsEditMode] = useState(false);

    const ajv = new Ajv({ allErrors: true }); 
    const validate = ajv.compile(schema); 

    useEffect(() => {
        const formData = {
            booleanData,
            stringData,
            numberData,
            selectedCategory
        };
    
        const valid = validate(formData); 
        setIsValid(valid); 
    }, [booleanData, stringData, numberData, selectedCategory, validate]);

    const handleEditClick = () => {
        setIsEditMode(true);
    };

    const handleSaveClick = () => {
        if (!isValid) {
            console.error('Validation errors:', validate.errors); 
            alert('데이터가 스키마 조건에 맞지 않습니다.');
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
            <div>
                <BooleanFieldView
                    title={schema.properties.booleanData.title}
                    data={booleanData} 
                    updateData={setBooleanData} 
                    updateIsValidMap={setIsValid}
                    isForEdit={isEditMode}
                />
            </div>
            <div>
                <StringFieldView
                    title={stringSchema.title}
                    data={stringData} 
                    updateData={setStringData} 
                    updateIsValidMap={setIsValid}
                    isForEdit={isEditMode}
                    minLength={stringSchema.minLength}  
                    maxLength={stringSchema.maxLength}  
                />
            </div>
            <div>
                <NumberFieldView
                    title={numberSchema.title}
                    data={numberData} 
                    updateData={setNumberData} 
                    updateIsValidMap={setIsValid}
                    isForEdit={isEditMode}
                    min={numberSchema.minimum}  
                    max={numberSchema.maximum}  
                    step={1}  
                />
            </div>
            <div>
                <CategoricalStringFieldView
                    title={categorySchema.title}
                    data={selectedCategory} 
                    updateData={setSelectedCategory} 
                    updateIsValidMap={setIsValid}
                    isForEdit={isEditMode}
                    options={categorySchema.enum}  
                />
            </div>

            <div className="edit-button-container">
                <button onClick={handleEditClick} disabled={isEditMode}>
                    수정
                </button>
                <button onClick={handleSaveClick} disabled={!isEditMode || !isValid}>
                    저장
                </button>
            </div>
        </div>
    );
};

export default DataView;
