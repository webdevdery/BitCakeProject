import {TOKENS_BY_NETWORK} from '../../constants';
import TokenBalance from '../TokenBalance';
import React from 'react';

const TokenList = ({chainId}) => {
  return (
    <>
      {TOKENS_BY_NETWORK[chainId].map((token) => (
        <TokenBalance key={token.address} {...token} />
      ))}
    </>
  );
};
export default TokenList;
