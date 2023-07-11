"use client"

import React, { useState } from 'react'
import { observer } from 'mobx-react'
import taskStore from '@/Store'
import { useRouter } from 'next/navigation'

const AddTodo = observer(() => {
    const { task, add, remove } = taskStore;

    const router = useRouter();

    const [todoInfo, setTodoInfo] = useState({
        title: '',
        description: '',
        status: ''
    });

    const handleAdd = () => {
        if (todoInfo.title.length === 0 || todoInfo.description.length === 0) {
            alert('Please fill the required fields')
        } else {
            add(todoInfo.title, todoInfo.description);
            setTodoInfo({
                title: '',
                description: '',
                status: ''
            })
            router.push('/')
        }

    }


    return (
        <div className='h-[90vh] w-[100vw] grid place-content-center'>
            <div className='w-[90vw] md:w-[70vw] bg-slate-800 rounded-lg'>
                <div className='text-center text-white text-2xl font-bold py-5'>Add New Task</div>
                <div className='flex flex-col px-2 py-4 md:px-56 md:pb-5'>
                    <label className='text-white text-xl'
                        htmlFor="title">
                        Add Title
                    </label>
                    <input type="text"
                        name='title'
                        placeholder='Add Title'
                        value={todoInfo.title}
                        onChange={(e) => setTodoInfo({ ...todoInfo, title: e.target.value })}
                        className='text-white bg-slate-600  p-3 rounded-md' />
                </div>
                <div className='flex flex-col px-2 py-4 md:px-56 md:pb-12'>
                    <label className='text-white text-xl'
                        htmlFor="description">
                        Add Description
                    </label>
                    <textarea className='text-white bg-slate-600  p-3 rounded-md h-32'
                        name='description'
                        placeholder='Add Description'
                        value={todoInfo.description}
                        onChange={(e) => setTodoInfo({ ...todoInfo, description: e.target.value })}
                    />
                </div>
                <div className='text-center pb-10'>
                    <button className='mr-3 py-3 px-4 rounded-md font-semibold bg-white text-slate-800 hover:bg-slate-800 hover:text-white border-2 border-white'
                        onClick={handleAdd}>Add TODO</button>
                    <button className='ml-3 py-3 px-4 rounded-md font-semibold bg-white text-slate-800 hover:bg-slate-800 hover:text-white border-2 border-white'
                        onClick={() => router.push('/')}>Back</button>
                </div>
            </div>
        </div>
    )
})

export default AddTodo