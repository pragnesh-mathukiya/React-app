import axios from 'axios';
import { EnvironmentActions } from './getEnvironmentAction';

export const getEnvironmentsAsync = () => {
    return async (dispatch) => {
        try {
            dispatch(EnvironmentActions.getEnvironments());
            console.log('envURl', process.env.REACT_APP_ENVIRONMENT_URL)
            let response = await axios({
                url: process.env.REACT_APP_ENVIRONMENT_URL,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });


            const { data } = response
            if (data.code === 200) {
                return dispatch(EnvironmentActions.getEnvironmentsSuccess(data.data));
            }
            console.log('getEnvironmentsError===============', data)

            dispatch(EnvironmentActions.getEnvironmentsError());
        } catch (error) {
            console.log('error===============', error)
            dispatch(EnvironmentActions.getEnvironmentsError());
        }
    }
}
