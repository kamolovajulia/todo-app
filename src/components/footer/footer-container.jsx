import React from 'react';
import { connect } from 'react-redux';

import Footer from './footer';

import { showAllTasksAC, showActiveTasksAC, showCompletedTasksAC, clearCompletedTasksAC } from '../../redux/actions';

const mapStateToProps = (state) => ({
  filters: state.filters,
  countActiveTasks: state.tasks.length === 0 ? 0 : state.tasks.filter((el) => !el.completedStatus).length,
});

const mapDispatchToProps = (dispatch) => ({
  showAllTasks: () => dispatch(showAllTasksAC()),
  showActive: () => dispatch(showActiveTasksAC()),
  showCompleted: () => dispatch(showCompletedTasksAC()),
  clearCompleted: () => dispatch(clearCompletedTasksAC()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
