import React, { useState } from 'react';

import style from './new-task-form.module.css';

const NewTaskForm = ({ onAddTask }) => {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const submitState = (e) => {
    e.preventDefault();
    // if (Number(min) && Number(sec)) {
    onAddTask(label, min, sec);
    setLabel('');
    setMin('');
    setSec('');
    // }
  };

  return (
    <form onSubmit={submitState} className={style.newTodoForm}>
      <input
        name='label'
        id='label'
        className={style.newTodo}
        placeholder='What needs to be done?'
        onChange={(e) => setLabel(e.target.value)}
        value={label}
      ></input>
      <input
        name='min'
        id='min'
        className={style.newTodoForm__timer}
        placeholder='Min'
        value={min}
        onChange={(e) => setMin(e.target.value)}
      ></input>
      <input
        name='sec'
        id='sec'
        className={style.newTodoForm__timer}
        placeholder='Sec'
        value={sec}
        onChange={(e) => setSec(e.target.value)}
      ></input>
      <button type='submit' className={style.disable}></button>
    </form>
  );
};

export default NewTaskForm;
