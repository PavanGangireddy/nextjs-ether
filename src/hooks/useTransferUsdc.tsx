import Web3ProviderContext from '@/context/useWeb3ProviderContext';
import { ethers } from 'ethers';
import { useContext, useEffect } from 'react';
import { usdcAddressAndAbi } from '@/constants/addressConstants';

const useTransferUsdc = () => {
  let receiver: any;
  let response;
  let amount: any;
  const { provider, userAddress, signer, etherLoaded } =
    useContext(Web3ProviderContext);

  const startTransfer = async (receiverInput: string, amountInBigInt: any) => {
    const usdcContract = new ethers.Contract(
      usdcAddressAndAbi.address,
      usdcAddressAndAbi.abi,
      signer
    );

    try {
      receiver = ethers.utils.getAddress(receiverInput);
    } catch {
      response = `Invalid address: ${receiver}`;
    }

    try {
      amount = ethers.utils.parseUnits(amountInBigInt, 6);
      if (amount.isNegative()) {
        throw new Error();
      }
    } catch {
      console.error(`Invalid amount: ${amount}`);
      response = `Invalid amount: ${amount}`;
    }

    const balance = await usdcContract.balanceOf(userAddress);

    if (balance.lt(amount)) {
      let amountFormatted = ethers.utils.formatUnits(amount, 6);
      let balanceFormatted = ethers.utils.formatUnits(balance, 6);
      console.error(
        `Insufficient balance receiver send ${amountFormatted} (You have ${balanceFormatted})`
      );

      response = `Insufficient balance receiver send ${amountFormatted} (You have ${balanceFormatted})`;
    }
    let amountFormatted = ethers.utils.formatUnits(amount, 6);

    response = `Transferring ${amountFormatted} USDC receiver ${receiver.slice(
      0,
      6
    )}...`;

    const tx = await usdcContract.transfer(receiver, amount, {
      gasPrice: 20e9,
    });
    console.log(`Transaction hash: ${tx.hash}`);
    const receipt = await tx.wait();
    console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
  };
  return [startTransfer, response];
};

export default useTransferUsdc;
