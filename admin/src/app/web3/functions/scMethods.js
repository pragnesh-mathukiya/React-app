import { enviornment } from "../../constants/constants";
import axios from "axios";



function getInstance(web3, address, abi) {

    return new Promise(async (resolve, reject) => {
        if (web3 && web3 != '') {
            let Instance = await new web3.eth.Contract(
                abi,
                address
            );

            if (Instance) {
                resolve(Instance);
            } else {
                reject({ error: "Issue with instance" });
            }
        }
    });
};


function addWhitelist(instance, walletAddress, data) {
    return new Promise( (resolve, reject) => {
         instance.methods
            .addUserToWhiteList(data)
            .send({ from: walletAddress })
            .on("transactionHash", async function (transactionHash) {
                let APIobj = {
                    txHash: transactionHash,
                    address: data,
                    status: 0,
                    action:"ADD"
                };

                const headers = {
                    "Content-Type": "application/json",
                };
                const response = await axios.post(
                    process.env.REACT_APP_HOST + "/api/admin/whitelist/create",
                    APIobj,
                    { headers }
                );

                if (response) {
                    resolve(response);
                } else {
                    reject({ code:1 , message: "Their is some error with server" });
                }
            })
            .on("error", function (error) {
                reject(error);
            })
      
    });
}

function removeWhitelist(instance, walletAddress, data) {
    return new Promise((resolve, reject) => {

        return instance.methods
            .removeWhiteListedUser(data)
            .send({ from: walletAddress })
            .on("transactionHash", async function (transactionHash) {
                let APIobj = {
                    txHash: transactionHash,
                    address: data,
                    status: 0,
                    action:"REMOVE"
                };

                const headers = {
                    "Content-Type": "application/json",
                };
                const response = await axios.post(
                    process.env.REACT_APP_HOST + "/api/admin/whitelist/updateDetails",
                    APIobj,
                    { headers }
                );
                if (response) {
                    resolve(response);
                } else {
                    reject({ code:1 , message: "Their is some error with server" });
                }
            })
            .on("error", function (error, receipt) {
                reject(error);
            });

    });
}

export const SCMethods = {
    getInstance,
    addWhitelist,
    removeWhitelist,
}