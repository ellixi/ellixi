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
          Select Available Games
        </div>
        <div className='w-full max-w-lg mt-8 '>
          <Link href="/game/dino">
            <div className='relative mt-8 cursor-pointer'>
              <div className='relative w-full h-40 overflow-hidden text-black bg-red-800 rounded-lg'>
                <Image src={'/static/assets/dinogame.jpeg'} fill alt='game1' className='object-cover' />
              </div>
              <div className='absolute bottom-0 left-0 p-3 bg-black rounded-b-none text-md text-mono opacity-80 rounded-r-xl'>
                Dino Game
              </div>
            </div>
          </Link>

          <Link href="/game/dino">
            <div className='relative mt-8 cursor-pointer'>
              <div className='relative w-full h-40 overflow-hidden text-black bg-red-800 rounded-lg'>
                <Image src={'/static/assets/dinogame.jpeg'} fill alt='game1' className='object-cover' />
              </div>
              <div className='absolute bottom-0 left-0 p-3 bg-black rounded-b-none text-md text-mono opacity-80 rounded-r-xl'>
                Game 2
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