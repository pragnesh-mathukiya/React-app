import { AuthActions } from '../app/modules/Auth/redux/authAction';

export default function setupAxios(axios, store) {
    axios.interceptors.request.use(
        config => {
            const {
                auth: { authToken }
            } = store.getState();

            if (authToken) {
                //config.headers.Authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjA2NzVmMWFjNWNmNTEyYmNlOGQ2MGIiLCJlbWFpbElkIjoiaW5mb0BkemllYXJ0aC5pbyIsImNvbnRhY3ROdW1iZXIiOiIrMTQxNTk2NTQ1OTciLCJpYXQiOjE2NDU2ODc3NzksImV4cCI6MTY3NzIyMzc3OX0.CV2w4wphxSnctXuoy09jmB2vRKA48PWtsh4zm4q5sPw";
                config.headers.Authorization = authToken;
            }

            return config;
        },
        err => Promise.reject(err)
    );
    axios.interceptors.response.use(
        response => {
            return response
        },
        // err => {
        //     if (err.response && err.response.status === 404) {
        //         store.dispatch(AuthActions.logout());
        //     }
        //     Promise.reject(err)
        // }
    );
}
