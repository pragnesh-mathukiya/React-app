// import axios from "axios";
// import { Toast } from "../../../helpers/Toast";
import { web3Actions } from "./web3.actions";

export const setWalletAccountAsync = (walletAddress) => {
    return async (dispatch, getState) => {
        try {
            dispatch(web3Actions.setWalletAccountStart(walletAddress))
             
        } catch (error) {
            dispatch(web3Actions.setWalletAccountError());
        }
    }
}
