import { DashboardMap } from './dashboardAction';

const initState = {
    dashboardLoader: false,
    dashboardData: {},
}

export function reducer(state = initState, action) {
    switch (action.type) {
        case DashboardMap.GET_DASHBOARD_DETAIL_START: {
            return {
                ...state,
                dashboardLoader: true,
            }
        }
        case DashboardMap.GET_DASHBOARD_DETAIL_SUCCESS: {
            return {
                ...state,
                dashboardLoader: false,
                dashboardData: action.payload
            }
        }
        case DashboardMap.GET_DASHBOARD_DETAIL_ERROR: {
            return {
                ...state,
                dashboardLoader: false,
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}