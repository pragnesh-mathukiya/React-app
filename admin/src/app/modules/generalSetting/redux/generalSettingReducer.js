import { GeneralSettingMap } from './generalSettingAction';

const initialState = {
    isLoading: false,
    refreshCms: true,
    cmsLists: {},
    selectedGeneralSetting: {},
    reDirect: false
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GeneralSettingMap.CREATE_GENERAL_SETTING_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case GeneralSettingMap.CREATE_GENERAL_SETTING_SUCCESS: {
            return {
                ...state,
                refreshCms: true,
                reDirect:true
            }
        }
        case GeneralSettingMap.CREATE_GENERAL_SETTING_ERROR: {
            return {
                ...state,
                isLoading: false
            }
        }
        case GeneralSettingMap.GET_GENERAL_SETTING_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case GeneralSettingMap.GET_GENERAL_SETTING_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                selectedGeneralSetting: action.payload
            }
        }
        case GeneralSettingMap.GET_GENERAL_SETTING_ERROR: {
            return {
                ...state,
                isLoading: false,
            }
        }
        case GeneralSettingMap.UPDATE_GENERAL_SETTING_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case GeneralSettingMap.UPDATE_GENERAL_SETTING_SUCCESS: {

            return {
                ...state,
                selectedGeneralSetting: {
                    ...state.selectedGeneralSetting,
                    ...action.payload
                },
                reDirect:true
            }
        }
        case GeneralSettingMap.UPDATE_GENERAL_SETTING_ERROR: {
            return {
                ...state,
                isLoading: false
            }
        }
        case GeneralSettingMap.DELETE_GENERAL_SETTING_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case GeneralSettingMap.DELETE_GENERAL_SETTING_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                refreshCms: true
            }
        }
        case GeneralSettingMap.DELETE_GENERAL_SETTING_ERROR: {
            return {
                ...state,
                isLoading: false,
            }
        }
        case GeneralSettingMap.SET_SELECTED_GENERAL_SETTING: {
            return {
                ...state,
                selectedGeneralSetting: action.payload,
                reDirect: false
            }
        }
        default: return { ...state }
    }
}