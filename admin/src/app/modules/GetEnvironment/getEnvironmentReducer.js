import { EnvironmentMap } from './getEnvironmentAction';

const initialState = {
    environmentLists: {
        adminBaseURL: "",
        commonBaseURL: "",
        userBaseURL: "",
        image_max_size_bytes: "",
        image_max_size_mb: "",
        flag_max_size_kb: "",
        flag_max_size_bytes: ""
    },
    envLoading: true
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case EnvironmentMap.GET_ENVIRONMENTS_START: {
            return {
                ...state,
            }
        }
        case EnvironmentMap.GET_ENVIRONMENTS_SUCCESS: {
            return {
                ...state,
                environmentLists: action.payload,
                envLoading: false
            }
        }
        case EnvironmentMap.GET_ENVIRONMENTS_ERROR: {
            return {
                ...state,
            }
        }
        default: return { ...state }
    }
}