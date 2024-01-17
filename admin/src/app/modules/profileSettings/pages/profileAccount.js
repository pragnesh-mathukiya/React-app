import React, { useContext, useState, useEffect } from "react";
import Web3 from "web3";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Web3Context } from "../../../../web3/contexts/web3Context";
import { isValidWalletAccount } from "../../../../utils";
import { poolMethods } from "../../../../web3/functions/factory";
import { ellipseAddress } from "../../../../web3/helpers/utils";
import { updateUserProfileAsync } from "../../../modules/profileSettings/redux/profileApi";
import { enviornment } from "../../../../constants/constants";
/* import {
    updateProfileAsync
} from "../../Profile/redux/userProfileApi"; */

const Account = () => {
  const dispatch = useDispatch();
  const [isCopied, setIsCopied] = useState(false);
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");

  const { user, isLoading } = useSelector((state) => state.auth);

  const { networkDetails, handleConnect } = useContext(Web3Context);

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const connectWallet = () => {
    handleConnect();
  };

  useEffect(() => {
    if (networkDetails && networkDetails.connected) {
      (async () => {
        let bal = await networkDetails.web3.eth.getBalance(
          networkDetails.address
        );
        setAddress(networkDetails.address);
        if (bal && bal !== 0) {
          setBalance(parseFloat(bal / enviornment.divideValue).toFixed(2));
        }
      })();
    }
  }, [networkDetails]);

  useEffect(() => {
    if (address && !user.walletAddress) {
      dispatch(
        updateUserProfileAsync(
          {
            walletAddress: networkDetails.address,
          },
          null,
          null
        )
      );
    }
  }, [address, user.walletAddress]);

  return (
    <div className="col-md-12 mb-0">
      {networkDetails.connected &&
      isValidWalletAccount(networkDetails.address, user.walletAddress) ? (
        <>
          <div className="Ape_text pb-3 f34_medium_Neue">
            Account Balance <br />{" "}
            <span className="color_blue f40_extraRegu_Neue text-break wall_address">
              {balance}
            </span>
          </div>
          <div className="Ape_text pb-3 f34_medium_Neue">
            Wallet Address <br />{" "}
            <span className="color_blue f40_extraRegu_Neue text-break wall_address">
              {ellipseAddress(networkDetails.address)}
            </span>
          </div>
        </>
      ) : !networkDetails.connected ? (
        <button
          id="kt_login_signin_submit"
          type="submit"
          className="btn btn-blue defpddng"
          onClick={connectWallet}
          disabled={isLoading}
        >
          <span>Connect</span>
          {isLoading && <span className="ml-3 spinner spinner-white"></span>}
        </button>
      ) : (
        <div>
          {user.walletAddress ? (
            <div className="Ape_text pb-3 f34_medium_Neue">
              Your valid wallet account Address is{" "}
              {ellipseAddress(user.walletAddress)} <br />
              Please connect to this wallet account.
            </div>
          ) : (
            <div className="Ape_text pb-3 f34_medium_Neue">
              Please connect to your wallet account.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Account;
