require('dotenv').config();

const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = process.env.MNEMONIC;
const clientURL = 'https://rpc-mumbai.maticvigil.com';
const provider = new HDWalletProvider(mnemonic, clientURL);
const web3 = new Web3(provider);//RPC endpoint for maticvigil service

const data = require('../build/contracts/VivoSuppport.json');//Contract JSON file from build folder
const abiArray = data.abi;
const contract_address = process.env.ADDRESS;

const deploy = async () => {
  accounts = await web3.eth.getAccounts();  
  console.log('attempting to deploy from account' , accounts[0]);
  const contract = await new web3.eth.Contract(abiArray, contract_address);

  //const tokenURI = 'https://gateway.pinata.cloud/ipfs/QmfKyXu4DQikoKuhgPWC16EUbR6RYCtoAghKVdhmsdFwwm';
  // await contract.methods.safeMint(accounts[0],tokenURI).send({
  //     from : accounts[0],
  //     gas:3000000
  // });
  const tokenURI = await contract.methods.tokenURI(1).call(); 
  console.log(tokenURI);
};

deploy();