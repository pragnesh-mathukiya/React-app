export const EnvironmentMap = {
    GET_ENVIRONMENTS_START: 'GET_ENVIRONMENTS_START',
    GET_ENVIRONMENTS_SUCCESS: 'GET_ENVIRONMENTS_SUCCESS',
    GET_ENVIRONMENTS_ERROR: 'GET_ENVIRONMENTS_ERROR',
}

export const EnvironmentActions = {
    getEnvironments: () => ({ type: EnvironmentMap.GET_ENVIRONMENTS_START }),
    getEnvironmentsSuccess: (data) => ({ type: EnvironmentMap.GET_ENVIRONMENTS_SUCCESS, payload: data }),
    getEnvironmentsError: () => ({ type: EnvironmentMap.GET_ENVIRONMENTS_ERROR })
}