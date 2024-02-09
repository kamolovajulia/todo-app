import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import Timer from '../timer/timer';

import style from './task.module.css';

const Task = (props) => {
  const { text, date, min, sec, completedStatus, editingStatus,
    onDelete, onComplete, onEdit, onChange, playTimer, stopTimer } = props;
  const taskData = formatDistanceToNow(date, { includeSeconds: true }).replace('less than', '');
  let result;
  const [label, setLabel] = useState(text);

  if (editingStatus) {
    result = (
      <form onSubmit={onChange}>
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
          onClick={onComplete}
          autoComplete='off'
          checked={completedStatus}
        />
        <label>
          <span className={style.title}>{text}</span>
          <span className={`${style.description} ${style.timer}`}>
            <Timer min={min} sec={sec} play={playTimer} stop={stopTimer} />
          </span>
          <span className={`${style.created} ${style.description}`}>created {taskData} ago</span>
        </label>
        <button className={`${style.icon} ${style.icon__edit}`} onClick={onEdit}></button>
        <button className={`${style.icon} ${style.icon__destroy}`} onClick={onDelete}></button>
      </div>
      {result}
    </li>
  );
};

Task.propTypes = {
  text: PropTypes.string,
  date: PropTypes.string,
  completedStatus: PropTypes.bool,
  editingStatus: PropTypes.bool,
  onDelete: PropTypes.func,
  onComplete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default Task;