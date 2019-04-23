const DiceContract = artifacts.require('DiceContract')

const DEPOSIT_BALANCE = 1000

contract('DiceContract', async accounts => {
  let instance
  beforeEach(async () => {
    instance = await DiceContract.deployed()
    await instance.deposit({value: DEPOSIT_BALANCE})
  })
  it('should deposit funds into bank', async () => {
    let balance = await web3.eth.getBalance(instance.contract._address)
    assert.equal(balance, DEPOSIT_BALANCE)
  })
  it('should refund x2 on win', () => {})
  it('should not refund on lose', () => {})
  it('should throw if amount sent is above balance/3', async () => {
    let send = await web3.eth.sendTransaction({
      from: accounts[0],
      to: instance.contract._address,
      value: 1000,
    })
  })
})
