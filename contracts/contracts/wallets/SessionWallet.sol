// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

/* solhint-disable avoid-low-level-calls */
/* solhint-disable no-inline-assembly */
/* solhint-disable reason-string */

import "../core/BaseWallet.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/**
 * minimal wallet.
 *  this is sample minimal wallet.
 *  has execute, eth handling methods
 *  has a single signer that can send requests through the entryPoint.
 */
contract SessionWallet is BaseWallet {
    using ECDSA for bytes32;

    //explicit sizes of nonce, to fit a single storage cell with "owner"
    uint96 private _nonce;
    address public owner;

    struct TokenApproval {
        bool enable;
        uint256 amount;
    }

    struct TransferParams {
        bytes4 methodSignature;
        address to;
        uint256 amount;
    }

    // PermissionParam struct to be used as parameter in createSession method
    struct PermissionParam {
        address whitelistDestination;
        bytes4[] whitelistMethods;
        uint256 tokenAmount;
    }

    // SessionParam struct to be used as parameter in createSession method
    struct SessionParam {
        uint256 startTimestamp;
        uint256 endTimestamp;
        bool enable;
    }

    struct SessionResponse {
        uint256 startTimestamp;
        uint256 endTimestamp;
        bool enable;
        uint256 nonce;
    }

    struct PermissionStorage {
        address[] whitelistDestinations;
        mapping(address => bool) whitelistDestinationMap;
        mapping(address => bytes4[]) whitelistMethods;
        mapping(address => mapping(bytes4 => bool)) whitelistMethodsMap;
        mapping(address => TokenApproval) tokenApprovals;
    }

    struct Session {
        address smartAccount;
        address sessionKey;
        uint256 startTimestamp;
        uint256 nonce;
        uint256 endTimestamp;
        bool enable;
        PermissionStorage permission;
    }

    bytes32 public constant DOMAIN_SEPARATOR_TYPEHASH =
        keccak256("EIP712Domain(uint256 chainId,address verifyingContract)");
    bytes32 public constant ALLOWANCE_TRANSFER_TYPEHASH =
        keccak256(
            "SessionTransaction(address to,uint256 amount,bytes data,uint256 nonce)"
        );

    mapping(address => Session) internal sessionMap;

    // [START] SESSION KEY RELATED FUNCTIONS

    function createSession(
        address sessionKey,
        PermissionParam[] calldata permissions,
        SessionParam calldata sessionParam
    ) external {
        require(
            !sessionMap[sessionKey].enable,
            "Session for key is already enabled"
        );
        Session storage _session = sessionMap[sessionKey];
        _session.enable = true;
        _session.nonce = 0;
        _session.startTimestamp = sessionParam.startTimestamp;
        _session.endTimestamp = sessionParam.endTimestamp;
        _session.sessionKey = sessionKey;
        _session.smartAccount = msg.sender;

        address[] memory whitelistAddresses = new address[](permissions.length);
        for (uint256 index = 0; index < permissions.length; index++) {
            PermissionParam memory permission = permissions[index];
            address whitelistedDestination = permission.whitelistDestination;
            whitelistAddresses[index] = whitelistedDestination;
            _session.permission.whitelistDestinationMap[
                whitelistedDestination
            ] = true;

            _session.permission.whitelistMethods[
                whitelistedDestination
            ] = permission.whitelistMethods;

            for (
                uint256 methodIndex = 0;
                methodIndex < permission.whitelistMethods.length;
                methodIndex++
            ) {
                _session.permission.whitelistMethodsMap[whitelistedDestination][
                        permission.whitelistMethods[methodIndex]
                    ] = true;
            }

            if (permission.tokenAmount > 0) {
                _session.permission.tokenApprovals[
                    whitelistedDestination
                ] = TokenApproval({
                    enable: true,
                    amount: permission.tokenAmount
                });
            }
        }
        _session.permission.whitelistDestinations = whitelistAddresses;
    }

    function getSessionInfo(address sessionKey)
        public
        view
        returns (SessionResponse memory sessionInfo)
    {
        Session storage session = sessionMap[sessionKey];
        sessionInfo = SessionResponse({
            startTimestamp: session.startTimestamp,
            endTimestamp: session.endTimestamp,
            enable: session.enable,
            nonce: session.nonce
        });
    }

    function getWhitelistDestinations(address sessionKey)
        public
        view
        returns (address[] memory)
    {
        Session storage session = sessionMap[sessionKey];
        return session.permission.whitelistDestinations;
    }

    function getWhitelistMethods(
        address sessionKey,
        address whitelistDestination
    ) public view returns (bytes4[] memory) {
        Session storage session = sessionMap[sessionKey];
        return session.permission.whitelistMethods[whitelistDestination];
    }

    function getTokenPermissions(address sessionKey, address token)
        public
        view
        returns (TokenApproval memory tokenApproval)
    {
        Session storage session = sessionMap[sessionKey];
        return session.permission.tokenApprovals[token];
    }

    function getSelector(bytes calldata _data) public pure returns (bytes4) {
        bytes4 selector = bytes4(_data[0:4]);
        return selector;
    }

    // [END] SESSION KEY RELATED FUNCTIONS

    function nonce() public view virtual override returns (uint256) {
        return _nonce;
    }

    function entryPoint() public view virtual override returns (IEntryPoint) {
        return _entryPoint;
    }

    IEntryPoint private _entryPoint;

    event EntryPointChanged(
        address indexed oldEntryPoint,
        address indexed newEntryPoint
    );

    // solhint-disable-next-line no-empty-blocks
    receive() external payable {}

    constructor(IEntryPoint anEntryPoint, address anOwner) {
        _entryPoint = anEntryPoint;
        owner = anOwner;
    }

    modifier onlyOwner() {
        _onlyOwner();
        _;
    }

    function _onlyOwner() internal view {
        //directly from EOA owner, or through the entryPoint (which gets redirected through execFromEntryPoint)
        require(
            msg.sender == owner || msg.sender == address(this),
            "only owner"
        );
    }

    /**
     * transfer eth value to a destination address
     */
    function transfer(address payable dest, uint256 amount) external onlyOwner {
        dest.transfer(amount);
    }

    /**
     * execute a transaction (called directly from owner, not by entryPoint)
     */
    function exec(
        address dest,
        uint256 value,
        bytes calldata func
    ) external onlyOwner {
        _call(dest, value, func);
    }

    /**
     * execute a sequence of transaction
     */
    function execBatch(address[] calldata dest, bytes[] calldata func)
        external
        onlyOwner
    {
        require(dest.length == func.length, "wrong array lengths");
        for (uint256 i = 0; i < dest.length; i++) {
            _call(dest[i], 0, func[i]);
        }
    }

    /**
     * change entry-point:
     * a wallet must have a method for replacing the entryPoint, in case the the entryPoint is
     * upgraded to a newer version.
     */
    function _updateEntryPoint(address newEntryPoint) internal override {
        emit EntryPointChanged(address(_entryPoint), newEntryPoint);
        _entryPoint = IEntryPoint(payable(newEntryPoint));
    }

    function _requireFromAdmin() internal view override {
        _onlyOwner();
    }

    /**
     * validate the userOp is correct.
     * revert if it doesn't.
     * - must only be called from the entryPoint.
     * - make sure the signature is of our supported signer.
     * - validate current nonce matches request nonce, and increment it.
     * - pay prefund, in case current deposit is not enough
     */
    function _requireFromEntryPoint() internal view override {
        require(
            msg.sender == address(entryPoint()),
            "wallet: not from EntryPoint"
        );
    }

    // called by entryPoint, only after validateUserOp succeeded.
    function execFromEntryPoint(
        address dest,
        uint256 value,
        bytes calldata func
    ) external {
        _requireFromEntryPoint();
        _call(dest, value, func);
    }

    /// implement template method of BaseWallet
    function _validateAndUpdateNonce(UserOperation calldata userOp)
        internal
        override
    {
        require(_nonce++ == userOp.nonce, "wallet: invalid nonce");
    }

    /// implement template method of BaseWallet
    function _validateSignature(
        UserOperation calldata userOp,
        bytes32 userOpHash,
        address
    ) internal virtual override returns (uint256 deadline) {
        bytes32 hash = userOpHash.toEthSignedMessageHash();
        //ignore signature mismatch of from==ZERO_ADDRESS (for eth_callUserOp validation purposes)
        // solhint-disable-next-line avoid-tx-origin
        require(
            owner == hash.recover(userOp.signature) || tx.origin == address(0),
            "wallet: wrong signature"
        );
        return 0;
    }

    function _call(
        address target,
        uint256 value,
        bytes memory data
    ) internal {
        (bool success, bytes memory result) = target.call{value: value}(data);
        if (!success) {
            assembly {
                revert(add(result, 32), mload(result))
            }
        }
    }

    /**
     * check current wallet deposit in the entryPoint
     */
    function getDeposit() public view returns (uint256) {
        return entryPoint().balanceOf(address(this));
    }

    /**
     * deposit more funds for this wallet in the entryPoint
     */
    function addDeposit() public payable {
        (bool req, ) = address(entryPoint()).call{value: msg.value}("");
        require(req);
    }

    /**
     * withdraw value from the wallet's deposit
     * @param withdrawAddress target to send to
     * @param amount to withdraw
     */
    function withdrawDepositTo(address payable withdrawAddress, uint256 amount)
        public
        onlyOwner
    {
        entryPoint().withdrawTo(withdrawAddress, amount);
    }
}
