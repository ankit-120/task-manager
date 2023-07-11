"use client"

import React from 'react'
import { useRouter } from 'next/navigation'


const Header = () => {

    const router = useRouter();

    return (
        <div className='h-[10vh] bg-slate-800 text-white text-center text-3xl fw-bolder cursor-pointer flex flex-col justify-center'
            onClick={() => router.push('/')}>
            TODO MANAGER
        </div>
    )
}

export default Header