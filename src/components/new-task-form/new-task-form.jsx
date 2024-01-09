import React, { Component } from 'react';

import style from './new-task-form.module.css';

export default class NewTaskForm extends Component {

  state = {
    label: '',
    min: '',
    sec: ''
  };

  submitState = () => {
    this.props.onAddTask(this.state.label, this.state.min, this.state.sec);
    this.setState({
      label: '',
      min: '',
      sec: ''
    });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <form onSubmit={this.submitState} className={style.newTodoForm}>
        <input
          name='label'
          id='label'
          className={style.newTodo}
          placeholder='What needs to be done?'
          onChange={this.handleInputChange}
          value={this.state.label}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              this.submitState()
            }
          }
          }
        ></input>
        <input name='min' id='min' className={style.newTodoForm__timer} placeholder="Min"
          value={this.state.min}
          onChange={this.handleInputChange} >
        </input>
        <input name='sec' id='sec' className={style.newTodoForm__timer} placeholder="Sec"
          value={this.state.sec}
          onChange={this.handleInputChange} >
        </input>
      </form>
    );
  }
}
