import React from "react";
import TaskFilter from "../tasks-filter/task-filter";

const Footer = (props) => {
  return (
    <footer className="footer">
      <span className="todo-count">{props.tasksCount} items left</span>
      <ul className="filters">
        <li>
          <TaskFilter name='All' className='selected' onClick={()=>props.onAllTasks()}/>
        </li>
        <li>
          <TaskFilter name='Active' onClick={()=>props.onShowActive()}/>
        </li>
        <li>
          <TaskFilter name='Completed' onClick={()=>props.onShowCompleted()}/>
        </li>
      </ul>
      <TaskFilter name='Clear completed' className='clear-completed' onClick={()=>props.clearCompleted()}/>
    </footer>
  );
};

export default Footer;

