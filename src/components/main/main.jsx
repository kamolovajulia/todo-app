import React, { Component } from 'react';

import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';

import style from './main.module.css';

export default class Main extends Component {
  maxId = 100;

  state = {
    todoData: [],
    filters: {
      all: 'selected',
      active: '',
      completed: '',
    },
  };

  createNewTask(text) {
    return {
      text,
      completedStatus: false,
      editingStatus: false,
      date: new Date(),
      id: (this.maxId += 1),
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = todoData.filter((el, index) => index !== idx);
      return {
        todoData: newArray,
      };
    });
  };

  addTask = (task) => {
    if (task.trim()) {
      const newTask = this.createNewTask(task);
      this.setState(({ todoData }) => {
        const newArray = [...todoData, newTask];
        return {
          todoData: newArray,
        };
      });
    }
  };

  completeTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldTask = todoData[idx];
      const newTask = { ...oldTask, completedStatus: !oldTask.completedStatus };
      return {
        todoData: [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)],
      };
    });
  };

  editTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldTask = todoData[idx];
      const newTask = { ...oldTask, editingStatus: !oldTask.editingStatus };
      return {
        todoData: [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)],
      };
    });
  };

  onChange = (e, id) => {
    e.preventDefault();
    if (e.target.elements.label.value.trim()) {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const oldTask = todoData[idx];
        const newTask = { ...oldTask, text: e.target.elements.label.value, editingStatus: !oldTask.editingStatus };
        return {
          todoData: [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)],
        };
      });
    }
    return false;
  };

  countActiveTasks() {
    const activeTasks = this.state.todoData.filter((el) => !el.completedStatus);
    return activeTasks.length;
  }

  showAllTasks = () => {
    this.setState({
      filters: {
        all: 'selected',
        active: '',
        completed: '',
      }
    });
  };

  showActive = () => {
    this.setState({
      filters: {
        all: '',
        active: 'selected',
        completed: '',
      }
    });
  };

  showCompleted = () => {
    this.setState({
      filters: {
        all: '',
        active: '',
        completed: 'selected',
      }
    });
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((el) => !el.completedStatus);
      document.getElementsByClassName('toggle').checked = false;
      return {
        todoData: newArray,
        allTodoData: newArray,
      };
    });
  };

  render() {
    return (
      <section className={style.main}>
        <NewTaskForm onAddTask={this.addTask} />
        <TaskList
          todo={this.state.todoData}
          filter={this.state.filters}
          onDelete={this.deleteItem}
          onComplete={this.completeTask}
          onEdit={this.editTask}
          onChange={this.onChange}
        />
        <Footer
          tasksCount={this.countActiveTasks()}
          stateFilter={this.state.filters}
          onAllTasks={this.showAllTasks}
          onShowActive={this.showActive}
          onShowCompleted={this.showCompleted}
          clearCompleted={this.clearCompleted}
        />
      </section>
    );
  }
}
