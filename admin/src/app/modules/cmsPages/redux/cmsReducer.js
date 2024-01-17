import { CmsMap } from './cmsAction';

const initialState = {
    isLoading: false,
    refreshCms: true,
    cmsLists: {},
    selectedCMS: {},
    reDirect: false
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CmsMap.CREATE_CMS_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case CmsMap.CREATE_CMS_SUCCESS: {
            return {
                ...state,
                refreshCms: true,
                reDirect:true
            }
        }
        case CmsMap.CREATE_CMS_ERROR: {
            return {
                ...state,
                isLoading: false
            }
        }
        case CmsMap.GET_ALL_CMS_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case CmsMap.GET_ALL_CMS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                refreshCms: false,
                cmsLists: action.payload
            }
        }
        case CmsMap.GET_ALL_CMS_ERROR: {
            return {
                ...state,
                isLoading: false,
                refreshCms: false
            }
        }
        case CmsMap.UPDATE_CMS_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case CmsMap.UPDATE_CMS_SUCCESS: {

            return {
                ...state,
                refreshCms: true,
                selectedCMS: {
                    ...state.selectedCMS,
                    ...action.payload
                },
                reDirect:true
            }
        }
        case CmsMap.UPDATE_CMS_ERROR: {
            return {
                ...state,
                isLoading: false
            }
        }
        case CmsMap.DELETE_CMS_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case CmsMap.DELETE_CMS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                refreshCms: true
            }
        }
        case CmsMap.DELETE_CMS_ERROR: {
            return {
                ...state,
                isLoading: false,
            }
        }
        case CmsMap.SET_SELECTED_CMS: {
            return {
                ...state,
                selectedCMS: action.payload,
                reDirect: false
            }
        }
        default: return { ...state }
    }
}