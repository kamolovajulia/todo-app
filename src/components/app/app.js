// Core
import React from 'react';

// utils

// components
import Header from '../header/header';
import Main from '../main/main';

// styles
import style from './app.module.css';

const App = () => (
  <section className={style.todoApp}>
    <Header />
    <Main />
  </section>
);
export default App;
