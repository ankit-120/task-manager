"use client"

import React from 'react'
import { observer } from 'mobx-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const ViewTodo = observer(({ searchParams }: any) => {

    const { title, description, status } = searchParams;

    const router = useRouter();

    return (
        <div className='h-[90vh] w-[100vw] grid place-content-center'>
            <div className='w-[90vw] md:w-[70vw] bg-slate-800 rounded-lg'>
                <div className='text-center text-white text-2xl font-bold py-5'>Todo</div>
                <div className='flex flex-col px-2 py-4 md:px-56 md:pb-5'>
                    <label className='text-white text-xl'>
                        Title
                    </label>
                    <input type="text" readOnly
                        value={title}
                        className='text-white bg-slate-600  p-3 rounded-md' />
                </div>
                <div className='flex flex-col px-2 py-4 md:px-56 md:pb-6'>
                    <label className='text-white text-xl'>
                        Description
                    </label>
                    <textarea readOnly
                        value={description}
                        className='text-white bg-slate-600  p-3 rounded-md h-32' />
                </div>
                <div className='flex flex-col px-2 py-4 md:px-56 md:pb-12'>
                    <label className='text-white text-xl'>
                        Status
                    </label>
                    <input type="text" readOnly
                        value={status}
                        className='text-white bg-slate-600  p-3 rounded-md' />
                </div>
                <div className='text-center pb-10'>
                    <Link className='ml-3 py-3 px-4 rounded-md font-semibold bg-white text-slate-800 hover:bg-slate-800 hover:text-white border-2 border-white'
                        href={{
                            pathname: '/updateTodo',
                            query: searchParams
                        }}>
                        Edit Todo
                    </Link>
                    <button className='ml-3 py-3 px-4 rounded-md font-semibold bg-white text-slate-800 hover:bg-slate-800 hover:text-white border-2 border-white'
                        onClick={() => router.push('/')}>Back</button>
                </div>
            </div>
        </div>
    )
})

export default ViewTodo