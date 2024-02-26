import React from 'react';
import PropTypes from 'prop-types';

import TaskContainer from '../task/task-container';

import style from './task-list.module.css';

const TaskList = ({ tasks, filters }) => {
  let elements = tasks;
  if (filters.completed) {
    elements = tasks.filter((el) => el.completedStatus);
  }
  if (filters.active) {
    elements = tasks.filter((el) => !el.completedStatus);
  }
  if (filters.all) {
    elements = [...tasks];
  }
  if (tasks.length > 0) {
    elements = elements.map((el) => {
      const { id, ...itemProps } = el;
      return <TaskContainer {...itemProps} key={id} id={id} />;
    });
  }

  return <ul className={style.tasksList}>{elements}</ul>;
};

TaskList.propTypes = {
  tasks: PropTypes.array,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onComplete: PropTypes.func,
};

export default TaskList;
