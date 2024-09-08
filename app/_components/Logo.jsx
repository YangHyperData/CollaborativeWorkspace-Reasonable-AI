"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

function Logo() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/dashboard');
  };

  return (
    <div className='flex items-center gap-4 cursor-pointer' onClick={handleClick}>
      <Image src={'/logo.png'} alt='logo' width={60} height={60}/>
      <h2 className='font-bold text-4xl'>Loop</h2>
    </div>
  )
}

export default Logo;
