import React, { Component } from "react";

import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';

export default class Main extends Component {
    
    maxId = 100;

    state = {
        todoData: [
            this.createNewTask('Take a shower'),
            this.createNewTask('Drink coffee'),
            this.createNewTask('Watching YouTube')
        ],
        filters: {
            all: 'selected',
            active: '',
            completed: ''
        }
    }

    createNewTask(text) {
        return {
            text,
            completedStatus: false,
            editingStatus: false,
            date: new Date(),
            id: this.maxId++
        }
    }

    DeleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);
            //const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
            // const before = todoData.slice(0, idx);
            // const after = todoData.slice(idx + 1);
            // const newArray = [...before, ...after];
            const newArray = todoData.filter((el, index) => index !== idx);
            console.log(newArray)
            return {
                todoData: newArray
            }
        })
    }

    AddTask = (task) => {
        const newTask = this.createNewTask(task);
        this.setState(({ todoData }) => {
            const newArray = [...todoData, newTask];
            return {
                todoData: newArray
            }
        })
    }

    CompleteTask = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const oldTask = todoData[idx];
            const newTask = { ...oldTask, completedStatus: !oldTask.completedStatus };
            return {
                todoData: [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)]
            }
        })
    }

    EditTask = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const oldTask = todoData[idx];
            const newTask = { ...oldTask, editingStatus: !oldTask.editingStatus };
            return {
                todoData: [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)]
            }
        })
    }

    onChange = (e, id) => {
        e.preventDefault();
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const oldTask = todoData[idx];
            const newTask = { ...oldTask, text: e.target.elements.label.value, editingStatus: !oldTask.editingStatus };
            return {
                todoData: [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)]
            }
        })
        return false;
    }

    countActiveTasks() {
        const completedTasks = this.state.todoData.filter((el) => el.completedStatus);
        const activeTasks = this.state.todoData.length - completedTasks.length;
        return activeTasks;
    }

    ShowAllTasks = () => {
        if (this.state.allTodoData) {
            this.setState(({ allTodoData }) => {
                return {
                    todoData: [...allTodoData],
                    allTodoData: '',
                    filters: {
                        all: 'selected',
                        active: '',
                        completed: ''
                    }
                }
            })
        }
    }

    ShowActive = () => {
        if (!this.state.allTodoData) {
            this.setState(({ todoData }) => {
                return {
                    allTodoData: [...todoData]
                }
            })
        }
        this.setState(({ allTodoData }) => {
            const activeTasks = allTodoData.filter((el) => !el.completedStatus);
            return {
                todoData: activeTasks,
                filters: {
                    all: '',
                    active: 'selected',
                    completed: ''
                }
            }
        })
        const elements = [...document.getElementsByClassName('toggle')];
        elements.forEach((el) => el.checked = false)
    }

    ShowCompleted = () => {
        if (!this.state.allTodoData) {
            this.setState(({ todoData }) => {
                return {
                    allTodoData: [...todoData]
                }
            })
        }
        this.setState(({ allTodoData }) => {
            const completedTasks = allTodoData.filter((el) => el.completedStatus);
            return {
                todoData: completedTasks,
                filters: {
                    all: '',
                    active: '',
                    completed: 'selected'
                }
            }
        })
        const elements = [...document.getElementsByClassName('toggle')];
        elements.forEach((el) => el.checked = true)
    }

    clearCompleted = () => {
        this.setState(({ todoData }) => {
            const newArray = todoData.filter((el) => !el.completedStatus);
            document.getElementsByClassName('toggle').checked = false;
            return {
                todoData: newArray,
                allTodoData: newArray
            }
        })
    }

    render() {
        return (
            <section className="main">
                <NewTaskForm onAddTask={this.AddTask} />
                <TaskList todo={this.state.todoData} onDelete={this.DeleteItem} onComplete={this.CompleteTask} onEdit={this.EditTask} onChange={this.onChange} />
                <Footer tasksCount={this.countActiveTasks()} stateFilter={this.state.filters} onAllTasks={this.ShowAllTasks} onShowActive={this.ShowActive} onShowCompleted={this.ShowCompleted} clearCompleted={this.clearCompleted} />
            </section>
        );
    }
};
