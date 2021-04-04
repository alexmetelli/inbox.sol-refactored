const { strictEqual } = require('assert');
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile.js');

let accounts;
let inbox;

beforeEach(async() => {
    // Get a list of all accounts
    accounts = await provider.eth.getAccounts();

    // Use one of those accounts to deploy the contract
    inbox = await new provider.eth.Contract(interface)
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send({ from: accounts[0], gas: '1000000' })

});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        strictEqual(message, 'Hi there!')
    });
    
    it('updates message', async () => {
        await inbox.methods.setMessage("I'm a new message!").send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        strictEqual(message, "I'm a new message!" )
    });
});