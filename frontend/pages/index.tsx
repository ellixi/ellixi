import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import Layout from '../components/Layout'
 
export default function Home() {
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
      <div className='flex flex-col items-center w-full mt-24'>
        <div className='text-2xl'>
          Available Games
        </div>
        <div className='w-full max-w-lg mt-4 '>
          <Link href="/game/dino">
            <div className='relative mt-8 overflow-hidden cursor-pointer group'>
              <div className='relative w-full h-40 overflow-hidden text-black border border-black rounded-lg group-hover:border-yellow-600'>
                <Image src={'/static/assets/dinogame.jpeg'} fill alt='game1' className='object-cover' />
              </div>
              <div className='absolute bottom-0 left-0 p-3 bg-black rounded-bl-lg group-hover:bg-yellow-600 text-md text-mono opacity-80 rounded-tr-xl'>
                Dino Game
              </div>
            </div>
          </Link>

          <Link href="/game/dino">
            <div className='relative mt-8 overflow-hidden cursor-pointer group'>
              <div className='relative w-full h-40 overflow-hidden text-black border border-black rounded-lg group-hover:border-yellow-600'>
                <Image src={'/static/assets/dinogame.jpeg'} fill alt='game1' className='object-cover' />
              </div>
              <div className='absolute bottom-0 left-0 p-3 bg-black rounded-bl-lg group-hover:bg-yellow-600 text-md text-mono opacity-80 rounded-tr-xl'>
                Dino Game2
              </div>
            </div>
          </Link>
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