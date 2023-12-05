import React from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../tasks-filter/task-filter';

import style from './footer.module.css';

const Footer = (props) => {
  const { tasksCount, stateFilter, onAllTasks, onShowActive, onShowCompleted, clearCompleted } = props;
  return (
    <footer className={style.footer}>
      <span className={style.todoCount}>{tasksCount} items left</span>
      <ul className={style.filters}>
        <TaskFilter label='All' status={stateFilter.all} onClick={() => onAllTasks()} />
        <TaskFilter label='Active' status={stateFilter.active} onClick={() => onShowActive()} />
        <TaskFilter label='Completed' status={stateFilter.completed} onClick={() => onShowCompleted()} />
      </ul>
      <button label='Clear completed' className={style.clearCompleted} onClick={() => clearCompleted()}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  tasksCount: PropTypes.number,
  stateFilter: PropTypes.object,
  onAllTasks: PropTypes.func,
  onShowActive: PropTypes.func,
  onShowCompleted: PropTypes.func,
  clearCompleted: PropTypes.func,
};

export default Footer;
