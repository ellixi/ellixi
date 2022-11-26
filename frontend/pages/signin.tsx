import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import Meta from '../components/Meta';
import Link from 'next/link';
 
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
        <div className='flex w-full mx-auto max-w-7xl'>
        <div className='flex flex-col items-center w-full mt-40'>
        <div className='text-2xl'>
          Let&apos;s Plug In!
        </div>
        <div className='flex flex-col w-full max-w-sm gap-4 mt-12 text-lg'>
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

          <Link href="/recover">
            <div className="p-2 px-4 mx-auto text-sm text-center hover:text-white text-[#888] cursor-pointer rounded-xl">
              I lost my account
            </div>
          </Link>
        </div>
      </div>
        </div>
      </div>
    </div>
  )
}