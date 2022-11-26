import '@nomiclabs/hardhat-ethers'
import '@nomicfoundation/hardhat-toolbox'

import { HardhatUserConfig } from 'hardhat/config'

// add code - parksy 
const mnemonic = 'already swim focus text flat name swim champion friend twin brand finger'
// 

function getNetwork1 (url: string): { url: string, accounts: { mnemonic: string }, allowUnlimitedContractSize : boolean } {
  return {
    url,
    accounts: { mnemonic },
    allowUnlimitedContractSize: true
  }
}

function getNetwork (name: string): { url: string, accounts: { mnemonic: string }, allowUnlimitedContractSize : boolean  } {
  //return getNetwork1(`https://${name}.infura.io/v3/${process.env.INFURA_ID}`)
  // return getNetwork1(`wss://${name}.infura.io/ws/v3/${process.env.INFURA_ID}`)

  // add code - parksy 
  if (name === "goerli")
    return getNetwork1('https://eth-goerli.g.alchemy.com/v2/uvpp9kzRnKGf2nI5-rkwvcUgJK7y9Y6M')
  else
    return getNetwork1(`https://${name}.infura.io/v3/${process.env.INFURA_ID}`)
  //
}

const optimizedComilerSettings = {
  version: '0.8.17',
  settings: {
    optimizer: { enabled: true, runs: 1000000 },
    viaIR: true
  }
}

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.15',
    settings: {
      optimizer: { enabled: true }
    }
  }, 

  networks: {
    dev: { url: 'http://localhost:8545' },
    // github action starts localgeth service, for gas calculations
    localgeth: { url: 'http://localgeth:8545' },
    goerli: getNetwork('goerli'),
    proxy: getNetwork1('http://localhost:8545'),
    kovan: getNetwork('kovan')
  },
  mocha: {
    timeout: 10000
  },

  etherscan: {
    //apiKey: process.env.ETHERSCAN_API_KEY
    apiKey: 'uvpp9kzRnKGf2nI5-rkwvcUgJK7y9Y6M'

  },

}

export default config
