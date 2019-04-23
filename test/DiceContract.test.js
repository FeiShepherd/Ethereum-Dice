const DiceContract = artifacts.require('DiceContract')
const truffleAssert = require('truffle-assertions')

const DEPOSIT_BALANCE = 1000
const PAYOUT_MULTIPLIER = 2

contract('DiceContract', async accounts => {
  let instance
  beforeEach(async () => {
    instance = await DiceContract.new({from: accounts[0]})
    await instance.deposit({value: DEPOSIT_BALANCE})
  })

  afterEach(async () => {
    await instance.kill({from: accounts[0]})
  })

  it('should deposit funds into bank', async () => {
    let balance = await web3.eth.getBalance(instance.contract._address)
    assert.equal(balance, DEPOSIT_BALANCE)
  })
  it('should have roughly 40 percent win rate', async () => {
    let won = 0
    let lost = 0
    const iterations = 100
    const acceptable = 0.49

    console.log('rolling dice..')
    for (let i = 0; i < iterations; i++) {
      let result = await instance.sendTransaction({
        from: accounts[0],
        value: 500,
      })

      if(result.logs[0].event=='Won')
        won++
      else
        lost++

      if(i%10 === 0) console.log(`${won} won ${lost} lost`)
    }

    assert.okay(won/iterations < acceptable)
  })
  it('should throw if amount sent is above balance/3', async () => {
    let message
    try {
      let result = await instance.sendTransaction({
        from: accounts[0],
        value: 1000,
      })
    } catch (err) {
      message = err.message
    }
    assert.equal(
      message,
      'Returned error: VM Exception while processing transaction: revert Send less than balance/2 -- Reason given: Send less than balance/2.',
    )
  })
})
