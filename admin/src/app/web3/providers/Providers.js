import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Web3Provider } from "../contexts/web3Context";
import {
  loadWeb3,
  loadBlockChainData,
  listenAccountChange,
  listenNetworkChange,
} from "../functions/web3";

const Providers = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [setting] = useState({});

  const [networkDetails, setNetworkDetails] = useState({
    isUpdated: false,
    address: "",
    web3: "",
    connected: "",
    connectTag: "",
    chainData: "",
    wallet: "",
    chainId: "",
    networkId: "",
    balance: "",
    isAdmin: false,
  });

  const resetApp = async () => {
    setNetworkDetails({
      isUpdated: false,
      address: "",
      web3: "",
      connected: false,
      connectTag: "",
      chainData: "",
      wallet: "",
      chainId: "",
      networkId: "",
      balance: "",
      isAdmin: false,
    });
    const web3 = window.web3;
    //close -> disconnect
    localStorage.clear();
    if (web3 && web3.currentProvider && web3.currentProvider.disconnect) {
      await web3.currentProvider.disconnect();
    }
  };

  //eslint-disable-next-line
  const handleConnect = async () => {
    const metaMaskInstalled = typeof window.web3 !== "undefined";
    if (metaMaskInstalled) {
      setLoading(true);
      await loadWeb3(setLoading);
      await loadBlockChainData(setNetworkDetails, networkDetails, setLoading);
      await listenAccountChange(
        setNetworkDetails,
        networkDetails,
        setLoading,
        resetApp
      );
      await listenNetworkChange(
        setNetworkDetails,
        networkDetails,
        setLoading,
        resetApp
      );
    } else {
      toast.info(
        "Metamask Extension Not Found ! Please Install Metamask to Connect"
      );
    }
  };

  useEffect(() => {
    let injected = localStorage.getItem("injected");
    if (injected && injected !== undefined) {
      let walletName = localStorage.getItem("wallet_name");
      if (walletName && walletName !== undefined) {
        if (walletName === "metamask") {
          handleConnect();
        }
      }
    }
  }, [handleConnect]);

  useEffect(() => {
    if (networkDetails.address !== "") {
      // Call API if you want any
    }
  }, [networkDetails]);

  return (
    <>
      <Web3Provider
        value={{
          loadWeb3,
          loading,
          setLoading,
          networkDetails,
          setNetworkDetails,
          loadBlockChainData,
          listenAccountChange,
          listenNetworkChange,
          handleConnect,
          resetApp,
          setting,
        }}
      >
        {children}
      </Web3Provider>
    </>
  );
};

export default Providers;
