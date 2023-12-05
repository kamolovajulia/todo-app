import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task';

import style from './task-list.module.css';

const TaskList = ({ todo, onDelete, onEdit, onComplete, onChange }) => {
  const elements = todo.map((el) => {
    const { id, ...itemProps } = el;
    return (
      <Task
        {...itemProps}
        key={id}
        onDelete={() => onDelete(id)}
        onComplete={() => onComplete(id)}
        onEdit={() => onEdit(id)}
        onChange={(e) => onChange(e, id)}
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
