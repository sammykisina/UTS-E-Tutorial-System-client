import React, { FC, useEffect, useRef, useState } from 'react';
import { RiMacFill } from 'react-icons/ri';

type CountDownProps = {
  time: number;
  save: () => void;
};

const CountDown: FC<CountDownProps> = ({ time, save }) => {
  /**
   * component states
   */
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  /**
   * component functions
   */
  useEffect(() => {
    var timer = setInterval(() => {
      setSeconds(seconds + 1);

      if (seconds === 59) {
        setMinutes(minutes + 1);
        setSeconds(0);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className='rounded-full bg-green-400/10 w-fit px-3 py-1 text-xs flex items-center justify-center leading-loose'>
      {minutes < 10 ? '0' + minutes : minutes} :{' '}
      {seconds < 10 ? '0' + seconds : seconds}
    </div>
  );
};

export default CountDown;
