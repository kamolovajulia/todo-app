import React, { useRef, useState } from 'react';

import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';

import style from './main.module.css';

const Main = () => {
  const maxId = useRef(100);

  const [state, setState] = useState([]);
  const [filter, setFilter] = useState({
    all: 'selected',
    active: '',
    completed: '',
  });

  const createNewTask = (text, min, sec) => {
    const obj = {
      text,
      completedStatus: false,
      editingStatus: false,
      date: new Date(),
      id: maxId.current,
      min,
      sec,
      paused: false,
      over: false,
      timer: null,
    };
    maxId.current += 1;
    return obj;
  };

  const setTime = (id, time) => {
    const idx = state.findIndex((el) => el.id === id);
    const oldTask = state[idx];
    const newTask = { ...oldTask, ...time };
    setState((a) => [...a.slice(0, idx), newTask, ...a.slice(idx + 1)]);
  };

  const play = (id) => {
    const idx = state.findIndex((el) => el.id === id);
    const oldTask = state[idx];
    const { paused, timer } = oldTask;
    if (!timer)
      setState([
        ...state.slice(0, idx),
        {
          ...oldTask,
          timer: true,
        },
        ...state.slice(idx + 1),
      ]);
    if (paused && timer)
      return setState([...state.slice(0, idx), { ...oldTask, paused: false }, ...state.slice(idx + 1)]);
  };

  const stop = (id) => {
    const idx = state.findIndex((el) => el.id === id);
    const oldTask = state[idx];
    const newTask = { ...oldTask, paused: true };
    setState([...state.slice(0, idx), newTask, ...state.slice(idx + 1)]);
  };

  const deleteItem = (id) => {
    const idx = state.findIndex((el) => el.id === id);
    const newArray = state.filter((el, index) => index !== idx);
    setState(newArray);
  };

  const addTask = (task, min, sec) => {
    let newTask;
    if (task.trim()) {
      newTask = createNewTask(task, min, sec);
      const newArray = [...state, newTask];
      setState(newArray);
    }
  };

  const completeTask = (id) => {
    const idx = state.findIndex((el) => el.id === id);
    const oldTask = state[idx];
    const newTask = { ...oldTask, completedStatus: !oldTask.completedStatus };
    setState([...state.slice(0, idx), newTask, ...state.slice(idx + 1)]);
  };

  const editTask = (id) => {
    const idx = state.findIndex((el) => el.id === id);
    const oldTask = state[idx];
    const newTask = { ...oldTask, editingStatus: !oldTask.editingStatus };
    setState([...state.slice(0, idx), newTask, ...state.slice(idx + 1)]);
  };

  const onChange = (e, id) => {
    e.preventDefault();
    if (e.target.elements.label.value.trim()) {
      const idx = state.findIndex((el) => el.id === id);
      const oldTask = state[idx];
      const newTask = { ...oldTask, text: e.target.elements.label.value, editingStatus: !oldTask.editingStatus };
      setState([...state.slice(0, idx), newTask, ...state.slice(idx + 1)]);
    }
    return false;
  };

  const countActiveTasks = () => {
    const activeTasks = state.filter((el) => !el.completedStatus);
    return activeTasks.length;
  };

  const showAllTasks = () => {
    setFilter({
      all: 'selected',
      active: '',
      completed: '',
    });
  };

  const showActive = () => {
    setFilter({
      all: '',
      active: 'selected',
      completed: '',
    });
  };

  const showCompleted = () => {
    setFilter({
      all: '',
      active: '',
      completed: 'selected',
    });
  };

  const clearCompleted = () => {
    const newArray = state.filter((el) => !el.completedStatus);
    document.getElementsByClassName('toggle').checked = false;
    setState(newArray);
  };

  return (
    <section className={style.main}>
      <NewTaskForm onAddTask={addTask} />
      <TaskList
        todo={state}
        filter={filter}
        onDelete={deleteItem}
        onComplete={completeTask}
        onEdit={editTask}
        onChange={onChange}
        playTimer={play}
        stopTimer={stop}
        setTime={setTime}
      />
      <Footer
        tasksCount={countActiveTasks}
        stateFilter={filter}
        onAllTasks={showAllTasks}
        onShowActive={showActive}
        onShowCompleted={showCompleted}
        clearCompleted={clearCompleted}
      />
    </section>
  );
};

export default Main;
