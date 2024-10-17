require("babel-register");
require("babel-polyfill");

const HDWalletProvider = require("@truffle/hdwallet-provider");
// const { SEED_PHRASE, INFURA_KEY } = require("./seed-phrase");
// const infuraKey = INFURA_KEY;
// const seedPhrase = SEED_PHRASE;
const { projectId, mnemonic } = require('./secrets.json');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none,
    },
    // rinkeby: {
    //   provider: () => new HDWalletProvider(seedPhrase, infuraKey),
    //   network_id: 4,
    //   gas: 5500000,
    //   confirmations: 2,
    //   timeoutBlocks: 200000000000000,
    //   skipDryRun: true,
    // },
    // goerli:{
    //   provider: () => new HDWalletProvider(mnemonic, `https://goerli.infura.io/v3/${projectId}`),
    //   network_id: 5,
    //   gas: 550000,
    //   gasPrice: 550000,
    //   confirmations: 2,
    //   timeoutBlocks: 200000000000000,
    //   skipDryRun: true,
    // }
    sepolia:{
      provider: () => new HDWalletProvider("together razor pottery need sting twist imitate pull gas safe begin title", `https://sepolia.infura.io/v3/d94dd906a2944f67839f72c5b1487607`),
      network_id: 11155111,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200000000000000,
      skipDryRun: true,
    }
  },
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: "petersburg",
    },
  },
  plugins: ["truffle-contract-size"],
};
