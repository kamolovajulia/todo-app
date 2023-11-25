import React, { Component } from "react";

//import { formatDistanceToNow } from 'date-fns';

import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';

export default class Main extends Component {
    state = {
        todoData: [
            { text: 'Take a shower', id: 1 },
            { text: 'Drink coffee', id: 2 },
            { text: 'Watching YouTube', id: 3 }
        ]
    }

    DeleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
            //const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
            // const before = todoData.slice(0, idx);
            // const after = todoData.slice(idx + 1);
            // const newArray = [...before, ...after];
            const newArray = todoData.filter((el, index) => index !== idx);
            console.log(newArray)
            return {
                todoData: newArray
            }  
        })
    }
    //date: formatDistanceToNow(new Date()),
    render() {
        return (
            <section className="main">
                <TaskList todo={this.state.todoData} onDelete={this.DeleteItem} />
                <Footer />
            </section>
        );
    }
};
