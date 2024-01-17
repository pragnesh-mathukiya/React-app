export const showSuccessSnackbar = (variant, message, duration) => {
    return {
        type: "SNACKBAR_SUCCESS",
        payload: {
            variant: variant,
            message: message,
            duration: duration
        },
    };
};

export const clearSnackbar = () => {
    return dispatch => {
        dispatch({ type: "SNACKBAR_CLEAR" });
    };
};