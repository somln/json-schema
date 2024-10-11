import React, { useState } from 'react';
import BooleanFieldView from './BooleanFieldView';

const DataView = () => {
    const [data, setData] = useState(true);
    const [isValid, setIsValid] = useState(false);

    return (
        <div className="App">
            <BooleanFieldView
                title="toggle"
                data={data}
                updateData={setData}
                updateIsValidMap={setIsValid}
                isForEdit={true}
            />
        </div>
    );
};

export default DataView;