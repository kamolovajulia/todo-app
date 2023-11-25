import React, {Component} from "react";
import Task from "../task/task";


const TaskList = ({ todo, onDelete }) => {

    const elements = todo.map((el)=>{
        const {id, ...itemProps}=el;
        return (
            <Task {...itemProps} onDelete={()=>onDelete(id)}/> 
        )
    });
        return (
            <ul className="todo-list">
               {elements} 
            </ul>
        );
    
};

export default TaskList;