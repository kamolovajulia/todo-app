import React from 'react';
import style from './header.module.css';

const Header = () => (
  <header className='header'>
    <h1 className={style.header__h1}>todos</h1>
  </header>
);

export default Header;
