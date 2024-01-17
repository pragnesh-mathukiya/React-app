export const DashboardMap = {
    GET_DASHBOARD_DETAIL_START: 'GET_DASHBOARD_DETAIL_START',
    GET_DASHBOARD_DETAIL_SUCCESS: 'GET_DASHBOARD_DETAIL_SUCCESS',
    GET_DASHBOARD_DETAIL_ERROR: 'GET_DASHBOARD_DETAIL_ERROR',
}

export const DashboardActions = {
    getDashboardDetailStart: (data) => ({ type: DashboardMap.GET_DASHBOARD_DETAIL_START, payload: data }),
    getDashboardDetailSuccess: (data) => ({ type: DashboardMap.GET_DASHBOARD_DETAIL_SUCCESS, payload: data }),
    getDashboardDetailError: (data) => ({ type: DashboardMap.GET_DASHBOARD_DETAIL_ERROR, payload: data }),
}