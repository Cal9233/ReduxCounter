import React from 'react';
import Buttons from './Buttons';
import Labels from './Labels';

const Timer = () => {

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

  }


  return (
    <div>
      
    </div>
  )
}

export default Timer
