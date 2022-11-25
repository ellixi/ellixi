import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import Layout from '../../components/Layout'
 
export default function Dino() {
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
      <>
      <div className='flex flex-col items-center w-full mt-40'>
        <div className='text-2xl'>
          Dino
        </div>
        {/* <div className='flex flex-col w-full max-w-sm gap-4 mt-12 text-lg'>
        Connected to {address}
      <button onClick={() => disconnect()}>Disconnect</button>


        </div> */}
      </div>
      </>
    </Layout>
  )
}