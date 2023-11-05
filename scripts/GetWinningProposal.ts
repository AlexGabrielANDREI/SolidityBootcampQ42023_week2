import { ethers } from "ethers";
import { prepareContractCall } from "./Helpers";
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
    const {parameters, ballotContract} = await prepareContractCall(process.argv, 1);
    const contractAddress = parameters[0];

    // Calling winningProposal function
    const receipt = await ballotContract.winningProposal();
    const proposal = await ballotContract.proposals(receipt);
    const name = ethers.decodeBytes32String(proposal.name);
    console.log(`Winning proposal: ${name} (index: ${receipt})`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });