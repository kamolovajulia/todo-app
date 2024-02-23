import React, { useEffect } from 'react';

import style from './timer.module.css';

const Timer = ({ min, sec, play, stop, timer, over, paused, id, setTime }) => {
  const tick = () => {
    if (over || paused) return;

    if (Number(min) === 0 && Number(sec) === 0) {
      setTime(id, { over: true, timer: false });
    } else if (Number(sec) === 0) {
      setTime(id, { min: Number(min) - 1, sec: 59 });
    } else {
      setTime(id, { sec: Number(sec) - 1 });
    }
  };

  useEffect(() => {
    if (timer) {
      const timeout = setInterval(tick, 1000);
      return () => clearInterval(timeout);
    }
  }, [tick]);

  return (
    <>
      <button className={`${style.icon} ${style.icon__play}`} onClick={play}></button>
      <button className={`${style.icon} ${style.icon__pause}`} onClick={stop}></button>
      {`${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`}
    </>
  );
};
export default Timer;
