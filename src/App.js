import { useEffect, useRef, useState, useContext } from "react";
import { ErrorBoundary } from "react-error-boundary";

import "./styles.css";
import { AppContext } from "./AppContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Countdown from "./components/Countdown/Countdown.js";
import StopWatch from "./components/StopWatch/StopWatch.js";
import XY from "./components/XY/XY";
import Tabata from "./components/TABATA/TABATA";

import {
  HashRouter as Router,
  Routes,
  Route,
  NavLink as Link,
  useParams,
} from "react-router-dom";
import LinkButton from "./components/LinkButton/LinkButton";
import AddButton from "./components/AddButton/AddButton";
import ViewQueue from "./components/ViewQueue/ViewQueue";
import TimerInfo from "./components/TimerInfo/TimerInfo";

import { useSearchParams } from "react-router-dom";
import { AddInputPanel } from "./components/AddInputPanel/AddInputPanel.js";

const MainPage = () => {
  const { timerQueue, setTimerQueue, setCurrentTimer, currentTimer } =
    useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSpentTimer = () => {
    setCurrentTimer((v) => v + 1);
    // start the current timer
  };

  useEffect(() => {
    // When the website load,
    // If there is a searchParams for `timers`,
    // then we will set our timer queue to that

    const timerSearchParams = searchParams.get("timers");

    if (timerSearchParams) {
      setTimerQueue(JSON.parse(timerSearchParams));
    }
    // else
    // {
    // searchParams.set("timers", JSON.stringify(timerQueue));
    // setSearchParams(searchParams);
    // }
  }, [searchParams]);

  useEffect(() => {
    const currentTimerParam = searchParams.get("timers");
    const currentTimerQueue = JSON.stringify(timerQueue);

    console.log(currentTimerParam, currentTimerQueue);

    if (currentTimerParam !== currentTimerQueue) {
      if (timerQueue.length > 0) {
        setSearchParams({ timers: currentTimerQueue });
      } else {
        setSearchParams({});
      }
    }
  }, [timerQueue]);

  return (
    <>
      <div className="main-content">
        {timerQueue.length === 0 && (
          <div className="start-workout-desc">
            <h1 className="text-h3"> Let's Get Working! </h1>

            <LinkButton text="Add Timer to Queue" to="/add" />

            <p className="text-h2">💪</p>
          </div>
        )}
        {currentTimer >= timerQueue.length && timerQueue.length > 0 && (
          <div className="workout-complete-message">
            <p className="text-h2">Congratulations!</p>
            <p className="text-h3">Workout Complete</p>
            <LinkButton
              text="Reset Workout"
              onClick={() => {
                setCurrentTimer(0);
              }}
            />
            <p className="text-p">or...</p>
            <p className="text-h1">🎂</p>
            <div className="eat-cake-wrapper">
              <p className="text-p">Eat Cake</p>
              <p className="text-p">😁</p>
            </div>
          </div>
        )}

        {currentTimer < timerQueue.length && (
          <div className="timer-info">
            <TimerInfo />
          </div>
        )}

        <div className="timer-title text-h3">
          {currentTimer < timerQueue.length &&
            timerQueue[currentTimer].timerType}
        </div>

        {timerQueue && (
          <div style={{ textAlign: "center" }}>
            {timerQueue
              .filter((timer, timerIndex) => timerIndex == currentTimer)
              .map((timer, ix) => {
                if (timer.timerType === "Countdown") {
                  return (
                    <Countdown
                      key={timer.id}
                      {...timer.props}
                      onSpent={handleSpentTimer}
                    />
                  );
                } else if (timer.timerType === "Stopwatch") {
                  return (
                    <StopWatch
                      key={timer.id}
                      {...timer.props}
                      onSpent={handleSpentTimer}
                    />
                  );
                } else if (timer.timerType === "XY") {
                  return (
                    <XY
                      key={timer.id}
                      {...timer.props}
                      onSpent={handleSpentTimer}
                    />
                  );
                } else if (timer.timerType === "TABATA") {
                  return (
                    <Tabata
                      key={timer.id}
                      {...timer.props}
                      onSpent={handleSpentTimer}
                    />
                  );
                }
              })}
          </div>
        )}
      </div>
      <div className="view-queue-container">
        <ViewQueue />
      </div>
    </>
  );
};

const AddTimerPage = () => {
  const { timerQueue, setTimerQueue } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [timerType, setTimerType] = useState("Countdown");

  useEffect(() => {
    // This one come from the URL
    const currentTimerParam = searchParams.get("timers");
    // This one come from the state of our queue
    const currentTimerQueue = JSON.stringify(timerQueue);

    console.log(currentTimerParam, currentTimerQueue);

    if (currentTimerParam !== currentTimerQueue) {
      if (timerQueue.length > 0) {
        setSearchParams({ timers: currentTimerQueue });
      } else {
        setSearchParams({});
      }
    }
  }, [timerQueue]);

  const handleSetTimerConfig = (timerConfig) => {
    // The Add Panel will give us the new timerConfig of the one user just created
    // We gonna add this to the queue
    setTimerQueue((v) => [...v, timerConfig]);
  };

  const showTimer = () => {
    return (
      <AddInputPanel
        key={timerType}
        timerType={timerType}
        setTimerConfig={handleSetTimerConfig}
      />
    );
  };
  return (
    <div>
      <div className="main-content">
        <div className="add-container">
          <AddButton
            key={"Countdown"}
            text="Countdown"
            status={timerType === "Countdown" ? "active" : "default"}
            onClick={() => setTimerType("Countdown")}
          />
          <AddButton
            key={"Stopwatch"}
            text="Stopwatch"
            status={timerType === "Stopwatch" ? "active" : "default"}
            onClick={() => setTimerType("Stopwatch")}
          />
          <AddButton
            key={"XY"}
            text="XY"
            status={timerType === "XY" ? "active" : "default"}
            onClick={() => setTimerType("XY")}
          />
          <AddButton
            key={"TABATA"}
            text="TABATA"
            status={timerType === "TABATA" ? "active" : "default"}
            onClick={() => setTimerType("TABATA")}
          />
        </div>

        <div style={{ textAlign: "center" }}>{showTimer()}</div>
      </div>

      <ViewQueue />
    </div>
  );
};

export default function App() {
  // const [searchParams, setSearchParams] = useSearchParams();
  const [timerQueue, setTimerQueue] = useState([]);
  const [currentTimer, setCurrentTimer] = useState(0);

  return (
    <ErrorBoundary
      fallback={<div className="text-p-large">Something went wrong!</div>}
    >
      <DndProvider backend={HTML5Backend}>
        <AppContext.Provider
          value={{
            timerQueue: timerQueue,
            setTimerQueue: setTimerQueue,
            currentTimer: currentTimer,
            setCurrentTimer: setCurrentTimer,
          }}
        >
          <Router>
            <div className="nav-bar">
              <ul className="nav-bar-list text-p">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/add">Add Timer</Link>
                </li>
              </ul>
            </div>

            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/add" element={<AddTimerPage />} />
            </Routes>
          </Router>
        </AppContext.Provider>
      </DndProvider>
    </ErrorBoundary>
  );
}
