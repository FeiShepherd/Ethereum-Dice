const DiceContract = artifacts.require('DiceContract')

const methods = [
  'set(uint256,uint256)',
  'get()'
]

contract('DiceContract', async () => {
  it('should be named DiceContract', async () => {
    let instance = await DiceContract.deployed()

    assert.equal(instance.constructor._json.contractName, 'DiceContract')
  })
  it('should have correct methods', async () => {
    let instance = await DiceContract.deployed()
    methods.forEach( method => {
      assert.equal(typeof instance.contract.methods[method], 'function')
    })
    assert.equal(Object.keys(instance.contract.methods).length/3, methods.length)
  })
})
