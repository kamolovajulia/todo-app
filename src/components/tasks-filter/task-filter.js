import React from "react";

const TaskFilter = (props) => {
    return (
        <button className={props.className}>{props.name}</button>
    );
};

export default TaskFilter;