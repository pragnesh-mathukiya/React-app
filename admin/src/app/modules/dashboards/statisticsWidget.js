import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { StatisticsWidget1 } from "../../../_metronic/_partials/widgets";
import { getDashboardDetailAsync } from "../dashboards/redux/dashboardApi";

export function StatisticsWidget() {

    const dispatch = useDispatch();
    const { dashboardData } = useSelector((state) => state.dashboard, shallowEqual);

    useEffect(() => {
        dispatch(getDashboardDetailAsync());
    }, [dispatch]);

    return (
        <div className='row'>
            <div className='col-xl-3 pb-5'>
                <StatisticsWidget1
                    className='card-xl-stretch'
                    svgIcon='/media/svg/icons/General/User.svg'
                    color='dark'
                    iconColor='text-white'
                    title={dashboardData.userCount ? dashboardData.userCount : 0}
                    description='Users'
                    redirectUrl='/users-management/users'
                />
            </div>

            <div className='col-xl-3 pb-5'>
                <StatisticsWidget1
                    className='card-xl-stretch'
                    svgIcon='/media/svg/icons/General/User.svg'
                    color='warning'
                    iconColor='dark'
                    title={dashboardData.reportedUserCount ? dashboardData.reportedUserCount : 0}
                    description='Reported Users'
                    redirectUrl='/users-management/reported-users'
                />
            </div>
        </div>
    );
}
