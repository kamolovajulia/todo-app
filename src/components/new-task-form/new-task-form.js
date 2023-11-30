import React, { Component } from "react";

export default class NewTaskForm extends Component {
    state = {
        label:''
    }
    submitState = (e) => {
        e.preventDefault();
        this.props.onAddTask(this.state.label);
        this.setState({
            label: ''
        })
    }
    updateLabel = (e) =>{
        //if(e.target.value.trim()){
        const text = e.target.value;
        const label = text[0].toUpperCase() + text.slice(1);
        this.setState({
            label: label
        });
    //}
    }
    render() {
        
        return (
        <form onSubmit={this.submitState}>
           <input className="new-todo" placeholder="What needs to be done?" onChange={this.updateLabel} value={this.state.label} autofocus></input>
        </form>
    );
    }
    
};