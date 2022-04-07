export const isNumber = (value) => {
    if(typeof parseInt(value) === 'number' && !isNaN(parseInt(value))) {
        return value;
    } else {
        return false;
    }
}