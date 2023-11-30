import React from "react";
import PropTypes from "prop-types";

const TaskFilter = ({className, onClick, label}) => {
    const s = '';
    return (
        <button className={className} onClick={onClick} >{label}</button>
    );
};

TaskFilter.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    label: PropTypes.string
}

export default TaskFilter;