export const CmsMap = {
    CREATE_CMS_START: 'CREATE_CMS_START',
    CREATE_CMS_SUCCESS: 'CREATE_CMS_SUCCESS',
    CREATE_CMS_ERROR: 'CREATE_CMS_ERROR',
    GET_ALL_CMS_START: 'GET_ALL_CMS_START',
    GET_ALL_CMS_SUCCESS: 'GET_ALL_CMS_SUCCESS',
    GET_ALL_CMS_ERROR: 'GET_ALL_CMS_ERROR',  
    UPDATE_CMS_START: 'UPDATE_CMS_START',
    UPDATE_CMS_SUCCESS: 'UPDATE_CMS_SUCCESS',
    UPDATE_CMS_ERROR: 'UPDATE_CMS_ERROR',
    DELETE_CMS_START: 'DELETE_CMS_START',
    DELETE_CMS_SUCCESS: 'DELETE_CMS_SUCCESS',
    DELETE_CMS_ERROR: 'DELETE_CMS_ERROR',
    SET_SELECTED_CMS: 'SET_SELECTED_CMS',
}

export const CmsActions = {
    getAllCMS: (data) => ({ type: CmsMap.GET_ALL_CMS_START, payload: data }),
    getAllCMSSuccess: (data) => ({ type: CmsMap.GET_ALL_CMS_SUCCESS, payload: data }),
    getAllCMSError: () => ({ type: CmsMap.GET_ALL_CMS_ERROR }),

    createCMSStart: () => ({ type: CmsMap.CREATE_CMS_START }),
    createCMSSuccess: (data) => ({ type: CmsMap.CREATE_CMS_SUCCESS, payload: data }),
    createCMSError: (errors) => ({ type: CmsMap.CREATE_CMS_ERROR, payload: { errors } }),

    updateCMSStart: () => ({ type: CmsMap.UPDATE_CMS_START }),
    updateCMSSuccess: (data) => ({ type: CmsMap.UPDATE_CMS_SUCCESS, payload: data }),
    updateCMSError: (errors) => ({ type: CmsMap.UPDATE_CMS_ERROR, payload: { errors } }),

    deleteCMSStart: () => ({ type: CmsMap.DELETE_CMS_START }),
    deleteCMSSuccess: (data) => ({ type: CmsMap.DELETE_CMS_SUCCESS, payload: data }),
    deleteCMSError: (errors) => ({ type: CmsMap.DELETE_CMS_ERROR, payload: { errors } }),

    setSelectedCMS: (data) => ({ type: CmsMap.SET_SELECTED_CMS, payload: data }),
}