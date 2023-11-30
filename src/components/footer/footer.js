import React from "react";
import PropTypes from "prop-types";

import TaskFilter from "../tasks-filter/task-filter";

const Footer = (props) => {
  const {tasksCount, stateFilter, onAllTasks, onShowActive, onShowCompleted, clearCompleted} = props;
  return (
    <footer className="footer">
      <span className="todo-count">{tasksCount} items left</span>
      <ul className="filters">
        <li>
          <TaskFilter label='All' className={stateFilter.all} onClick={()=>onAllTasks()}/>
        </li>
        <li>
          <TaskFilter label='Active' className={stateFilter.active} onClick={()=>onShowActive()}/>
        </li>
        <li>
          <TaskFilter label='Completed' className={stateFilter.completed} onClick={()=>onShowCompleted()}/>
        </li>
      </ul>
      <TaskFilter label='Clear completed' className='clear-completed' onClick={()=>clearCompleted()}/>
    </footer>
  );
};

Footer.propTypes = {
  tasksCount: PropTypes.number, 
  stateFilter: PropTypes.object, 
  onAllTasks: PropTypes.func, 
  onShowActive: PropTypes.func,
  onShowCompleted: PropTypes.func,
  clearCompleted: PropTypes.func
}

export default Footer;