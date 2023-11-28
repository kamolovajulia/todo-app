import React from "react";
import Task from "../task/task";


const TaskList = ({ todo, onDelete, onEdit, onComplete }) => {

    const elements = todo.map((el)=>{
        const {id, ...itemProps}=el;
        return (
            <Task {...itemProps} onDelete={()=>onDelete(id)} onComplete={()=>onComplete(id)} onEdit={()=>onEdit(id)}/> 
        )
    });
        return (
            <ul className="todo-list">
               {elements} 
            </ul>
        );
    
};

export default TaskList;