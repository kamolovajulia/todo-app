import React from 'react';
import PropTypes from 'prop-types';

import style from './task-filter.module.css';

const TaskFilter = ({ status, onClick, label }) => (
  <li>
    <button className={`${style.button} ${status ? style.selected : null}`} onClick={onClick}>
      {label}
    </button>
  </li>
);

TaskFilter.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.string,
};

export default TaskFilter;
