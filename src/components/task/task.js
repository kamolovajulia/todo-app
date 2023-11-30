import React, { useState } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from 'date-fns';

const Task = (props) => {
    const { text, date, completedStatus, editingStatus, onDelete, onComplete, onEdit, onChange } = props;
    const taskData = formatDistanceToNow(date, { includeSeconds: true }).slice(9);
    
    let classes = '';

    if (completedStatus) {
        classes = 'completed';
    }

    let result;
    const [label, setLabel] = useState(text);

    if (editingStatus) {
        classes = 'editing';
        result =
            <form onSubmit={onChange}>
                <input type="text" name="label" className="edit" value={label} onChange={(e) => setLabel(e.target.value)} />
            </form>
    }

    return (
        <li className={classes}>
            <div className="view">
                <input className="toggle" type="checkbox" onClick={onComplete} autocomplete="off" checked={completedStatus} />
                <label>
                    <span className="description">{text}</span>
                    <span className="created">created {taskData} ago</span>
                </label>
                <button className="icon icon-edit" onClick={onEdit}></button>
                <button className="icon icon-destroy" onClick={onDelete}></button>
            </div>
            {result}
        </li>
    );
};

Task.propTypes = {
    text: PropTypes.string,
    date: PropTypes.string,
    completedStatus: PropTypes.bool,
    editingStatus: PropTypes.bool,
    onDelete: PropTypes.func,
    onComplete: PropTypes.func,
    onEdit: PropTypes.func
}

export default Task;