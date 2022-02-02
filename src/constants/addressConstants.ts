export const metaMastTestAddress= '0x68ec573C119826db2eaEA1Efbfc2970cDaC869c4';

export const usdcAddressAndAbi = {
  address: metaMastTestAddress,
  abi: [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function gimmeSome() external',
    'function balanceOf(address _owner) public view returns (uint256 balance)',
    'function transfer(address _to, uint256 _value) public returns (bool success)',
  ],
};
