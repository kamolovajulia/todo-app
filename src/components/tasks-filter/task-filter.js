import React from "react";

const TaskFilter = (props) => {
    return (
        <button className={props.className} onClick={props.onClick}>{props.name}</button>
    );
};

export default TaskFilter;