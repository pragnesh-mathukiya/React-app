export const isValidWalletAccount = (selectedAddress, savedAddress) => {
    if (selectedAddress === savedAddress) {
        return true
    } else {
        return false
    }
}