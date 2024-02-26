import React from 'react';
import { connect } from 'react-redux';
import Task from './task';

import {
  deleteTaskAC,
  updateTaskAC,
  setUpdatedTask,
  completeTaskAC,
  setTimerAC,
  playTimerAC,
  stopTimerAC,
} from '../../redux/actions';

const mapDispatchToProps = (dispatch) => ({
  setTime: (id, time) => dispatch(setTimerAC(id, time)),
  playTimer: (id) => dispatch(playTimerAC(id)),
  stopTimer: (id) => dispatch(stopTimerAC(id)),
  deleteTask: (id) => dispatch(deleteTaskAC(id)),
  completeTask: (id) => dispatch(completeTaskAC(id)),
  editTask: (id) => dispatch(updateTaskAC(id)),
  setUpdatedTaskLabel: (e, id) => {
    e.preventDefault();
    dispatch(setUpdatedTask(id, e.target.elements.label.value));
  },
});

export default connect(null, mapDispatchToProps)(Task);
