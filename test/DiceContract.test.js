const DiceContract = artifacts.require('DiceContract')

const spec = {
  name: 'DiceContract',
  methods: [
    {
      type: 'fallback',
    },
    {
      name: 'set',
      inputs: [{name: 'x', type: 'uint256'}, {name: 'y', type: 'uint256'}],
    },
    {
      name: 'get',
      inputs: [],
    },
  ],
}

contract('DiceContract', async () => {
  it('should be named DiceContract', async () => {
    let instance = await DiceContract.deployed()

    assert.equal(instance.constructor._json.contractName, 'DiceContract')
  })
  it('should have correct methods', async () => {
    let instance = await DiceContract.deployed()

    instance.contract._jsonInterface.forEach((method, index) => {
      Object.keys(spec.methods[index]).forEach(val => {
        assert.equal(
          JSON.stringify(spec.methods[index][val]),
          JSON.stringify(method[val]),
        )
      })
    })
  })
})
