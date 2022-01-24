import Web3ProviderContext from '@/context/useWeb3ProviderContext';
import { ethers } from 'ethers';
import { useContext, useEffect } from 'react';
import { metaMastTestAddress } from '@/constants/addressConstants';

const usdc = {
  address: metaMastTestAddress,
  abi: [
    'function gimmeSome() external',
    'function balanceOf(address _owner) public view returns (uint256 balance)',
    'function transfer(address _to, uint256 _value) public returns (bool success)',
  ],
};

const useMintUsdc = () => {
  const { provider, etherLoaded } = useContext(Web3ProviderContext);
  const mintUsdc = async () => {
    if (etherLoaded) {
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      let userAddress = await signer.getAddress();
      const usdcContract = new ethers.Contract(usdc.address, usdc.abi, signer);

      const tx = await usdcContract.gimmeSome({ gasPrice: 20e9 });
      console.log(`Transaction hash: ${tx.hash}`);

      const receipt = await tx.wait();
      console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
      console.log(`Gas used: ${receipt.gasUsed.toString()}`);
    }
  };

  return [mintUsdc];
};

export default useMintUsdc;
