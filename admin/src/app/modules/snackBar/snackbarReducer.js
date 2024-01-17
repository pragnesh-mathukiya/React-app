const initialSnackBarState = {
    successSnackbarOpen: false,
    successSnackbarMessage: '',
    successSnackbarVariant: '',
    successSnackbarDuration: null,
    errorSnackbarOpen: false
};

const snackBarReducer = (state = initialSnackBarState, action) => {
    switch (action.type) {
        case "SNACKBAR_SUCCESS":
            return {
                ...state,
                successSnackbarOpen: true,
                successSnackbarVariant: action.payload.variant,
                successSnackbarMessage: action.payload.message,
                successSnackbarDuration: action.payload.duration
            };
        case "SNACKBAR_CLEAR":
            return {
                ...state,
                successSnackbarOpen: false,
                errorSnackbarOpen: false,
                infoSnackbarOpen: false,
            };
        default: return { ...state }
    }
};

export default snackBarReducer;