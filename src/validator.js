import Ajv from "ajv";
const ajv = new Ajv();

export const validate = (schema, data) => {
    const validateFn = ajv.compile(schema);
    const isValid = validateFn(data);
    
    if (!isValid) {
        return false;
    }
    
    return true;
}