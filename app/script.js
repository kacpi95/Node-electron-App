import React, { useState } from 'react';
import { render } from 'react-dom';

const App = () => {
  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);

  function formatTime() {
    const min = Math.floor(time / 60);
    const sec = time % 60;

    let formatMin = min < 10 ? `0${min}` : `${min}`;
    let formatSec = sec < 10 ? `0${sec}` : `${sec}`;

    return `${formatMin} : ${formatSec}`;
  }

  function handleStart() {
    setTime(1200);
    setStatus('work');

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setStatus('rest');
          setTime(20);

          const restInterval = setInterval(() => {
            setTime((prev) => {
              if (prev <= 1) {
                clearInterval(restInterval);
                setStatus('off');
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
          setTimer(restInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setTimer(interval);
  }
  function handleStop() {
    if (timer) {
      clearInterval(timer);
      setTime(null);
      setStatus('off');
    }
  }
  function closeApp() {
    window.close();
  }

  return (
    <div>
      <h1>Protect your eyes</h1>
      {status === 'off' && (
        <div>
          <p>
            According to optometrists in order to save your eyes, you should
            follow the 20/20/20. It means you should to rest your eyes every 20
            minutes for 20 seconds by looking more than 20 feet away.
          </p>
          <p>
            This app will help you track your time and inform you when it's time
            to rest.
          </p>
        </div>
      )}
      {status === 'work' && <img src='./images/work.png' />}
      {status === 'rest' && <img src='./images/rest.png' />}
      {status !== 'off' && <div className='timer'>{formatTime()}</div>}
      {status === 'off' && (
        <button className='btn' onClick={handleStart}>
          Start
        </button>
      )}
      {status !== 'off' && (
        <button className='btn' onClick={handleStop}>
          Stop
        </button>
      )}
      <button className='btn btn-close' onClick={closeApp}>
        X
      </button>
      <button className='btn btn-close'>X</button>
    </div>
  );
};

render(<App />, document.querySelector('#app'));
