import React, { useState, useEffect } from "react";
import "./styles.css";

const App = () => {
    const [displayTime, setDisplayTime] = useState(25 * 60);
    const [breakTime, setBreakTime] = useState(5 * 60);
    const [sessionTime, setSessionTime] = useState(25 * 60);
    const [timerOn, setTimerOn] = useState(false);
    const [onBreak, setOnBreak] = useState(false);
  const [breakAudio] = useState(new Audio("./breaktime.mp3"));

  useEffect(() => {
        if (timerOn) {
      const timer = setInterval(() => {
        setDisplayTime((prev) => {
          if (prev <= 0) {
            playBreakSound();
            setOnBreak((prevBreak) => !prevBreak);
            return onBreak ? sessionTime : breakTime;
        }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timerOn, onBreak, breakTime, sessionTime]);

  const playBreakSound = () => {
    breakAudio.currentTime = 0;
    breakAudio.play();
    };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  const changeTime = (amount, type) => {
    if (type === "break") {
      setBreakTime((prev) => Math.max(60, Math.min(60 * 60, prev + amount)));
    } else {
      setSessionTime((prev) => Math.max(60, Math.min(60 * 60, prev + amount)));
      if (!timerOn) {
        setDisplayTime((prev) => Math.max(60, Math.min(60 * 60, prev + amount)));
      }
    }
  };

  const resetTime = () => {
    setDisplayTime(25 * 60);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
    setTimerOn(false);
    setOnBreak(false);
  };

  const LengthControl = ({ title, time, type }) => (
    <div className="length-control">
      <h3>{title}</h3>
      <div className="time-sets">
        <button onClick={() => changeTime(-60, type)}>-</button>
        <h3>{formatTime(time)}</h3>
        <button onClick={() => changeTime(60, type)}>+</button>
      </div>
            </div>
    );

  return (
    <div className="center-align container">
      <h3>25+5 Clock</h3>
      <div className="dual-container">
        <LengthControl title="Break Length" time={breakTime} type="break" />
        <LengthControl title="Session Length" time={sessionTime} type="session" />
      </div>
      <h5>{onBreak ? "Break" : "Session"}</h5>
      <h4>{formatTime(displayTime)}</h4>
      <button className="btn-large deep-purple lighten-2" onClick={() => setTimerOn(!timerOn)}>
        {timerOn ? (
          <i className="material-icons">pause_circle_filled</i>
        ) : (
          <i className="material-icons">play_circle_filled</i>
        )}
      </button>
      <button className="btn-large deep-purple lighten-2" onClick={resetTime}>
        <i className="material-icons">autorenew</i>
      </button>
      <h6 className="author">By Kalutu Daniel</h6>
    </div>
  );
};

export default App;
