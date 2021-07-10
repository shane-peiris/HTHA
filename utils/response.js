//Create return payload for an error message
const errorMsg = (message, error = null) => {

    let msg = {
        status: 'error',
        message: message
    }

    if (error !== null && error.message) msg.message = error.message;
    if (error !== null) msg.error = error;

    return msg;
}
//Create return payload for an success message
const successMsg = (message, data = null) => {

    let msg = {
        status: 'success',
        message: message
    }

    if (data !== null) msg.data = data;

    return msg;
}

export default {
    error: errorMsg,
    success: successMsg,
}