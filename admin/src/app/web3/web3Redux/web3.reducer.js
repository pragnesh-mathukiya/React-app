import { web3Map } from "./web3.actions"


const initialState = {
    isStatusChanged: false,
    SADetails: []
}

export const web3Reducer = (state = initialState, action) => {

    switch (action.type) {

        case web3Map.SET_WALLET_ACCOUNT_START: {
            return {
                ...state
            }
        }
   

        default: return { ...state }
    }



}