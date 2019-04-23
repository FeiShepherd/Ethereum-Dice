pragma solidity ^0.5.0;

contract DiceContract  {
  constructor() public { owner = msg.sender; }
  address payable owner;

  event Paid(address indexed _from, uint _value);

  modifier onlyOwner {
    require(
      msg.sender == owner,
      "Only owner can call this function."
    );
    _;
  }

  function deposit() public payable onlyOwner {
  }

  function() external payable {
    emit Paid(msg.sender, msg.value);
  }
}
