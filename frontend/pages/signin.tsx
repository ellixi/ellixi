import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import Meta from '../components/Meta';
 
export default function SignIn() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const router = useRouter()
  const { disconnect } = useDisconnect()

  useEffect(()=>{
    if (isConnected) {
      router.replace("/")
    }
  }, [isConnected])
 
  return (
    <div>
      <Meta />
      <div className="w-full min-h-screen bg-[#111] text-white">
        <div className='flex w-full max-w-7xl mx-auto'>
        <div className='flex mt-40 w-full items-center flex-col'>
        <div className='text-2xl'>
          Let&apos;s Plug In!
        </div>
        <div className='mt-12 max-w-sm w-full gap-4 flex flex-col text-lg'>
          <button 
            className='bg-[#222] p-4 flex w-full rounded-md' 
            onClick={() => connect()}>
              Connect Wallet
          </button>
          <button 
            className='bg-[#222] p-4 flex w-full rounded-md' 
            onClick={() => connect()}>
              Biometric
          </button>
        </div>
      </div>
        </div>
      </div>
    </div>
  )
}