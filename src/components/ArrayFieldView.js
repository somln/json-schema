import React from 'react';
import Ajv from 'ajv';
import '../css/FieldView.css';

const ArrayFieldView = ({ title, data = [], updateData, updateIsValid, isEditMode, schema }) => {
    const ajv = new Ajv();
    const validate = ajv.compile(schema);

    const itemProperties = schema.items.properties;

    const handleItemChange = (index, field, value) => {
        const updatedData = [...data];

        // 숫자 필드일 경우만 문자열을 숫자로 변환
        if (itemProperties[field].type === 'number') {
            value = Number(value);  // 문자열을 숫자로 변환
        }

        updatedData[index] = { ...updatedData[index], [field]: value };
        const isValid = validate(updatedData);
        updateIsValid(isValid);
        updateData(updatedData);
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
