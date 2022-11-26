import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import Layout from '../../components/Layout'
import { truncateEthAddress } from '../../utils'
 

const paymasterOptions = [
  {
    name: "App Name 1",
    address: "0x2198378B73dD7D7BC08d1B9837d374d895186207",
    function: "UpdateScore",
    balance: 5.23,
    isAvailable: true
  },
  {
    name: "App 2",
    address: "0x3198378B73dD7D7BC08d1B9837d374d895186207",
    function: "UpdateScore2",
    balance: 5.23,
    isAvailalbe: false
  }
]

export default function Session() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const router = useRouter()

  useEffect(()=>{
    if (!isConnected) {
      router.replace("/signin")
    }
  }, [isConnected])
 
  return (
    <Layout>
      <div className='flex flex-col items-center w-full mt-16'>
        <div className='text-2xl'>
          Sessions
        </div>
        <div className='max-w-md mt-2 text-sm text-center text-[#888]'>
          Which paymaster will pay for my gas fee?
        </div>
        <div className='w-full max-w-xl mt-8'>
          {
            paymasterOptions.map((m, idx)=>(
              <div className={`mt-4 bg-[#222] rounded-lg`} key={idx}>
                <div className='font-mono text-sm bg-[#333] px-4 p-3'>
                  {m.name}
                </div>
                <div className='p-4 bg-[#111]'>
                  <div className='text-[#666]'>
                    You have authorized the app to make the following actions on your behalf:
                  </div>
      
                  <div className='flex flex-col items-start justify-between mt-4'>
                    <div className='flex flex-row items-center'>
                      <span className='text-[#777] mr-2'>Contract: </span>
                      <span>{ truncateEthAddress(m.address) }</span>
                    </div>
                    <div className='flex flex-row items-center'>
                      <span className='text-[#777] mr-2'>Function: </span>
                      <span>{ m.function }</span>
                    </div>
                  </div>
                </div>
              </div>  
            ))
          }
        </div>
      </div>
    </Layout>
  )
}