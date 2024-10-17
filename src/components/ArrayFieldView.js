import React from 'react';
import Ajv from 'ajv';
import '../css/FieldView.css';  

const ArrayFieldView = ({ title, data = [], updateData, updateIsValid, isEditMode, schema }) => {
    const ajv = new Ajv();
    const validate = ajv.compile(schema);  //schema.items.properties = { subString: { type: 'string', title: 'Sub String' }, subNumber: { type: 'number', title: 'Sub Number' }, subBoolean: { type: 'boolean', title: 'Sub Boolean' } }

    const itemProperties = schema.items.properties;

    const handleItemChange = (index, field, value) => {
        const updatedData = [...data];
    
        // 숫자 필드일 경우 문자열을 숫자로 변환
        if (itemProperties[field].type === 'number') {
            value = Number(value);
        }
    
        updatedData[index] = { ...updatedData[index], [field]: value };  //updatedData[index] = { subString: 'item1', subNumber: 10, subBoolean: true }
                                                                        // => updatedData[index] = { subString: 'item1', subNumber: 10,, subBoolean: false }
        const isValid = validate(updatedData);
    
        updateIsValid(isValid);
        updateData(updatedData);
    };

    const handleAddItem = () => { 
        const newItem = Object.keys(itemProperties).reduce((acc, key) => {   ////key = subString, subNumber, subBoolean
            acc[key] = itemProperties[key].default || '';  //acc[subString] = '', acc[subNumber] = '', acc[subBoolean] = ''
            return acc;
        }, {});
        updateData([...data, newItem]);   
    };

    const handleRemoveItem = (index) => {   //삭제하려는 항목의 배열 인덱스
        const updatedData = data.filter((_, i) => i !== index);  //삭제하려는 항목을 제외한 나머지 항목들
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
                    {data.map((item, index) => (   //item = { subString: 'item1', subNumber: 10, subBoolean: true }
                        <tr key={index}>
                            {Object.keys(itemProperties).map((field) => (   //field = subString, subNumber, subBoolean
                                <td key={field}>
                                    {itemProperties[field].type === 'boolean' ? (  //itemProperties[field].type = string, number, boolean
                                        <input
                                            type="checkbox"
                                            checked={item[field]}   //item[subBoolean] = true
                                            readOnly={!isEditMode}
                                            onChange={(e) =>
                                                handleItemChange(index, field, e.target.checked)    //ex) handleItemChange(0, subBoolean, false)
                                            }
                                        />
                                    ) : (
                                        <input
                                            type={itemProperties[field].type === 'number' ? 'number' : 'text'}  
                                            value={item[field]}  
                                            onChange={(e) => handleItemChange(index, field, e.target.value)}
                                            readOnly={!isEditMode}
                                            min={itemProperties[field].minimum}
                                            max={itemProperties[field].maximum}
                                        />
                                    )}
                                </td>
                            ))}
                            {isEditMode && (
                                <td>
                                    <button onClick={() => handleRemoveItem(index)}>Remove</button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {isEditMode && (
                <button className="add-item-btn" onClick={handleAddItem}>
                    Add Item
                </button>
            )}
        </div>
    );
};

export default ArrayFieldView;
