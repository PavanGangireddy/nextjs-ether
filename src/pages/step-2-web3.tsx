import React, { useContext, useEffect, useState } from 'react';
import { Transaction } from 'ethereumjs-tx';
import Web3 from 'web3';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Vercel from '~/svg/Vercel.svg';
import Step2Learning from '@/content/step-2-learning.mdx';
import {
  infuraMainnetAPIEndpoint,
  infuraRobstenTestNetAPIEndpoint,
} from '@/constants/infuraConstants';
import { omgContractAbi } from '@/contracts/omg-contract';
import { maticContractAbi } from '@/contracts/matic-contract';

const userAddress = '0x00192Fb10dF37c9FB26829eb2CC623cd1BF599E8';

const OMGContractAddressOnMainnet =
  '0xd26114cd6EE289AccF82350c8d8487fedB8A0C07';

const MaticContractAddressOnMainnet =
  '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0';

const Web3Example = () => {
  const [balance, setBalance] = useState('');
  const [account1Balance, setAccount1Balance] = useState('');
  const [account2Balance, setAccount2Balance] = useState('');

  const setFormattedBalanceFromMainnet = async (walletAddress: string) => {
    const web3Instance = new Web3(infuraMainnetAPIEndpoint);
    web3Instance.eth.getBalance(walletAddress, (err, wei) => {
      setBalance(web3Instance.utils.fromWei(wei, 'ether'));
    });
  };

  useEffect(() => {
    setFormattedBalanceFromMainnet(userAddress);
  }, []);

  useEffect(() => {
    const web3Instance = new Web3(infuraMainnetAPIEndpoint);
    const contract = new web3Instance.eth.Contract(
      omgContractAbi as any,
      OMGContractAddressOnMainnet
    );
    contract.methods.totalSupply().call((err: any, result: any) => {
      console.log(result);
    });
    contract.methods.name().call((err: any, result: any) => {
      console.log(result);
    });
    contract.methods.symbol().call((err: any, result: any) => {
      console.log(result);
    });
    contract.methods
      .balanceOf('0xd26114cd6EE289AccF82350c8d8487fedB8A0C07')
      .call((err: any, result: any) => {
        console.log(result);
      });
  }, []);

  useEffect(() => {
    const web3Instance = new Web3(infuraRobstenTestNetAPIEndpoint);
    const account1 = '0xC1eCC681E260FDf5A541e69B58948B7C14E82E11';
    const account2 = '0xa75dcD7DAF8D2D7505c81F0337884608139e04D5';

    web3Instance.eth.getTransactionCount(account1, (err, txCount) => {
      console.log(
        '-----------------Transactions--------------------------------'
      );

      // Build the transaction

      const txObject = {
        nonce: web3Instance.utils.toHex(txCount),
        to: account2,
        value: web3Instance.utils.toHex(
          web3Instance.utils.toWei('0.0001', 'ether')
        ),
        gasLimit: web3Instance.utils.toHex(21000),
        gasPrice: web3Instance.utils.toHex(
          web3Instance.utils.toWei('10', 'gwei')
        ),
      };

      // Sign the transaction
      // @ts-ignore
      const tx = new Transaction(txObject, { chain: 'ropsten' });
      tx.sign(
        Buffer.from(
          'f7c67782f1e96e005b0458cc743e72fbf2a8e95a2686eea2986bb38bd3e7a1c4',
          'hex'
        )
      );

      const serializedTx = tx.serialize();
      const raw = '0x' + serializedTx.toString('hex');

      // Broadcast the transaction
      // web3Instance.eth.sendSignedTransaction(raw, (err, txHash) => {
      //   console.log('txHash:', txHash);
      //   console.log('err:', err);
      // });
    });
  }, []);
  useEffect(() => {
    const web3Instance = new Web3(infuraRobstenTestNetAPIEndpoint);
    const account1 = '0xC1eCC681E260FDf5A541e69B58948B7C14E82E11';

    web3Instance.eth.getTransactionCount(account1, (err, txCount) => {
      console.log(
        '-----------------Deploying smart contract--------------------------------'
      );
      // deploy

      const data =
        '0x60806040523480156200001157600080fd5b506040516200146c3803806200146c833981810160405281019062000037919062000243565b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060018060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018190555060005b81518110156200017657600260405180604001604052808484815181106200010f576200010e620003b3565b5b60200260200101518152602001600081525090806001815401808255809150506001900390600052602060002090600202016000909190919091506000820151816000015560208201518160010155505080806200016d9062000336565b915050620000e2565b505062000450565b6000620001956200018f84620002bd565b62000294565b90508083825260208201905082856020860282011115620001bb57620001ba62000416565b5b60005b85811015620001ef5781620001d488826200022c565b845260208401935060208301925050600181019050620001be565b5050509392505050565b600082601f83011262000211576200021062000411565b5b8151620002238482602086016200017e565b91505092915050565b6000815190506200023d8162000436565b92915050565b6000602082840312156200025c576200025b62000420565b5b600082015167ffffffffffffffff8111156200027d576200027c6200041b565b5b6200028b84828501620001f9565b91505092915050565b6000620002a0620002b3565b9050620002ae828262000300565b919050565b6000604051905090565b600067ffffffffffffffff821115620002db57620002da620003e2565b5b602082029050602081019050919050565b6000819050919050565b6000819050919050565b6200030b8262000425565b810181811067ffffffffffffffff821117156200032d576200032c620003e2565b5b80604052505050565b60006200034382620002f6565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141562000379576200037862000384565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b6200044181620002ec565b81146200044d57600080fd5b50565b61100c80620004606000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063609ff1bd1161005b578063609ff1bd146101145780639e7b8d6114610132578063a3ec138d1461014e578063e2ba53f01461018157610088565b80630121b93f1461008d578063013cf08b146100a95780632e4176cf146100da5780635c19a95c146100f8575b600080fd5b6100a760048036038101906100a29190610a01565b61019f565b005b6100c360048036038101906100be9190610a01565b6102e6565b6040516100d1929190610b95565b60405180910390f35b6100e261031a565b6040516100ef9190610b5f565b60405180910390f35b610112600480360381019061010d91906109d4565b61033e565b005b61011c6106da565b6040516101299190610c9e565b60405180910390f35b61014c600480360381019061014791906109d4565b610762565b005b610168600480360381019061016391906109d4565b610919565b6040516101789493929190610cb9565b60405180910390f35b610189610976565b6040516101969190610b7a565b60405180910390f35b6000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060008160000154141561022a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161022190610bbe565b60405180910390fd5b8060010160009054906101000a900460ff161561027c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161027390610bde565b60405180910390fd5b60018160010160006101000a81548160ff0219169083151502179055508181600201819055508060000154600283815481106102bb576102ba610e2f565b5b906000526020600020906002020160010160008282546102db9190610d0f565b925050819055505050565b600281815481106102f657600080fd5b90600052602060002090600202016000915090508060000154908060010154905082565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff16156103d3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103ca90610bfe565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610442576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161043990610c7e565b60405180910390fd5b5b600073ffffffffffffffffffffffffffffffffffffffff16600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146105b257600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691503373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156105ad576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105a490610c3e565b60405180910390fd5b610443565b60018160010160006101000a81548160ff021916908315150217905550818160010160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff16156106b5578160000154600282600201548154811061068957610688610e2f565b5b906000526020600020906002020160010160008282546106a99190610d0f565b925050819055506106d5565b81600001548160000160008282546106cd9190610d0f565b925050819055505b505050565b6000806000905060005b60028054905081101561075d57816002828154811061070657610705610e2f565b5b906000526020600020906002020160010154111561074a576002818154811061073257610731610e2f565b5b90600052602060002090600202016001015491508092505b808061075590610db7565b9150506106e4565b505090565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146107f0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107e790610c1e565b60405180910390fd5b600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff1615610880576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161087790610c5e565b60405180910390fd5b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154146108cf57600080fd5b60018060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018190555050565b60016020528060005260406000206000915090508060000154908060010160009054906101000a900460ff16908060010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020154905084565b600060026109826106da565b8154811061099357610992610e2f565b5b906000526020600020906002020160000154905090565b6000813590506109b981610fa8565b92915050565b6000813590506109ce81610fbf565b92915050565b6000602082840312156109ea576109e9610e5e565b5b60006109f8848285016109aa565b91505092915050565b600060208284031215610a1757610a16610e5e565b5b6000610a25848285016109bf565b91505092915050565b610a3781610d65565b82525050565b610a4681610d77565b82525050565b610a5581610d83565b82525050565b6000610a68601483610cfe565b9150610a7382610e63565b602082019050919050565b6000610a8b600e83610cfe565b9150610a9682610e8c565b602082019050919050565b6000610aae601283610cfe565b9150610ab982610eb5565b602082019050919050565b6000610ad1602883610cfe565b9150610adc82610ede565b604082019050919050565b6000610af4601983610cfe565b9150610aff82610f2d565b602082019050919050565b6000610b17601883610cfe565b9150610b2282610f56565b602082019050919050565b6000610b3a601e83610cfe565b9150610b4582610f7f565b602082019050919050565b610b5981610dad565b82525050565b6000602082019050610b746000830184610a2e565b92915050565b6000602082019050610b8f6000830184610a4c565b92915050565b6000604082019050610baa6000830185610a4c565b610bb76020830184610b50565b9392505050565b60006020820190508181036000830152610bd781610a5b565b9050919050565b60006020820190508181036000830152610bf781610a7e565b9050919050565b60006020820190508181036000830152610c1781610aa1565b9050919050565b60006020820190508181036000830152610c3781610ac4565b9050919050565b60006020820190508181036000830152610c5781610ae7565b9050919050565b60006020820190508181036000830152610c7781610b0a565b9050919050565b60006020820190508181036000830152610c9781610b2d565b9050919050565b6000602082019050610cb36000830184610b50565b92915050565b6000608082019050610cce6000830187610b50565b610cdb6020830186610a3d565b610ce86040830185610a2e565b610cf56060830184610b50565b95945050505050565b600082825260208201905092915050565b6000610d1a82610dad565b9150610d2583610dad565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610d5a57610d59610e00565b5b828201905092915050565b6000610d7082610d8d565b9050919050565b60008115159050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6000610dc282610dad565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415610df557610df4610e00565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600080fd5b7f486173206e6f20726967687420746f20766f7465000000000000000000000000600082015250565b7f416c726561647920766f7465642e000000000000000000000000000000000000600082015250565b7f596f7520616c726561647920766f7465642e0000000000000000000000000000600082015250565b7f4f6e6c79206368616972706572736f6e2063616e20676976652072696768742060008201527f746f20766f74652e000000000000000000000000000000000000000000000000602082015250565b7f466f756e64206c6f6f7020696e2064656c65676174696f6e2e00000000000000600082015250565b7f54686520766f74657220616c726561647920766f7465642e0000000000000000600082015250565b7f53656c662d64656c65676174696f6e20697320646973616c6c6f7765642e0000600082015250565b610fb181610d65565b8114610fbc57600080fd5b50565b610fc881610dad565b8114610fd357600080fd5b5056fea2646970667358221220fac26fe5b2932c5882a6eadf9dcf85d62e21d2fee932a1f87214a86d3b675fc164736f6c63430008070033';

      // Build the transaction

      const txObject = {
        nonce: web3Instance.utils.toHex(txCount),
        gasLimit: web3Instance.utils.toHex(500000),
        gasPrice: web3Instance.utils.toHex(
          web3Instance.utils.toWei('10', 'gwei')
        ),
        data: data,
      };

      // Sign the transaction
      // @ts-ignore
      const tx = new Transaction(txObject, { chain: 'ropsten' });
      tx.sign(
        Buffer.from(
          'f7c67782f1e96e005b0458cc743e72fbf2a8e95a2686eea2986bb38bd3e7a1c4',
          'hex'
        )
      );

      const serializedTx = tx.serialize();
      const raw = '0x' + serializedTx.toString('hex');

      // Broadcast the transaction
      // web3Instance.eth.sendSignedTransaction(raw, (err, txHash) => {
      //   console.log('txHash:', txHash);
      //   console.log('err:', err);
      // });
    });
  }, []);

  useEffect(() => {
    const web3Instance = new Web3(infuraRobstenTestNetAPIEndpoint);
    const account1 = '0xC1eCC681E260FDf5A541e69B58948B7C14E82E11';
    const account2 = '0xa75dcD7DAF8D2D7505c81F0337884608139e04D5';

    // Read the deployed contract - get the addresss from Etherscan
    const contractAddress = '0xd03696B53924972b9903eB17Ac5033928Be7D3Bc';
    const contractABI = [
      {
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { name: '_spender', type: 'address' },
          { name: '_value', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [{ name: 'success', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { name: '_from', type: 'address' },
          { name: '_to', type: 'address' },
          { name: '_value', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [{ name: 'success', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'standard',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [{ name: '', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { name: '_to', type: 'address' },
          { name: '_value', type: 'uint256' },
        ],
        name: 'transfer',
        outputs: [{ name: 'success', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          { name: '', type: 'address' },
          { name: '', type: 'address' },
        ],
        name: 'allowance',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: '_from', type: 'address' },
          { indexed: true, name: '_to', type: 'address' },
          { indexed: false, name: '_value', type: 'uint256' },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: '_owner', type: 'address' },
          { indexed: true, name: '_spender', type: 'address' },
          { indexed: false, name: '_value', type: 'uint256' },
        ],
        name: 'Approval',
        type: 'event',
      },
    ];

    const contract = new web3Instance.eth.Contract(
      contractABI as any,
      contractAddress
    );

    web3Instance.eth.getTransactionCount(account1, (err, txCount) => {
      console.log(
        '-----------------Calling Smart Contract Functions with Web3.js--------------------------------'
      );

      // Build the transaction

      const txObject = {
        nonce: web3Instance.utils.toHex(txCount),
        gasLimit: web3Instance.utils.toHex(800000), // Raise the gas limit to a much higher amount
        gasPrice: web3Instance.utils.toHex(
          web3Instance.utils.toWei('10', 'gwei')
        ),
        to: contractAddress,
        data: contract.methods.transfer(account2, 1000).encodeABI(),
      };
      // Sign the transaction
      // @ts-ignore
      const tx = new Transaction(txObject, { chain: 'ropsten' });
      tx.sign(
        Buffer.from(
          'f7c67782f1e96e005b0458cc743e72fbf2a8e95a2686eea2986bb38bd3e7a1c4',
          'hex'
        )
      );

      const serializedTx = tx.serialize();
      const raw = '0x' + serializedTx.toString('hex');

      // Broadcast the transaction
      // web3Instance.eth.sendSignedTransaction(raw, (err, txHash) => {
      //   console.log('txHash:', txHash);
      //   console.log('err:', err);
      // });
    });
  }, []);

  useEffect(() => {
    console.log(
      '-----------------Smart Contract Events with Web3.js--------------------------------'
    );
    const web3Instance = new Web3(infuraMainnetAPIEndpoint);
    const contract = new web3Instance.eth.Contract(
      maticContractAbi as any,
      MaticContractAddressOnMainnet
    );
    contract.methods.totalSupply().call((err: any, result: any) => {
      console.log(result);
    });
    contract.methods.name().call((err: any, result: any) => {
      console.log(result);
    });
    contract.getPastEvents(
      'AllEvents', // "Transfer"
      {
        fromBlock: 14074401,
        toBlock: 'latest',
      },
      (err, events) => {
        console.log(events);
      }
    );
  }, []);

  useEffect(() => {
    const web3Instance = new Web3(infuraMainnetAPIEndpoint);

    // get latest block number
    web3Instance.eth.getBlockNumber().then(console.log);

    // // get latest block
    web3Instance.eth.getBlock('latest').then(console.log);

    // get latest 10 blocks
    web3Instance.eth.getBlockNumber().then((latest) => {
      for (let i = 0; i < 10; i++) {
        web3Instance.eth.getBlock(latest - i).then(console.log);
      }
    });

    // get transaction from specific block
    const hash =
      '0x66b3fd79a49dafe44507763e9b6739aa0810de2c15590ac22b5e2f0a3f502073';
    web3Instance.eth.getTransactionFromBlock(hash, 2).then(console.log);
  });
  return (
    <Layout>
      <Seo />
      <main>
        <section className='bg-white'>
          <div className='flex flex-col items-center justify-center layout text-center'>
            <h1 className='mt-4'>Using web3</h1>
            <h3 className='mb-4 mt-4 text-center'>Checking Account Balances</h3>
            <p className='mb-4 mt-4'>
              1. Using Address on mainnet etherscan: {userAddress}
            </p>
            <p className='mb-4 mt-4'>2. Balance from address {balance}</p>
            <h3 className='mb-4 mt-4'>
              Read Data from Smart Contracts with Web3.js
            </h3>
            <h3 className='mb-4 mt-4'>
              How to create transactions on The Ethereum Blockchain with
              Web3.js.
            </h3>
            <h3 className='mb-4 mt-4'>
              Deploying Smart Contracts with Web3.js
            </h3>
            <h3 className='mb-4 mt-4'>
              Calling Smart Contract Functions with Web3.js
            </h3>
            <h3 className='mb-4 mt-4'>Smart Contract Events with Web3.js</h3>
          </div>

          <div className='flex flex-col items-center justify-center layout w-full'>
            <Step2Learning />
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Web3Example;
