export const AuthMap = {
    LOGIN_START: 'LOGIN_START',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERROR: 'LOGIN_ERROR',
    LOGOUT_START: 'LOGOUT_START',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_ERROR: 'LOGOUT_ERROR',
    FORGOT_PASSWORD_START: 'FORGOT_PASSWORD_START',
    FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS',
    FORGOT_PASSWORD_ERROR: 'FORGOT_PASSWORD_ERROR',
    SET_NEW_PASSWORD_START: 'SET_NEW_PASSWORD_START',
    SET_NEW_PASSWORD_SUCCESS: 'SET_NEW_PASSWORD_SUCCESS',
    SET_NEW_PASSWORD_ERROR: 'SET_NEW_PASSWORD_ERROR',
    VERIFY_LOGIN_SECURITY_CODE_START: 'VERIFY_LOGIN_SECURITY_CODE_START',
    VERIFY_LOGIN_SECURITY_CODE_SUCCESS: 'VERIFY_LOGIN_SECURITY_CODE_SUCCESS',
    VERIFY_LOGIN_SECURITY_CODE_ERROR: 'VERIFY_LOGIN_SECURITY_CODE_ERROR',
    VERIFY_AUTH_TOKEN_START: 'VERIFY_AUTH_TOKEN_START',
    VERIFY_AUTH_TOKEN_SUCCESS: 'VERIFY_AUTH_TOKEN_SUCCESS',
    VERIFY_AUTH_TOKEN_ERROR: 'VERIFY_AUTH_TOKEN_ERROR',
    RESEND_CODE_START: 'RESEND_CODE_START',
    RESEND_CODE_SUCCESS: 'RESEND_CODE_SUCCESS',
    RESEND_CODE_ERROR: 'RESEND_CODE_ERROR',
    RESET_AUTH: 'RESET_AUTH',
    NOTIFICATION_LIST_START: "NOTIFICATION_LIST_START",
    NOTIFICATION_LIST_SUCCESS: "NOTIFICATION_LIST_SUCCESS",
    NOTIFICATION_LIST_ERROR: "NOTIFICATION_LIST_ERROR",
}

export const AuthActions = {
    loginStart: () => ({ type: AuthMap.LOGIN_START }),
    loginSuccess: (data) => ({ type: AuthMap.LOGIN_SUCCESS, payload: data }),
    loginError: (errors) => ({ type: AuthMap.LOGIN_ERROR, payload: errors }),

    logoutStart: () => ({ type: AuthMap.LOGOUT_START }),
    logout: () => ({ type: AuthMap.LOGOUT_SUCCESS }),
    logoutError: (err) => ({ type: AuthMap.LOGOUT_ERROR, payload: err }),

    forgotPasswordStart: (email) => ({ type: AuthMap.FORGOT_PASSWORD_START, payload: email }),
    forgotPasswordSuccess: (data) => ({ type: AuthMap.FORGOT_PASSWORD_SUCCESS, payload: data }),
    forgotPasswordError: (errors) => ({ type: AuthMap.FORGOT_PASSWORD_ERROR, payload: { errors } }),

    setNewPasswordStart: (data) => ({ type: AuthMap.SET_NEW_PASSWORD_START, payload: data }),
    setNewPasswordSuccess: (data) => ({ type: AuthMap.SET_NEW_PASSWORD_SUCCESS, payload: data }),
    setNewPasswordError: (errors) => ({ type: AuthMap.SET_NEW_PASSWORD_ERROR, payload: { errors } }),

    verifyLoginSecurityCodeStart: () => ({ type: AuthMap.VERIFY_LOGIN_SECURITY_CODE_START }),
    verifyLoginSecurityCodeSuccess: (data) => ({ type: AuthMap.VERIFY_LOGIN_SECURITY_CODE_SUCCESS, payload: data }),
    verifyLoginSecurityCodeError: (errors) => ({ type: AuthMap.VERIFY_LOGIN_SECURITY_CODE_ERROR, payload: errors }),

    resendCodeStart: () => ({ type: AuthMap.RESEND_CODE_START }),    
    resendCodeSuccess: () => ({ type: AuthMap.RESEND_CODE_SUCCESS}),
    resendCodeError: () => ({ type: AuthMap.RESEND_CODE_ERROR}),
    
    verifyAuthTokenStart: () => ({ type: AuthMap.VERIFY_AUTH_TOKEN_START }),
    verifyAuthTokenSuccess: (data) => ({ type: AuthMap.VERIFY_AUTH_TOKEN_SUCCESS, payload: data }),
    verifyAuthTokenError: (err) => ({ type: AuthMap.VERIFY_AUTH_TOKEN_ERROR, payload: err }),

    resetAuth: () => ({ type: AuthMap.RESET_AUTH }),

    notificationListStart: () => ({ type: AuthMap.NOTIFICATION_LIST_START }),
    notificationListSuccess: (data) => ({ type: AuthMap.NOTIFICATION_LIST_SUCCESS, payload: data }),
    notificationListError: (err) => ({ type: AuthMap.NOTIFICATION_LIST_ERROR, payload: err }),
} 