import {useWeb3React} from '@web3-react/core';
import useSWR from 'swr';
import React, {useEffect} from 'react';
import {Contract} from '@ethersproject/contracts';
import ERC20ABI from '../../contract/Token.json';
import {formatUnits} from '@ethersproject/units';

const TokenBalance = ({symbol, address, decimals}) => {
  const {account, library} = useWeb3React();
  const {data: balance, mutate} = useSWR([address, 'balanceOf', account]);

  useEffect(() => {
    // listen for changes on an Ethereum address
    console.log(`listening for Transfer...`);
    const contract = new Contract(
      address,
      ERC20ABI.result,
      library.getSigner()
    );
    const fromMe = contract.filters.Transfer(account, null);
    library.on(fromMe, (from, to, amount, event) => {
      console.log('Transfer|sent', {from, to, amount, event});
      mutate(undefined, true);
    });
    const toMe = contract.filters.Transfer(null, account);
    library.on(toMe, (from, to, amount, event) => {
      console.log('Transfer|received', {from, to, amount, event});
      mutate(undefined, true);
    });
    // remove listener when the component is unmounted
    return () => {
      library.removeAllListeners(toMe);
      library.removeAllListeners(fromMe);
    };
    // trigger the effect only on component mount
  }, []);

  if (!balance) {
    return <span>{symbol} : ...</span>;
  }
  return (
    <span>
      {symbol} : {Number(formatUnits(balance, decimals)).toFixed(2)}
    </span>
  );
};
export default TokenBalance;
