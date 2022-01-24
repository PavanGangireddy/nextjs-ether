import React, { useContext, useEffect, useState } from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Vercel from '~/svg/Vercel.svg';
import { ethers } from 'ethers';
import Web3ProviderContext from '@/context/useWeb3ProviderContext';
import useMintUsdc from '@/hooks/useMintUsdc';
import Button from '@/components/buttons/Button';
import { usdcAddressAndAbi } from '@/constants/addressConstants';
import TransactionForm from '@/components/TransactionForm';
import Step1Learning from '@/content/step-1-learning.mdx';

const EtherFirst = () => {
  let [balance, setBalance] = useState('');
  const [usdcBalance, setUsdcBalance] = useState('');
  const value = useContext(Web3ProviderContext);

  const { provider, userAddress, signer, etherLoaded } = value;

  const requestEthAccounts = async () => {
    await provider.send('eth_requestAccounts', []);
  };

  const setFormattedBalance = async (wallet: string | Promise<string>) => {
    let bigIntBalance = await provider.getBalance(wallet);
    let formattedBalance = ethers.utils.formatEther(bigIntBalance);
    setBalance(formattedBalance);
  };

  useEffect(() => {
    if (etherLoaded) {
      const createUsdcContractAndSetBalanceInUsd = async () => {
        const usdcContract = new ethers.Contract(
          usdcAddressAndAbi.address,
          usdcAddressAndAbi.abi,
          signer
        );
        let usdcB = await usdcContract.balanceOf(userAddress);
        usdcB = ethers.utils.formatUnits(usdcB, 6);

        setUsdcBalance(usdcB);
      };
      createUsdcContractAndSetBalanceInUsd();
    }
  }, [etherLoaded]);

  useEffect(() => {
    if (etherLoaded) {
      requestEthAccounts();
    }
  }, [etherLoaded]);

  useEffect(() => {
    if (etherLoaded) {
      setFormattedBalance('0xC1eCC681E260FDf5A541e69B58948B7C14E82E11');
    }
  }, [etherLoaded]);

  const [mintUsdc] = useMintUsdc();

  return (
    <Layout>
      <Seo />
      <main>
        <section className='bg-white'>
          <div className='flex flex-col items-center justify-center layout text-center'>
            <Vercel className='text-5xl' />
            <h1 className='mt-4'>Using Etherjs</h1>
            <p className='mb-4 mt-4'>Wallet: Your wallet is {userAddress}</p>
            <p className='mb-4 mt-4'>
              Current balance: Your balance is {balance}
            </p>
            <p className='mb-4 mt-4'>
              Current usdcBalance: Your usdcBalance is {usdcBalance}
            </p>
            <Button onClick={mintUsdc} variant={'primary'}>
              MintUSDC
            </Button>
          </div>
          <div className='flex flex-col items-center justify-center layout max-w-xs w-full'>
            <TransactionForm />
          </div>
          <div className='flex flex-col items-center justify-center layout w-full'>
            <Step1Learning />
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default EtherFirst;
