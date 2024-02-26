import React from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../tasks-filter/task-filter';

import style from './footer.module.css';

const Footer = (props) => (
  <footer className={style.footer}>
    <span className={style.todoCount}>{props.countActiveTasks} items left</span>
    <ul className={style.filters}>
      <TaskFilter label='All' status={props.filters.all} onClick={() => props.showAllTasks()} />
      <TaskFilter label='Active' status={props.filters.active} onClick={() => props.showActive()} />
      <TaskFilter label='Completed' status={props.filters.completed} onClick={() => props.showCompleted()} />
    </ul>
    <button label='Clear completed' className={style.clearCompleted} onClick={() => props.clearCompleted()}>
      Clear completed
    </button>
  </footer>
);

Footer.propTypes = {
  tasksCount: PropTypes.number,
  stateFilter: PropTypes.object,
  onAllTasks: PropTypes.func,
  onShowActive: PropTypes.func,
  onShowCompleted: PropTypes.func,
  clearCompleted: PropTypes.func,
};

export default Footer;
