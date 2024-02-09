import React from 'react';

import style from './timer.module.css';

const Timer = ({ min, sec, play, stop }) => (
    <>
        <button className={`${style.icon} ${style.icon__play}`} onClick={play}></button>
        <button className={`${style.icon} ${style.icon__pause}`} onClick={stop}></button>
        {`${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`}
    </>
);

export default Timer;