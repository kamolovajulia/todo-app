import { useState, useEffect } from 'react';

import style from './timer.module.css';

function Timer({ min = 0, sec = 0 }) {
    const [paused, setPaused] = useState(false);
    const [over, setOver] = useState(false);
    const [[m, s], setTime] = useState([min, sec]);

    const tick = () => {

        if (!paused || over) return;
        if (Number(m) === 0 && Number(s) === 0) {
            setOver(true);

        } else if (Number(s) === 0) {
            setTime([m - 1, 59]);
        } else {
            setTime([m, s - 1]);
        }
    };

    useEffect(() => {
        const timerID = setInterval(() => {
            if (m > 0 || s > 0) tick();
        }, 1000);
        return () => clearInterval(timerID);
    });

    return (
        <>
            <button className={`${style.icon} ${style.icon__play}`} onClick={() => setPaused(true)}></button>
            <button className={`${style.icon} ${style.icon__pause}`} onClick={() => setPaused(false)}></button>
            {`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`}
        </>
    )

}

export default Timer;