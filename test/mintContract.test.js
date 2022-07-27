const assert = require('assert');
const Web3 = require('web3');
const web3 = new Web3('http://127.0.0.1:8545');//RPC endpoint from Ganache server
const data = require('../build/contracts/VivoSuppport.json');//Contract JSON file from build folder
const abiArray = data.abi;
const contract_address = '0xea15465ac65581907A8416ca2b78Ade8C153F8E2';

let accounts;
let art;

beforeEach(async() => { 
  accounts = await web3.eth.getAccounts();  
  art = await new web3.eth.Contract(abiArray, contract_address);
});

describe('mintContract', () => {
  it('checks the owner of the contract',async () => {
    let owner = await art.methods.owner().call();
    console.log()
    assert.equal(owner,accounts[0]);
  });
  it('checks the owner of TOKEN ID 1', async () => {  
    const tokenURI = 'ABCD';
    await art.methods.safeMint(accounts[0],tokenURI).send({
      from : accounts[0],
      gas:3000000
    });
    let owner = await art.methods.ownerOf(1).call();
    assert.equal(owner,accounts[0]);

  })
});

