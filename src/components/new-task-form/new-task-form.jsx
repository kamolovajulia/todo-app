import React, { Component } from 'react';

import style from './new-task-form.module.css';

export default class NewTaskForm extends Component {
  state = {
    label: '',
  };

  submitState = (e) => {
    e.preventDefault();
    this.props.onAddTask(this.state.label);
    this.setState({
      label: '',
    });
  };

  updateLabel = (e) => {
    const text = e.target.value;
    this.setState({
      label: text,
    });
  };

  render() {
    return (
      <form onSubmit={this.submitState} className={style.form}>
        <input
          className={style.newTodo}
          placeholder='What needs to be done?'
          onChange={this.updateLabel}
          value={this.state.label}
        ></input>
      </form>
    );
  }
}
