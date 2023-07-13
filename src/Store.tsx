"use client"

import { observable, action, makeObservable } from "mobx";

type todo = {
    id: string,
    title: string,
    description: string,
    status: string
}

// store for mobx 
class TaskStore {

    // making observable and actions
    constructor() {
        makeObservable(this, {
            task: observable,
            loadFromLocalStorage: action,
            add: action,
            remove: action,
            changeStatus: action,
            update: action,
            deleteAll: action
        })
    }

    // observable
    task: todo[] = [];

    // fn to load data from local storage 
    loadFromLocalStorage = () => {
        this.task = JSON.parse(localStorage.getItem('task') || '[]');
    }

    // fn to add todo 
    add = (title: string, description: string) => {
        const newTodo = {
            id: Math.random().toString(36).substring(2, 7),
            title,
            description,
            status: 'pending'
        }
        this.task.unshift(newTodo);
        localStorage.setItem('task', JSON.stringify(this.task));
    }

    // fn to change status of todo 
    changeStatus = (status: string, id: string) => {
        for (let i = 0; i < this.task.length; i++) {
            if (this.task[i].id === id) {
                this.task[i].status = status;
                localStorage.setItem('task', JSON.stringify(this.task));
                return;
            }
        }
    }

    // fn to delete todo 
    remove = (id: string) => {
        console.log(id)
        this.task = this.task.filter((t) => t.id !== id)
        localStorage.setItem('task', JSON.stringify(this.task));
    }

    // fn to update todo 
    update = (task: todo) => {
        for (let i = 0; i < this.task.length; i++) {
            if (this.task[i].id === task.id) {
                this.task[i].title = task.title;
                this.task[i].description = task.description;
                this.task[i].status = task.status
                localStorage.setItem('task', JSON.stringify(this.task));
                return;
            }
        }
    }

    // fn to remove todo from local storage 
    deleteAll = () => {
        localStorage.removeItem('task');
        this.task = [];
    }

}

const taskStore = new TaskStore();
export default taskStore;