import { JsonRpcProvider, id } from "ethers";

const provider = new JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/iwnhLTcUCNedw8OKjdgMiX75kyL7N1K-");

async function pollBlock(blockNumber: number) {

    const logs = await provider.getLogs({
        address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        fromBlock: blockNumber,
        toBlock: blockNumber + 2,
        topics: [id("Transfer(address,address,uint256)")]
    });

    console.log(logs);
}

async function main() {
    const currentBlock = 1;
    while (1) {
        await pollBlock(currentBlock)
    }
}

pollBlock(21493826)

