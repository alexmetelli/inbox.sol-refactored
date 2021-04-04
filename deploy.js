const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile.js');
const mnemonic = '' // Your mnemonic here

const provider = new HDWalletProvider(
    mnemonic, 'https://rinkeby.infura.io/v3/6a2a410497a949b89a6be84ce6e6dde9'
    ); 
const web3 = new Web3(provider);
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    
    console.log('Attempting to doploy from account', accounts[0]);

    const result = await new web3.eth.Contract(interface)
        .deploy({data: '0x' + bytecode, arguments: ['Hi there!']}) // add 0x bytecode
        .send({from: accounts[0]}); // remove 'gas

    console.log('Contract deployed to', result.options.address);
};
deploy();