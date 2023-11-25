import React, {Component} from "react";

//import NewTaskForm from '../new-task-form/new-task-form';

export default class Task extends Component {

    
    constructor() {
        super();
        this.state = {
            completedStatus: false, 
            editingStatus: false
        }
        this.completeTask = () => {
            this.setState(({completedStatus}) => {
                return {
                    completedStatus: !completedStatus
                }
            })
        }
        this.editTask = () => {
            this.setState(({editingStatus}) => {
                return {
                    editingStatus: !editingStatus
                }
            })
            //const item = document.querySelector('.editing');
            //item.insertAdjacentElement('beforeend', <NewTaskForm />);
            //добавить перед </li> <NewTaskForm />
        }

    }
    render() {
       const {text, onDelete} = this.props;
       const {editingStatus, completedStatus} = this.state;

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
                    <input className="toggle" type="checkbox" onClick={this.completeTask} />
                    <label>
                        <span className="description">{text}</span>
                        <span className="created">created 17 seconds ago</span>
                        {/* Время создания задачи должно быть классом Date */}
                    </label>
                    <button className="icon icon-edit" onClick={this.editTask}></button>
                    <button className="icon icon-destroy" onClick={onDelete}></button>
                </div>
            </li>
        );
    }
};

//export default Task;