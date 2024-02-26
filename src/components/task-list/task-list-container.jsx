import React from 'react';
import { connect } from 'react-redux';
import TaskList from './task-list';

const mapStateToProps = (state) => ({
  tasks: state.tasks,
  filters: state.filters,
});

export default connect(mapStateToProps)(TaskList);
