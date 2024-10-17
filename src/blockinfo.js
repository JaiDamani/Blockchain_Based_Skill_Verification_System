// Create a new Web3 instance connected to the Sepolia testnet
const web3 = new web3("https://sepolia-testnet.com");

// Replace this with the transaction hash you want to inspect
const txHash = "0x...";

// Get the transaction receipt to retrieve the block number
web3.eth.getTransactionReceipt(txHash, (error, receipt) => {
  if (error) {
    console.error(error);
  } else {
    const blockNumber = receipt.blockNumber;

    // Get the block details for the given block number
    web3.eth.getBlock(blockNumber, (error, block) => {
      if (error) {
        console.error(error);
      } else {
        console.log(`Block Number: ${block.number}`);
        console.log(`Block Hash: ${block.hash}`);
        console.log(`Timestamp: ${new Date(block.timestamp * 1000)}`);
        console.log(`Difficulty: ${block.difficulty}`);
        console.log(`Transactions: ${block.transactions}`);
        // Add more fields as needed
      }
    });
  }
});
