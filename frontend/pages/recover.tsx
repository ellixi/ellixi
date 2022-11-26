import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Meta from '../components/Meta';
import Link from 'next/link';
 
export default function Recover() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const router = useRouter()

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
              Forgot your account?
            </div>
            <div className='flex flex-col w-full max-w-md gap-4 mt-12'>
              <div className='flex flex-col'>
                <label className='mb-1 ml-2 text-sm'>Account Address</label>
                <input className='bg-[#333] p-3 text-sm' placeholder='0x2198378B73dD7D7BC08d1B9837d374d895186207' />
              </div>
              <hr className='w-full my-6 border border-[#333]' />
              <div className='flex flex-col'>
                <label className='mb-1 ml-2 text-sm'>New Password</label>
                <input className='bg-[#333] p-3 text-sm' type='password' placeholder='*****' />
              </div>
              <div className='flex flex-col'>
                <label className='mb-1 ml-2 text-sm'>Confirm Password</label>
                <input className='bg-[#333] p-3 text-sm' type='password' placeholder='*****' />
              </div>
              <Link href="/recovering">
                <button 
                  className='flex justify-center w-full p-2 mt-2 text-center bg-blue-900 rounded-md'>
                    Recover wallet
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}