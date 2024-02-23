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

  createNewTask(text, min, sec) {
    return {
      text,
      completedStatus: false,
      editingStatus: false,
      date: new Date(),
      id: (this.maxId += 1),
      min,
      sec,
      paused: false,
      over: false,
      timerID: null
    };
  }

  play = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldTask = todoData[idx];
      const { paused, timerID } = oldTask;
      if (!timerID)
        return {
          todoData: [...todoData.slice(0, idx),
          { ...oldTask, timerID: setInterval(() => this.tick(id), 1000) }
            , ...todoData.slice(idx + 1)]
        }
      if (paused && timerID)
        return {
          todoData: [...todoData.slice(0, idx),
          { ...oldTask, paused: false }
            , ...todoData.slice(idx + 1)]
        }
    })
  }

  tick = (id) => {
    const idx = this.state.todoData.findIndex((el) => el.id === id);
    const oldTask = this.state.todoData[idx];
    const { min, sec, over, paused } = oldTask;
    if (over || paused) return;

    if (Number(min) === 0 && Number(sec) === 0) this.setState(() => ({
      todoData: [...this.state.todoData.slice(0, idx),
      { ...oldTask, over: true, timerID: clearInterval(this.timerID) }
        , ...this.state.todoData.slice(idx + 1)]
    }))
    else if (Number(sec) === 0) this.setState(() => ({
      todoData: [...this.state.todoData.slice(0, idx),
      { ...oldTask, min: Number(min) - 1, sec: 59 }
        , ...this.state.todoData.slice(idx + 1)]
    }))
    else this.setState(() => ({
      todoData: [...this.state.todoData.slice(0, idx),
      { ...oldTask, sec: Number(sec) - 1 }
        , ...this.state.todoData.slice(idx + 1)]
    }))
  }

  stop = (id) => {
    const idx = this.state.todoData.findIndex((el) => el.id === id);
    const oldTask = this.state.todoData[idx];
    const newTask = { ...oldTask, paused: true };
    this.setState({
      todoData: [...this.state.todoData.slice(0, idx), newTask, ...this.state.todoData.slice(idx + 1)]
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = todoData.filter((el, index) => index !== idx);
      return {
        todoData: newArray,
      };
    });
  };

  addTask = (task, min, sec) => {
    if (task.trim()) {
      const newTask = this.createNewTask(task, min, sec);
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
        todoData: newArray
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
          playTimer={this.play}
          stopTimer={this.stop}
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
