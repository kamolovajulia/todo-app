import React from "react";
import TaskFilter from "../tasks-filter/task-filter";

const Footer = () => {
  return (
    <footer className="footer">
      <span className="todo-count">1 items left</span>
      <ul className="filters">
        <li>
          <TaskFilter name='All' className='selected' />
        </li>
        <li>
          <TaskFilter name='Active' />
        </li>
        <li>
          <TaskFilter name='Completed' />
        </li>
      </ul>
      <TaskFilter name='Clear completed' className='clear-completed' />
    </footer>
  );
};

export default Footer;

