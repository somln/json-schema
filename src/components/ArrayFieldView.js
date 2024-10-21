import React from 'react';
import '../css/FieldView.css';
import { validate } from '../validator';

const ArrayFieldView = ({ title, data = [], updateData, updateIsValid, isEditMode, schema }) => {

 const itemProperties = schema.items.properties;

    const handleItemChange = (index, field, value) => {
        const updatedData = [...data];

        if (itemProperties[field].type === 'number') {
            value = Number(value);
        }

        updatedData[index] = { ...updatedData[index], [field]: value };
        updateData(updatedData);
        updateIsValid(validate(schema, updatedData)); 
    };

    const handleAddItem = () => {
        const newItem = Object.keys(itemProperties).reduce((acc, key) => {
            acc[key] = itemProperties[key].default;
            return acc;
        }, {});
        updateData([...data, newItem]);
    };

    const handleRemoveItem = (index) => {
        const updatedData = data.filter((_, i) => i !== index);
        updateData(updatedData);
    };

    return (
        <div className="array-field-container">
            <h3>{title}</h3>
            <table className="array-field-table">
                <thead>
                    <tr>
                        {Object.keys(itemProperties).map((field) => (
                            <th key={field}>{itemProperties[field].title}</th>
                        ))}
                        {isEditMode && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            {Object.keys(itemProperties).map((field) => (
                                <td key={field}>
                                    {(() => {
                                        switch (itemProperties[field].type) {
                                            case 'boolean':
                                                return (
                                                    <input
                                                        type="checkbox"
                                                        checked={item[field]}
                                                        readOnly={!isEditMode}
                                                        onChange={(e) =>
                                                            handleItemChange(index, field, e.target.checked)
                                                        }
                                                    />
                                                );
                                            case 'number':
                                                return (
                                                    <input
                                                        type="number"
                                                        value={item[field]}
                                                        onChange={(e) => handleItemChange(index, field, e.target.value)}
                                                        readOnly={!isEditMode}
                                                        min={itemProperties[field].minimum}
                                                        max={itemProperties[field].maximum}
                                                    />
                                                );
                                            case 'string':
                                                return (
                                                    <input
                                                        type="text"
                                                        value={item[field]}
                                                        onChange={(e) => handleItemChange(index, field, e.target.value)}
                                                        readOnly={!isEditMode}
                                                        placeholder='영어와 숫자만 입력하세요'
                                                        minLength={itemProperties[field].minLength}
                                                        maxLength={itemProperties[field].maxLength}
                                                    />
                                                );
                                            default:
                                                return null;
                                        }
                                    })()}
                                </td>
                            ))}
                            {isEditMode && (
                                <td>
                                    <button onClick={() => handleRemoveItem(index)}>삭제</button>
                                </td>



                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {isEditMode && (
                <button className="add-item-btn" onClick={handleAddItem}>
                    추가
                </button>
            )}
        </div>
    );
};

export default ArrayFieldView;
