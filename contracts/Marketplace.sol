// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./contracts/ReentrancyGuard.sol";
import "./interfaces/IMarket.sol";
import "./BitCake.sol";

import "@openzeppelin/contracts/utils/Counters.sol";

contract IMediaModified {
    mapping(uint256 => address) public tokenCreators;
    address public marketContract;
}

interface IWKCS {
    function deposit() external payable;

    function transfer(address to, uint256 value) external returns (bool);
}

contract BitCakeMarketplace is ReentrancyGuard {
    
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    // Use OpenZeppelin's SafeMath library to prevent overflows.
    using SafeMath for uint256;

    // ============ Constants ============

    // The minimum amount of time left in an auction after a new bid is created; 15 min.
    uint16 public constant TIME_BUFFER = 900;
    // The KCS needed above the current bid for a new bid to be valid; 0.001 KCS.
    uint8 public constant MIN_BID_INCREMENT_PERCENT = 10;
    // Interface constant for ERC721, to check values in constructor.
    bytes4 private constant ERC721_INTERFACE_ID = 0x80ac58cd;
    // Allows external read `getVersion()` to return a version for the auction.
    uint256 private constant RESERVE_AUCTION_VERSION = 1;

    // ============ Immutable Storage ============

    // The address of the ERC721 contract for tokens auctioned via this contract.
    address public immutable nftContract;
    // The address of the WKCS contract, so that KCS can be transferred via
    // WKCS if native KCS transfers fail.
    address public immutable WKCSAddress;
    // The address that initially is able to recover assets.
    address public immutable adminRecoveryAddress;

    bool private _adminRecoveryEnabled;

    bool private _paused;
    
    mapping (uint256 => uint) public getTokenId;
    mapping (uint => uint256) public price;
    mapping (uint => bool) public listedMap;
    // A mapping of all of the auctions currently running.
    mapping(uint256 => Auction) public auctions;

    // ============ Structs ============

    struct Auction {
        // The value of the current highest bid.
        uint256 amount;
        // The amount of time that the auction should run for,
        // after the first bid was made.
        uint256 duration;
        // The time of the first bid.
        uint256 firstBidTime;
        // The minimum price of the first bid.
        uint256 reservePrice;
        uint8 CreatorFeePercent;
        // The address of the auction's Creator. The Creator
        // can cancel the auction if it hasn't had a bid yet.
        address Creator;
        // The address of the current highest bid.
        address payable bidder;
        // The address that should receive funds once the NFT is sold.
        address payable fundsRecipient;
    }

    // ============ Events ============

    // All of the details of a new auction,
    // with an index created for the tokenId.
    event AuctionCreated(
        uint256 indexed tokenId,
        address nftContractAddress,
        uint256 duration,
        uint256 reservePrice,
        uint8 CreatorFeePercent,
        address Creator,
        address fundsRecipient
    );

    // All of the details of a new bid,
    // with an index created for the tokenId.
    event AuctionBid(
        uint256 indexed tokenId,
        address nftContractAddress,
        address sender,
        uint256 value
    );

    // All of the details of an auction's cancelation,
    // with an index created for the tokenId.
    event AuctionCanceled(
        uint256 indexed tokenId,
        address nftContractAddress,
        address Creator
    );

    // All of the details of an auction's close,
    // with an index created for the tokenId.
    event AuctionEnded(
        uint256 indexed tokenId,
        address nftContractAddress,
        address Creator,
        address winner,
        uint256 amount,
        address nftCreator,
        address payable fundsRecipient
    );

    // When the Creator recevies fees, emit the details including the amount,
    // with an index created for the tokenId.
    event CreatorFeePercentTransfer(
        uint256 indexed tokenId,
        address Creator,
        uint256 amount
    );

    // Emitted in the case that the contract is paused.
    event Paused(address account);
    // Emitted when the contract is unpaused.
    event Unpaused(address account);
    event Purchase(address indexed previousOwner, address indexed newOwner, uint256 price, uint nftID);
    event Minted(address indexed minter, uint256 price, uint nftID, string uri, bool status);
    event Burned(uint nftID);
    event PriceUpdate(address indexed owner, uint256 oldPrice, uint256 newPrice, uint nftID);
    event NftListStatus(address indexed owner, uint nftID, bool isListed);
    event Withdrawn(uint256 amount, address wallet);
    event TokensWithdrawn(uint256 amount, address wallet);
    
    // ============ Modifiers ============

    // Reverts if the sender is not admin, or admin
    // functionality has been turned off.
    modifier onlyAdminRecovery() {
        require(
            // The sender must be the admin address, and
            // adminRecovery must be set to true.
            adminRecoveryAddress == msg.sender && adminRecoveryEnabled(),
            "Caller does not have admin privileges"
        );
        _;
    }

    // Reverts if the sender is not the auction's Creator.
    modifier onlyCreator(uint256 tokenId) {
        require(
            auctions[tokenId].Creator == msg.sender,
            "Can only be called by auction Creator"
        );
        _;
    }

    // Reverts if the contract is paused.
    modifier whenNotPaused() {
        require(!paused(), "Contract is paused");
        _;
    }

    // Reverts if the auction does not exist.
    modifier auctionExists(uint256 tokenId) {
        // The auction exists if the Creator is not null.
        require(!auctionCreatorIsNull(tokenId), "Auction doesn't exist");
        _;
    }

    // Reverts if the auction exists.
    modifier auctionNonExistant(uint256 tokenId) {
        // The auction does not exist if the Creator is null.
        require(auctionCreatorIsNull(tokenId), "Auction already exists");
        _;
    }

    // Reverts if the auction is expired.
    modifier auctionNotExpired(uint256 tokenId) {
        require(
            // Auction is not expired if there's never been a bid, or if the
            // current time is less than the time at which the auction ends.
            auctions[tokenId].firstBidTime == 0 ||
                block.timestamp < auctionEnds(tokenId),
            "Auction expired"
        );
        _;
    }

    // Reverts if the auction is not complete.
    // Auction is complete if there was a bid, and the time has run out.
    modifier auctionComplete(uint256 tokenId) {
        require(
            // Auction is complete if there has been a bid, and the current time
            // is greater than the auction's end time.
            auctions[tokenId].firstBidTime > 0 &&
                block.timestamp >= auctionEnds(tokenId),
            "Auction hasn't completed"
        );
        _;
    }

    // ============ Constructor ============

    constructor(
        address nftContract_,
        address WKCSAddress_,
        address adminRecoveryAddress_
    ) {
        require(
            IERC165(nftContract_).supportsInterface(ERC721_INTERFACE_ID),
            "Contract at nftContract_ address does not support NFT interface"
        );
        // Initialize immutable memory.
        nftContract = nftContract_;
        WKCSAddress = WKCSAddress_;
        adminRecoveryAddress = adminRecoveryAddress_;
        // Initialize mutable memory.
        _paused = false;
        _adminRecoveryEnabled = true;
    }
    
    function openTrade(uint _id, uint256 _price)
    public
    {
        BitCake(nftContract).transferFrom(msg.sender, address(this), _id);
        listedMap[_id] = true;
        price[_id] = _price;
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        getTokenId[newTokenId] = _id;
    }

    function buy(uint _id, address _creator, uint256 _price, bool _isNew, string memory _tokenUri) external payable {
        if (_isNew) {
            _tokenIds.increment();
            uint256 newTokenId = _tokenIds.current();

            price[newTokenId] = _price;
            require(address(msg.sender).balance >= price[newTokenId], "Error, the amount is lower");

            // 2.5% commission cut
            uint256 _commissionValue = price[newTokenId].mul(25).div(1000);
            uint _sellerValue = price[newTokenId].sub(_commissionValue);
            transferKCSOrWKCS(_creator, _sellerValue);
            transferKCSOrWKCS(adminRecoveryAddress, _commissionValue);
            BitCake(nftContract).mint(newTokenId, msg.sender, _tokenUri);
            emit Purchase(_creator, msg.sender, price[newTokenId], newTokenId);
        } else {
            _validate(_id);
            address _previousOwner = BitCake(nftContract).ownerOf(_id);
            address _newOwner = msg.sender;

            // 5% commission cut
            uint256 _commissionValue = price[_id].mul(25).div(1000);
            uint _sellerValue = price[_id].sub(_commissionValue);
            // _owner.transfer(_owner, _sellerValue);
            transferKCSOrWKCS(_previousOwner, _sellerValue);
            transferKCSOrWKCS(adminRecoveryAddress, _commissionValue);
            BitCake(nftContract).transferFrom(_previousOwner, _newOwner, _id);
            
            listedMap[_id] = false;

            emit Purchase(_previousOwner, _newOwner, price[_id], _id);
        }

    }

    function _validate(uint _id) internal view {
        bool isItemListed = listedMap[_id];
        require(isItemListed, "Item not listed currently");
        require(msg.sender != BitCake(nftContract).ownerOf(_id), "Can not buy what you own");
        require(address(msg.sender).balance >= price[_id], "Error, the amount is lower");
    }
    
    
    function updatePrice(uint _tokenId, uint256 _price) public returns (bool) {
        uint oldPrice = price[_tokenId];
        require(msg.sender == BitCake(nftContract).ownerOf(_tokenId), "Error, you are not the owner");
        price[_tokenId] = _price;

        emit PriceUpdate(msg.sender, oldPrice, _price, _tokenId);
        return true;
    }

    function updateListingStatus(uint _tokenId, bool shouldBeListed) public returns (bool) {
        require(msg.sender == BitCake(nftContract).ownerOf(_tokenId), "Error, you are not the owner");

        listedMap[_tokenId] = shouldBeListed;

        emit NftListStatus(msg.sender, _tokenId, shouldBeListed);

        return true;
    }

    // ============ Create Auction ============

    function createAuction(
        uint256 tokenId,
        uint256 duration,
        uint256 reservePrice,
        uint8 CreatorFeePercent,
        address Creator,
        address payable fundsRecipient
    ) external nonReentrant whenNotPaused auctionNonExistant(tokenId) {
        // Check basic input requirements are reasonable.
        require(Creator != address(0));
        require(fundsRecipient != address(0));
        require(CreatorFeePercent < 100, "Creator fee should be < 100");
        // Initialize the auction details, including null values.
        auctions[tokenId] = Auction({
            duration: duration,
            reservePrice: reservePrice,
            CreatorFeePercent: CreatorFeePercent,
            Creator: Creator,
            fundsRecipient: fundsRecipient,
            amount: 0,
            firstBidTime: 0,
            bidder: payable(address(0))
        });
        // Transfer the NFT into this auction contract, from whoever owns it.
        BitCake(nftContract).transferFrom(
            BitCake(nftContract).ownerOf(tokenId),
            address(this),
            tokenId
        );
        // Emit an event describing the new auction.
        emit AuctionCreated(
            tokenId,
            nftContract,
            duration,
            reservePrice,
            CreatorFeePercent,
            Creator,
            fundsRecipient
        );
    }

    // ============ Create Bid ============

    function createBid(uint256 tokenId, uint256 amount)
        external
        payable
        nonReentrant
        whenNotPaused
        auctionExists(tokenId)
        auctionNotExpired(tokenId)
    {
        // Validate that the user's expected bid value matches the KCS deposit.
        require(amount == msg.value, "Amount doesn't equal msg.value");
        require(amount > 0, "Amount must be greater than 0");
        // Check if the current bid amount is 0.
        if (auctions[tokenId].amount == 0) {
            // If so, it is the first bid.
            auctions[tokenId].firstBidTime = block.timestamp;
            // We only need to check if the bid matches reserve bid for the first bid,
            // since future checks will need to be higher than any previous bid.
            require(
                amount >= auctions[tokenId].reservePrice,
                "Must bid reservePrice or more"
            );
        } else {
            // Check that the new bid is sufficiently higher than the previous bid, by
            // the percentage defined as MIN_BID_INCREMENT_PERCENT.
            require(
                amount >=
                    auctions[tokenId].amount.add(
                        // Add 10% of the current bid to the current bid.
                        auctions[tokenId]
                            .amount
                            .mul(MIN_BID_INCREMENT_PERCENT)
                            .div(100)
                    ),
                "Must bid more than last bid by MIN_BID_INCREMENT_PERCENT amount"
            );

            // Refund the previous bidder.
            transferKCSOrWKCS(
                auctions[tokenId].bidder,
                auctions[tokenId].amount
            );
        }
        // Update the current auction.
        auctions[tokenId].amount = amount;
        auctions[tokenId].bidder = payable(msg.sender);
        // Compare the auction's end time with the current time plus the 15 minute extension,
        // to see whKCSer we're near the auctions end and should extend the auction.
        if (auctionEnds(tokenId) < block.timestamp.add(TIME_BUFFER)) {
            // We add onto the duration whenever time increment is required, so
            // that the auctionEnds at the current time plus the buffer.
            auctions[tokenId].duration += block.timestamp.add(TIME_BUFFER).sub(
                auctionEnds(tokenId)
            );
        }
        // Emit the event that a bid has been made.
        emit AuctionBid(tokenId, nftContract, msg.sender, amount);
    }

    // ============ End Auction ============

    function endAuction(uint256 tokenId)
        external
        nonReentrant
        whenNotPaused
        auctionComplete(tokenId)
    {
        // Store relevant auction data in memory for the life of this function.
        address winner = auctions[tokenId].bidder;
        uint256 amount = auctions[tokenId].amount;
        address Creator = auctions[tokenId].Creator;
        uint8 CreatorFeePercent = auctions[tokenId].CreatorFeePercent;
        address payable fundsRecipient = auctions[tokenId].fundsRecipient;
        // Remove all auction data for this token from storage.
        delete auctions[tokenId];
        // We don't use safeTransferFrom, to prevent reverts at this point,
        // which would break the auction.
        BitCake(nftContract).transferFrom(address(this), winner, tokenId);
        // First handle the Creator's fee.
        if (CreatorFeePercent > 0) {
            // Determine the Creator amount, which is some percent of the total.
            uint256 CreatorAmount = amount.mul(CreatorFeePercent).div(100);
            // Send it to the Creator.
            transferKCSOrWKCS(Creator, CreatorAmount);
            // Subtract the Creator amount from the total funds available
            // to send to the funds recipient and original NFT creator.
            amount = amount.sub(CreatorAmount);
            // Emit the details of the transfer as an event.
            emit CreatorFeePercentTransfer(tokenId, Creator, CreatorAmount);
        }
        // Get the address of the original creator, so that we can split shares
        // if appropriate.
        address payable nftCreator =
            payable(
                address(IMediaModified(nftContract).tokenCreators(tokenId))
            );
        // If the creator and the recipient of the funds are the same
        // (and we expect this to be common), we can just do one transaction.
        if (nftCreator == fundsRecipient) {
            transferKCSOrWKCS(nftCreator, amount);
        } else {
            // Otherwise, we should determine the percent that goes to the creator.
            // Collect share data from Zora.
            uint256 creatorAmount =
                // Call the splitShare function on the market contract, which
                // takes in a Decimal and an amount.
                IMarket(IMediaModified(nftContract).marketContract())
                    .splitShare(
                    // Fetch the decimal from the BidShares data on the market.
                    IMarket(IMediaModified(nftContract).marketContract())
                        .bidSharesForToken(tokenId)
                        .creator,
                    // Specify the amount.
                    amount
                );
            // Send the creator's share to the creator.
            transferKCSOrWKCS(nftCreator, creatorAmount);
            // Send the remainder of the amount to the funds recipient.
            transferKCSOrWKCS(fundsRecipient, amount.sub(creatorAmount));
        }
        // Emit an event describing the end of the auction.
        emit AuctionEnded(
            tokenId,
            nftContract,
            Creator,
            winner,
            amount,
            nftCreator,
            fundsRecipient
        );
    }

    // ============ Cancel Auction ============

    function cancelAuction(uint256 tokenId)
        external
        nonReentrant
        auctionExists(tokenId)
        onlyCreator(tokenId)
    {
        // Check that there hasn't already been a bid for this NFT.
        require(
            uint256(auctions[tokenId].firstBidTime) == 0,
            "Auction already started"
        );
        // Pull the creator address before removing the auction.
        address Creator = auctions[tokenId].Creator;
        // Remove all data about the auction.
        delete auctions[tokenId];
        // Transfer the NFT back to the Creator.
        BitCake(nftContract).transferFrom(address(this), Creator, tokenId);
        // Emit an event describing that the auction has been canceled.
        emit AuctionCanceled(tokenId, nftContract, Creator);
    }

    // ============ Admin Functions ============

    // Irrevocably turns off admin recovery.
    function turnOffAdminRecovery() external onlyAdminRecovery {
        _adminRecoveryEnabled = false;
    }

    function pauseContract() external onlyAdminRecovery {
        _paused = true;
        emit Paused(msg.sender);
    }

    function unpauseContract() external onlyAdminRecovery {
        _paused = false;
        emit Unpaused(msg.sender);
    }

    // Allows the admin to transfer any NFT from this contract
    // to the recovery address.
    function recoverNFT(uint256 tokenId) external onlyAdminRecovery {
        BitCake(nftContract).transferFrom(
            // From the auction contract.
            address(this),
            // To the recovery account.
            adminRecoveryAddress,
            // For the specified token.
            tokenId
        );
    }

    // Allows the admin to transfer any KCS from this contract to the recovery address.
    function recoverKCS(uint256 amount)
        external
        onlyAdminRecovery
        returns (bool success)
    {
        // Attempt an KCS transfer to the recovery account, and return true if it succeeds.
        success = attemptKCSTransfer(adminRecoveryAddress, amount);
    }

    // ============ Miscellaneous Public and External ============

    // Returns true if the contract is paused.
    function paused() public view returns (bool) {
        return _paused;
    }

    // Returns true if admin recovery is enabled.
    function adminRecoveryEnabled() public view returns (bool) {
        return _adminRecoveryEnabled;
    }

    // Returns the version of the deployed contract.
    function getVersion() external pure returns (uint256 version) {
        version = RESERVE_AUCTION_VERSION;
    }

    // ============ Private Functions ============

        // Will attempt to transfer KCS, but will transfer WKCS instead if it fails.
    function transferKCSOrWKCS(address to, uint256 value) private {
        // Try to transfer KCS to the given recipient.
        if (!attemptKCSTransfer(to, value)) {
            // If the transfer fails, wrap and send as WKCS, so that
            // the auction is not impeded and the recipient still
            // can claim KCS via the WKCS contract (similar to escrow).
            IWKCS(WKCSAddress).deposit{value: value}();
            IWKCS(WKCSAddress).transfer(to, value);
            // At this point, the recipient can unwrap WKCS.
        }
    }

    // Sending KCS is not guaranteed complete, and the mKCSod used here will return false if
    // it fails. For example, a contract can block KCS transfer, or might use
    // an excessive amount of gas, thereby griefing a new bidder.
    // We should limit the gas used in transfers, and handle failure cases.
    function attemptKCSTransfer(address to, uint256 value)
        private
        returns (bool)
    {
        // Here increase the gas limit a reasonable amount above the default, and try
        // to send KCS to the recipient.
        // NOTE: This might allow the recipient to attempt a limited reentrancy attack.
        (bool success, ) = to.call{value: value, gas: 30000}("");
        return success;
    }

    // Returns true if the auction's Creator is set to the null address.
    function auctionCreatorIsNull(uint256 tokenId) private view returns (bool) {
        // The auction does not exist if the Creator is the null address,
        // since the NFT would not have been transferred in `createAuction`.
        return auctions[tokenId].Creator == address(0);
    }

    // Returns the timestamp at which an auction will finish.
    function auctionEnds(uint256 tokenId) private view returns (uint256) {
        // Derived by adding the auction's duration to the time of the first bid.
        // NOTE: duration can be extended conditionally after each new bid is added.
        return auctions[tokenId].firstBidTime.add(auctions[tokenId].duration);
    }
}