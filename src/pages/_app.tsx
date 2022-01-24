import { AppProps } from 'next/app';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';
import '@code-hike/mdx/dist/index.css';

import Layout from '@/components/layout/Layout';
import Web3ProviderContext from '@/context/useWeb3ProviderContext';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [config, setConfig] = useState({
    etherLoaded: false,
    provider: null,
    signer: null,
    userAddress: null,
  });
  useEffect(() => {
    let instance = new ethers.providers.Web3Provider(
      (window as any).ethereum,
      'any'
    ) as any;
    const signer = instance.getSigner();
    const getAddress = async () => {
      let userAddress = await signer.getAddress();
      setConfig({
        provider: instance,
        signer,
        userAddress,
        etherLoaded: true,
      });
    };
    getAddress();
  }, []);
  return (
    <Web3ProviderContext.Provider value={config}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Web3ProviderContext.Provider>
  );
}

export default MyApp;
