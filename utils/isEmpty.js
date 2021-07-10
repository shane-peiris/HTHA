//Function to validate whether a particular value is empty by checking numerous conditions
const isEmpty = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === 'object' && Object.keys(value).length === 0) ||
      (typeof value === 'string' && value.trim().length === 0)
    );
  }
  
  export default isEmpty;