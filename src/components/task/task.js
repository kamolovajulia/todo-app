import React from "react";

const Task = (props) => {
    const { text, completedStatus, editingStatus, onDelete, onComplete, onEdit } = props;
    let classes = '';
    if (completedStatus) {
        classes = 'completed';
    }
    if (editingStatus) {
        classes = 'editing';
    }
    return (
        <li className={classes}>
            <div className="view">
                <input className="toggle" type="checkbox" onClick={onComplete} />
                <label>
                    <span className="description">{text}</span>
                    <span className="created">created 17 seconds ago</span>
                    {/* Время создания задачи должно быть классом Date */}
                </label>
                <button className="icon icon-edit" onClick={onEdit}></button>
                <button className="icon icon-destroy" onClick={onDelete}></button>
            </div>
        </li>
    );
};

export default Task;