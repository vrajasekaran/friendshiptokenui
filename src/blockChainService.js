import isArray from 'lodash/isArray'
import reduce from 'lodash/reduce'

let web3Instance;

let setWeb3Instance = function () {
    return new Promise((resolve, reject) => {
        if (web3Instance) {
            resolve();
        } else {
            // Wait for loading completion to avoid race conditions with web3 injection timing.
            window.addEventListener('load', function () {
                var web3 = window.web3
                // Checking if Web3 has been injected by the browser (Mist/MetaMask)
                // if (typeof web3 !== 'undefined') {
                //     // Use Mist/MetaMask's provider.
                //     web3 = new Web3(web3.currentProvider)
                //     web3Instance = web3
                // } else {
                //     // Fallback to localhost if no web3 injection.
                //     var provider = new Web3.providers.HttpProvider('http://localhost:8545')
                //     web3 = new Web3(provider)
                //     web3Instance = web3
                // }

                resolve();
            })
        }
    })
}



export {
    setWeb3Instance
}