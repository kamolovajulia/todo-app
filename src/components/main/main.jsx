import React from 'react';

import NewTaskFormContainer from '../new-task-form/new-task-form-container';
import TaskListContainer from '../task-list/task-list-container';
import FooterContainer from '../footer/footer-container';

import style from './main.module.css';

const Main = () => (
  <section className={style.main}>
    <NewTaskFormContainer />
    <TaskListContainer />
    <FooterContainer />
  </section>
);

export default Main;
