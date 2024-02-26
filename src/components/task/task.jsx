import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import Timer from '../timer/timer';

import style from './task.module.css';

const Task = (props) => {
  const { id, text, date, min, sec, completedStatus, editingStatus, timer, over, paused } = props;

  const taskData = formatDistanceToNow(date, { includeSeconds: true }).replace('less than', '');

  let result;
  const [label, setLabel] = useState(text);

  const completeTask = () => props.completeTask(id);
  const playTimer = () => props.playTimer(id);
  const stopTimer = () => props.stopTimer(id);
  const editTask = () => props.editTask(id);
  const deleteTask = () => props.deleteTask(id);
  const setUpdatedTaskLabel = (e) => props.setUpdatedTaskLabel(e, id);

  if (editingStatus) {
    result = (
      <form onSubmit={setUpdatedTaskLabel}>
        <input
          type='text'
          name='label'
          className={style.edit}
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </form>
    );
  }

  return (
    <li className={`${style.item} ${completedStatus ? style.completed : ''} ${editingStatus ? style.editing : ''}`}>
      <div className={style.view}>
        <input
          className={style.toggle}
          type='checkbox'
          onClick={completeTask}
          autoComplete='off'
          defaultChecked={completedStatus}
        />
        <label>
          <span className={style.title}>{text}</span>
          <span className={`${style.description} ${style.timer}`}>
            <Timer
              id={id}
              min={min}
              sec={sec}
              play={playTimer}
              stop={stopTimer}
              timer={timer}
              over={over}
              paused={paused}
              setTime={props.setTime}
            />
          </span>
          <span className={`${style.created} ${style.description}`}>created {taskData} ago</span>
        </label>
        <button className={`${style.icon} ${style.icon__edit}`} onClick={editTask}></button>
        <button className={`${style.icon} ${style.icon__destroy}`} onClick={deleteTask}></button>
      </div>
      {result}
    </li>
  );
};

Task.propTypes = {
  text: PropTypes.string,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
  completedStatus: PropTypes.bool,
  editingStatus: PropTypes.bool,
  onDelete: PropTypes.func,
  onComplete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default Task;
