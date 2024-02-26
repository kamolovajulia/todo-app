import React from 'react';
import { connect } from 'react-redux';

import { addTaskAC } from '../../redux/actions';

import NewTaskForm from './new-task-form';

const mapDispatchToProps = (dispatch) => ({
  addTask: (task, min, sec) => dispatch(addTaskAC(task, min, sec)),
});

export default connect(null, mapDispatchToProps)(NewTaskForm);
