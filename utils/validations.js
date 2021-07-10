//Validate JoiSchema against data
const validate = (JoiSchema, data) => {
    const { error } = JoiSchema.validate(data, options);

    if (error) {
        return mapError(error)
    }

    return false
}

//Joi Validation options schema
const options = {
    abortEarly: false,
    errors: {
        escapeHtml: false,
        label: false,
    }
}

//Generat error map based on errors generated from JoiSchema Validation
const mapError = (error) => {

    const errList = error.details;

    let newErrList = {}

    errList.map((err) => {

        const label = err.context.label
        const key = err.context.key
        const value = err.context.value
        const msg = err.message

        newErrList[key] = msg

    })

    return newErrList

}

export default validate;