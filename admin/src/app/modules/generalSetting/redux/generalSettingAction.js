export const GeneralSettingMap = {
    GET_GENERAL_SETTING_START: 'GET_GENERAL_SETTING_START',
    GET_GENERAL_SETTING_SUCCESS: 'GET_GENERAL_SETTING_SUCCESS',
    GET_GENERAL_SETTING_ERROR: 'GET_GENERAL_SETTING_ERROR',  
    UPDATE_GENERAL_SETTING_START: 'UPDATE_GENERAL_SETTING_START',
    UPDATE_GENERAL_SETTING_SUCCESS: 'UPDATE_GENERAL_SETTING_SUCCESS',
    UPDATE_GENERAL_SETTING_ERROR: 'UPDATE_GENERAL_SETTING_ERROR',
    SET_SELECTED_GENERAL_SETTING: 'SET_SELECTED_GENERAL_SETTING',
}

export const GeneralSettingActions = {
    getGeneralSetting: (data) => ({ type: GeneralSettingMap.GET_GENERAL_SETTING_START, payload: data }),
    getGeneralSettingSuccess: (data) => ({ type: GeneralSettingMap.GET_GENERAL_SETTING_SUCCESS, payload: data }),
    getGeneralSettingError: () => ({ type: GeneralSettingMap.GET_GENERAL_SETTING_ERROR }),

    updateGeneralSettingStart: () => ({ type: GeneralSettingMap.UPDATE_GENERAL_SETTING_START }),
    updateGeneralSettingSuccess: (data) => ({ type: GeneralSettingMap.UPDATE_GENERAL_SETTING_SUCCESS, payload: data }),
    updateGeneralSettingError: (errors) => ({ type: GeneralSettingMap.UPDATE_GENERAL_SETTING_ERROR, payload: { errors } }),
    
    setSelectedGeneralSetting: (data) => ({ type: GeneralSettingMap.SET_SELECTED_GENERAL_SETTING, payload: data }),
}