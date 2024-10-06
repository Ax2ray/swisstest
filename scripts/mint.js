
const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");


const sendShieldedTransaction = async (signer, destination, data, value) => {
  const rpcLink = hre.network.config.url;
  const [encryptedData] = await encryptDataField(rpcLink, data);

  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
    const replace_contractAddress = "0xc4271AA57242d3fB6330B475Fdaa1ad94b124d31";
    const [signer] = await hre.ethers.getSigners();
    const replace_contractFactory = await hre.ethers.getContractFactory("Ax2");
    const contract = replace_contractFactory.attach(replace_contractAddress);
  
    const replace_functionName = "mint";
    const replace_functionArgs = ["0x38F09b7c692F8f428E5d93878a3d0Ee1FF9F00a5","100000000000000000000"]; // 100 tokens with 18 decimal places
    
    const amountMinted = hre.ethers.formatEther(replace_functionArgs[1]); // Converts to human-readable format (100 tokens)
    console.log(`Minting ${amountMinted} tokens...`);
  
    try {
        const transaction = await sendShieldedTransaction(signer, replace_contractAddress, contract.interface.encodeFunctionData(replace_functionName, replace_functionArgs), 0);
        console.log(`Transaction submitted! Transaction hash: ${transaction.hash}`);
        await transaction.wait();
    
        console.log(`Transaction completed successfully! ${amountMinted} tokens minted to ${replace_functionArgs[0]}.`);
        console.log(`Transaction hash: ${transaction.hash}`);
      } catch (error) {
        console.error(`Transaction failed! Could not mint ${amountMinted} tokens.`);
        console.error(`Transaction hash: ${error.transactionHash ? error.transactionHash : 'N/A'}`);
        console.error(error);
      }
  }
  
// Using async/await pattern to handle errors properly
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});