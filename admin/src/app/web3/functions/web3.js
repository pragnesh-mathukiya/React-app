import Web3 from "web3";
import { toast } from "react-toastify";
import { getChainData } from "../helpers/utils";
import { enviornment } from "../../constants/constants";
/////////// CHECK IF BROWSER IS ENABLED WITH Web3 //////////////
// import { enviornment } from "../../constants/constants";

const loadWeb3 = async (setLoading) => {
  try {
    if (window.ethereum) {
      window.web3 = await new Web3(window.ethereum);
      await window.ethereum.enable();
      // } else if (window.web3) {
      //   window.web3 = new Web3(window.web3.currentProvider);
      // }
    } else {
      // window.alert('Non-Ethereum browser detected. you should consider trying MetaMask')
    }
  } catch (err) {
    setLoading(false);
  }
};

////////// GET METAMASK ACCOUNT AND CREATE CONTRACT INSTANCES ////////////////

const loadBlockChainData = async (
  setNetworkDetails,
  networkDetails,
  setLoading
) => {
  try {
    const web3 = await window.web3;
    const wallet = "metamask";

    // listen the Chain ID
    const chainId = await window.ethereum.chainId;
    const chainData = chainId ? await getChainData(chainId) : null;
    if (chainData && chainData.isChainValid) {
      // Load Account
      const accounts = await web3.eth.getAccounts();
      let balance = await web3.eth.getBalance(accounts[0]);
      balance = balance / 1e18;
      localStorage.setItem("injected", true);
      localStorage.setItem("wallet_name", "metamask");
      // listen the Network ID
      const networkId = await web3.eth.net.getId();

      // let instance =
      let Instance = await new web3.eth.Contract(
        enviornment[networkId].ABI,
        enviornment[networkId].SCAddress
      );
      let owner = await Instance.methods.owner().call({ from: accounts[0] });
      let temp = owner.toLowerCase();
      let temp2 = accounts[0].toLowerCase();

      await setNetworkDetails({
        ...networkDetails,
        address: accounts[0],
        web3: web3,
        isUpdated: true,
        connected: true,
        wallet: wallet,
        chainData: chainData,
        chainId: chainId,
        networkId: networkId,
        balance: balance,
        isOwner: temp2 && temp && temp === temp2 ? true : false,
      });
      await setLoading(false);
    } else {
      await setNetworkDetails({
        isUpdated: true,
        ...networkDetails,
        address: "",
        web3: "",
        connected: false,
        wallet: "",
        chainData: "",
        chainId: "",
        networkId: "",
        balance: "",
        isAdmin: false,
      });
      toast.warning("Network not supported");
      await setLoading(false);
    }

    // const tokenContract = await new web3.eth.Contract(
    //   TokenABI,
    //   TokenContractAddress
    // );

    // const guessContract = await new web3.eth.Contract(
    //   GuessABI,
    //   GuessContractAddress
    // );
    // await setTokenContract(tokenContract);

    // await setGuessContract(guessContract);
  } catch (err) {
    setLoading(false);
  }
};

////////// CHECK IF USER SELECTED A DIFFERENT ACCOUNT IN METAMASK ///////////////

const listenAccountChange = async (
  setNetworkDetails,
  networkDetails,
  setLoading,
  resetApp
) => {
  try {
    const web3 = window.web3;
    window.ethereum.on("accountsChanged", async () => {
      setLoading(true);
      const accounts = await web3.eth.getAccounts();
      if (accounts.length !== 0) {
        window.location.reload();
        setLoading(false);
      } else {
        setLoading(false);
        resetApp();
      }
    });
  } catch (err) {
    setLoading(false);
  }
};

////////// CHECK IF USER SELECTED A DIFFERENT NETWORK ////////////

const listenNetworkChange = async (
  setNetworkDetails,
  networkDetails,
  setLoading,
  resetApp
) => {
  try {
    const web3 = window.web3;
    window.ethereum.on("chainChanged", async () => {
      const chainId = await window.ethereum.chainId;
      const chainData = chainId ? await getChainData(chainId) : null;
      const networkId = await web3.eth.net.getId();
      if (chainData && chainData.isChainValid) {
        await setNetworkDetails((prevState) => ({
          ...prevState,
          chainId: chainId,
          networkId: networkId,
          chainData: chainData,
        }));

        setLoading(false);
      } else {
        resetApp();
        toast.warning("Network not supported");
        setLoading(false);
      }
    });
  } catch (err) {
    setLoading(false);
  }
};

export {
  loadWeb3,
  loadBlockChainData,
  listenAccountChange,
  listenNetworkChange,
};
