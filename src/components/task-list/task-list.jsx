import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task';

import style from './task-list.module.css';

const TaskList = ({ todo, filter, onDelete, onEdit, onComplete, onChange, playTimer, stopTimer, setTime }) => {
  let elements;

  if (filter.completed) {
    elements = todo.filter((el) => el.completedStatus);
  }
  if (filter.active) {
    elements = todo.filter((el) => !el.completedStatus);
  }
  if (filter.all) {
    elements = [...todo];
  }

  elements = elements.map((el) => {
    const { id, ...itemProps } = el;
    return (
      <Task
        {...itemProps}
        key={id}
        id={id}
        onDelete={() => onDelete(id)}
        onComplete={() => onComplete(id)}
        onEdit={() => onEdit(id)}
        onChange={(e) => onChange(e, id)}
        playTimer={() => playTimer(id)}
        stopTimer={() => stopTimer(id)}
        setTime={setTime}
      />
    );
  });

  return <ul className={style.todoList}>{elements}</ul>;
};

TaskList.propTypes = {
  todo: PropTypes.array,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onComplete: PropTypes.func,
};

export default TaskList;
