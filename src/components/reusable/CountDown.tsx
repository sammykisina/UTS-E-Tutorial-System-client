import React, { FC, useEffect, useRef, useState } from 'react';
import { RiMacFill } from 'react-icons/ri';

type CountDownProps = {
  seconds: number;
  save: () => void;
};

const CountDown: FC<CountDownProps> = ({ seconds, save }) => {
  /**
   * component states
   */
  const [countDown, setCountDown] = useState(seconds);
  const timerId = useRef('');

  /**
   * component functions
   */
  const formatTime = (time: number) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);

    if (minutes <= 10) minutes = '0' + minutes;
    if (seconds <= 10) seconds = '0' + seconds;

    return minutes + ':' + seconds;
  };

  useEffect(() => {
    timerId.current = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    if (countDown <= 0) {
      clearInterval(timerId.current);
      // save();
    }
  }, [countDown]);

  return <div>{formatTime(countDown)}</div>;
};

export default CountDown;
