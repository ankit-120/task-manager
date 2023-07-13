"use client"

import React, { useState } from 'react'
import { observer } from 'mobx-react'
import taskStore from '@/Store'
import { useRouter } from 'next/navigation'

// Page to update todo 

const UpdateTodo = observer(({ searchParams }: any) => {
    const { update } = taskStore;

    const { id, title, description, status } = searchParams;

    const router = useRouter();

    const [todoInfo, setTodoInfo] = useState({
        id: id,
        title: title,
        description: description,
        status: status
    });

    const handleUpdate = () => {
        if (todoInfo.title.length === 0 || todoInfo.description.length === 0) {
            alert('Please fill the required fields')
        } else {
            update(todoInfo);
            router.push('/')
        }
    }


    return (
        <div className='h-[90vh] w-[100vw] grid place-content-center'>
            <div className='w-[90vw] md:w-[70vw] bg-slate-800 rounded-lg'>
                <div className='text-center text-white text-2xl font-bold py-5'>Update Task</div>

                {/* Update todo form */}
                <div className='flex flex-col px-2 py-4 md:px-56 md:pb-5'>
                    <label className='text-white text-xl'
                        htmlFor="title">
                        Update Title
                    </label>
                    <input type="text"
                        placeholder='Add Title'
                        value={todoInfo.title}
                        onChange={(e) => setTodoInfo({ ...todoInfo, title: e.target.value })}
                        className='text-white bg-slate-600  p-3 rounded-md' />
                </div>

                <div className='flex flex-col px-2 py-4 md:px-56 md:pb-6'>
                    <label className='text-white text-xl'
                        htmlFor="description">
                        Update Description
                    </label>
                    <textarea className='text-white bg-slate-600  p-3 rounded-md h-32'
                        placeholder='Add Description'
                        value={todoInfo.description}
                        onChange={(e) => setTodoInfo({ ...todoInfo, description: e.target.value })}
                    />
                </div>

                <div className='flex flex-col px-2 py-4 md:px-56 md:pb-12'>
                    <label className='text-white text-xl'
                        htmlFor="description">
                        Update Status
                    </label>
                    <select className='text-white bg-slate-600  p-3 rounded-md'
                        value={todoInfo.status}
                        onChange={(e) => setTodoInfo({ ...todoInfo, status: e.target.value })}>
                        <option value="pending">Pending</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div className='text-center pb-10'>
                    <button className='mr-3 py-3 px-4 rounded-md font-semibold bg-white text-slate-800 hover:bg-slate-800 hover:text-white border-2 border-white'
                        onClick={handleUpdate}>Update TODO</button>
                    <button className='ml-3 py-3 px-4 rounded-md font-semibold bg-white text-slate-800 hover:bg-slate-800 hover:text-white border-2 border-white'
                        onClick={() => router.push('/')}>Back</button>
                </div>

            </div>
        </div>
    )
})

export default UpdateTodo