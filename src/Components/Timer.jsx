import React, { useState, useRef, useEffect } from 'react';
import Buttons from './Buttons';
import Labels from './Labels';

const Timer = (props) => {

  const [time, setTime] = useState({time: {h:0, m:0, s:0}, seconds: 0, laps: []});
  // const [seconds, setSeconds] = useState(0);
  // const [laps, setLaps] = useState([]);
  const timer = 0;


  const secsToTime = (secs) => {
    let hours = Math.floor(secs / (60 * 60));
    let divideMinutes = secs % (60 * 60);
    let minutes = Math.floor(divideMinutes / 60);
    let divideSeconds = divideMinutes % 60;
    let seconds = Math.ceil(divideSeconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds
    };

    return obj;

  };


  const incTimer = () => {
    if (time.seconds >= 0){
      // props({
      //   seconds: seconds + 60,
      //   time: secsToTime(seconds + 60),
      // })
      setTime((prevState) => ({
        ...prevState,
        seconds: prevState.seconds + 60,
        time: secsToTime(prevState.seconds + 60),
        })
      )
    }
  };

  const decTimer = () => {
    if (time.seconds > 61 || timer === 0){
      // props({
      //   seconds: seconds - 60,
      //   time: secsToTime(seconds - 60),
      // })
      setTime((prevState) => ({
        ...prevState,
        seconds: prevState.seconds - 60,
        time: secsToTime(prevState.seconds - 60),
        })
      )
    }
  };

  const startTimer = () => {
    if (timer === 0 && time.seconds > 0){
          timer = (setInterval(countDown, 1000));
    }
  };

  const countDown = () => {
    let second = time.seconds - 1;
    setTime({
      seconds: second,
      time: secsToTime(second)
    });
    // props({
    //   time: secsToTime(seconds),
    //   seconds: seconds,
    // });

    if (second === 0){
      clearInterval(timer);
      setTime({
        time: {h:0, m:0, s:0},
        seconds: 0,
      });
      // props({
      //   time: { h: 0, m: 0, s:0 },
      //   seconds: 0,
      // });
    }
  }

  const stopTimer = () => {
    if (timer !== 0 && time.seconds !== 0){
      clearInterval(timer);
      timer = 0;
    }
  }

  const lapTime = () => {
    if (timer !== 0 && time.seconds !== 0){
      const newLaps = [...time.laps];
      setTime((prevState) => ({
        return: {
            laps: newLaps.concat(prevState.time),
          }
        })
      )
    }
  }

  const removeLap = (id) => {
    const laps = time.laps;
    setTime({ laps: laps.filter((item, i) => i !== id) })
  }

  const resetTime = () => {
    setTime({
      time: { h:0, m:0, s:0 },
      seconds: 0,
      laps: []
    });

    if (timer !== 0){
      clearInterval(timer);
    }
  }

  const timeFormat = (time) => {
    let {h, m, s} = time;

    if (h.toString().length < 2) h = `0${h}`;
    if (m.toString().length < 2) m = `0${m}`;
    if (s.toString().length < 2) s = `0${s}`;

    return { h, m, s };
  }

  let {h, m, s} = timeFormat(time);
  let laps = null;

  if(time.laps.length !== 0){
    laps = time.laps.map((lap, id) => {
      let { h, m, s} = timeFormat(lap);
      return <Labels clicked={() => removeLap(id)} key={id} lapTime={`${h}:${m}:${s}`} />;
    })
  }

  return (
    <div className="container mt-4 flex flex-col">
      <div className="mx-auto py-4">
        <span className="text-6xl">
          {h}:{m}:{s}
        </span>
      </div>
      <div className="mx-auto py-6 mt-4 flex flex-row space-x-5">
        <Buttons clicked={incTimer}>+</Buttons>
        <Buttons clicked={startTimer}>Start</Buttons>
        <Buttons clicked={stopTimer}>Stop</Buttons>
        <Buttons clicked={lapTime}>Lap</Buttons>
        <Buttons clicked={resetTime}>Reset</Buttons>
        <Buttons clicked={decTimer}>-</Buttons>
      </div>
    </div>
  )
}

export default Timer
