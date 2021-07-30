// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFTsRealm is ERC721URIStorage, Ownable {

    constructor() ERC721("BitCake NFT", "BitCakeNFT") {}
    
    function mint(
        uint256 _id,
        address _to,
        string memory  _tokenURI
    ) public
    {
        _safeMint(_to, _id);
        _setTokenURI(_id, _tokenURI);
    }
}