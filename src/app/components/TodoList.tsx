"use client"

import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import taskStore from '@/Store'
import Link from 'next/link'
import { BiSolidEditAlt } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'

const TodoList = observer(() => {
    const { task, remove, changeStatus, deleteAll, loadFromLocalStorage } = taskStore;

    //filters task according to status
    const [taskStatus, setTaskStatus] = useState("all");

    // to load data from local storage
    useEffect(() => {
        loadFromLocalStorage();
    }, []);


    //filter fn to filter task
    const filterTask = () => {
        if (taskStatus !== 'all') {
            return task.filter((task) => task.status === taskStatus)
        }
        return task;
    }

    //deletes all task from local storage
    const handleAllDelete = () => {
        deleteAll();
    }

    return (
        <>
            {/* //when no task is present */}
            {
                task.length === 0 ? (
                    <div className='flex justify-center h-[90vh] items-center'>
                        <div className='flex flex-col'>
                            <div className='text-3xl text-center'>No task!!</div>
                            <div className='text-center mt-10'>
                                <Link className='py-3 px-4 rounded-md bg-slate-800 text-white border-2 hover:bg-white hover:border-slate-800 hover:text-slate-800'
                                    href={'/addTodo'}>Click to Add New Task</Link>
                            </div>
                        </div>
                    </div>
                )
                    :
                    // when task is added
                    (
                        <div className='w-[100vw] flex justify-center'>
                            <div className='w-[100vw] md:w-[70vw]'>
                                <div className='flex w-full justify-around'>

                                    {/* //All filter */}
                                    <div className='cursor-pointer w-[25%] text-center text-xl font-bold border-b-2 border-white hover:border-slate-800 my-2'
                                        onClick={() => setTaskStatus('all')}
                                        style={{
                                            borderBottom: taskStatus === 'all' ? '2px solid black' : '0px'
                                        }}>
                                        All
                                    </div>

                                    {/* //pending filter */}
                                    <div className='cursor-pointer w-[25%] text-center text-xl font-bold border-b-2 border-white hover:border-slate-800 my-2'
                                        onClick={() => setTaskStatus('pending')}
                                        style={{
                                            borderBottom: taskStatus === 'pending' ? '2px solid black' : '0px'
                                        }}>
                                        Pending
                                    </div>

                                    {/* //Active filter */}
                                    <div className='cursor-pointer w-[25%] text-center text-xl font-bold border-b-2 border-white hover:border-slate-800 my-2'
                                        onClick={() => setTaskStatus('active')}
                                        style={{
                                            borderBottom: taskStatus === 'active' ? '2px solid black' : '0px'
                                        }}>
                                        Active
                                    </div>

                                    {/* Finished filter */}
                                    <div className='cursor-pointer w-[25%] text-center text-xl font-bold border-b-2 border-white hover:border-slate-800 my-2'
                                        onClick={() => setTaskStatus('completed')}
                                        style={{
                                            borderBottom: taskStatus === 'completed' ? '2px solid black' : '0px'
                                        }}>
                                        Finished
                                    </div>

                                </div>

                                {/* table for todo */}
                                <table className='w-full'>
                                    <thead
                                        className='bg-slate-800 text-white text-xl h-[100px]'>
                                        <tr>
                                            <th className='w-[40%] md:w-[20%]'>Task</th>
                                            <th align='left' className='hidden md:table-cell w-[40%]'>Description</th>
                                            <th className='w-[30%] md:w-[20%]'>Status</th>
                                            <th className='w-[30%] md:w-[20%]'>Action</th>
                                        </tr>
                                    </thead>
                                    {/* table body */}
                                    <tbody>
                                        {
                                            filterTask().map((task) => (
                                                <tr
                                                    className='border-b-2 border-slate-300 h-[100px]'
                                                    key={task.id}>
                                                    {/* 1st column */}
                                                    <td
                                                        className='md:text-xl'
                                                        align='center'>
                                                        <Link href={{
                                                            pathname: '/viewTodo',
                                                            query: task
                                                        }}>
                                                            {task.title}
                                                        </Link>
                                                    </td>
                                                    {/* 2nd column */}
                                                    <td
                                                        className='hidden md:table-cell cursor-pointer md:text-xl'>
                                                        <Link href={{
                                                            pathname: '/viewTodo',
                                                            query: task
                                                        }}>
                                                            {task.description}
                                                        </Link>
                                                    </td>
                                                    {/* 3rd column */}
                                                    <td
                                                        className='md:text-xl'
                                                        align='center'>
                                                        <select value={task.status}
                                                            onChange={(e) => changeStatus(e.target.value, task.id)}>
                                                            <option value="pending">Pending</option>
                                                            <option value="active">Active</option>
                                                            <option value="completed">Completed</option>
                                                        </select>
                                                    </td>
                                                    {/* 4th column */}
                                                    <td
                                                        align='center'
                                                        className='flex flex-col justify-center items-center h-[100px] md:flex-row md:items-center'>
                                                        <button className='md:pr-2 text-3xl'
                                                            onClick={() => remove(task.id)}>
                                                            <AiFillDelete />
                                                        </button>
                                                        <Link
                                                            className='md:pl-2 text-3xl'
                                                            href={{
                                                                pathname: '/updateTodo',
                                                                query: task
                                                            }}>
                                                            <BiSolidEditAlt />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>

                                {/* New Task button */}
                                <div className='text-center mt-10'>
                                    <Link
                                        className='py-3 px-4 rounded-md bg-slate-800 text-white border-2 hover:bg-white hover:border-slate-800 hover:text-slate-800'
                                        href={'/addTodo'}>Add New Task</Link>
                                </div>

                                {/* Delete all task  */}
                                <div className='text-center mt-10'>
                                    <button
                                        className='py-3 px-4 rounded-md bg-slate-800 text-white border-2 hover:bg-white hover:border-slate-800 hover:text-slate-800'
                                        onClick={handleAllDelete}>
                                        Delete All Task
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
            }

        </>
    );
})

export default TodoList