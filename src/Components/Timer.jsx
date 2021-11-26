import React, { Component, Fragment } from "react";
import Buttons from "./Buttons";
import Labels from './Labels';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = { time: { h: 0, m: 0, s: 0 }, seconds: 0, laps: [] };

        this.timer = 0;

        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.lapTimer = this.lapTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.incTimer = this.incTimer.bind(this);
        this.decTimer = this.decTimer.bind(this);
    }

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            h: hours,
            m: minutes,
            s: seconds,
        };
        return obj;
    }

    incTimer() {
        if (this.props.seconds >= 0) {
            this.props.onIncrement(this.secondsToTime);
        }
}

    decTimer() {
        // Runs only if seconds > 61, to not result in getting -ve values rendered
        if (this.props.seconds > 61) this.props.onDecrement(this.secondsToTime);
    }

    startTimer() {
        // Runs only if timer isn't started already and seconds are atleast more than zero
        if (this.timer === 0 && this.props.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Removing a sec and setting state to re-render
        this.props.onCountDown(this.secondsToTime);

        // Check if we're at zero
        if (this.props.seconds === 0) {
            clearInterval(this.timer);
            this.props.onCountDownAtZero();
        }
    }

    stopTimer() {
        // Stop only if timer is running and seconds aren't zero already
        if (this.timer !== 0 && this.props.seconds !== 0) {
            clearInterval(this.timer);
            this.timer = 0;
        }
    }

    lapTimer() {
        // Lap only if timer is running and seconds aren't zero already
        if (this.timer !== 0 && this.props.seconds !== 0)
            this.props.onCreateLap(this.props.time);
    }

    removeLap(id) {
        const laps = this.state.laps;
        this.setState({ laps: laps.filter((item, index) => index !== id) });
    }

    resetTimer() {
        // Getting back state to its original form
        this.props.onReset();
        this.props.onResetLaps();

        // Also, if timer is running, we've to stop it too
        if (this.timer !== 0) {
            clearInterval(this.timer);fn
            this.timer = 0;
        }
    }

    timeFormatter(time) {
        let { h, m, s } = time;

        if (h.toString().length < 2) h = `0${h}`;

        if (m.toString().length < 2) m = `0${m}`;

        if (s.toString().length < 2) s = `0${s}`;

        return { h, m, s };
    }

    render() {
        let { h, m, s } = this.timeFormatter(this.props.time);

            let laps = null;

            if (this.props.laps.length !== 0) {
                laps = this.props.laps.map((lap, id) => {
                    let { h, m, s } = this.timeFormatter(lap);
                    return (
                        <Labels
                            key={id}
                            clicked={() => this.props.onRemoveLap(id)}
                            lapTime={`${h}:${m}:${s}`}
                        />
                    );
                });
            }

        return (
            <Fragment>
                <div className="container mt-4 flex flex-col">
                    <div className="mx-auto py-4">
                        <span className="text-6xl">
                            {h}:{m}:{s}
                        </span>
                    </div>
                    <div className="mx-auto py-6 mt-4 flex flex-row space-x-5">
                        <Buttons clicked={this.incTimer}>+</Buttons>
                        <Buttons clicked={this.startTimer}>Start</Buttons>
                        <Buttons clicked={this.stopTimer}>Stop</Buttons>
                        <Buttons clicked={this.lapTimer}>Lap</Buttons>
                        <Buttons clicked={this.resetTimer}>Reset</Buttons>
                        <Buttons clicked={this.decTimer}>-</Buttons>
                    </div>
                </div>
                <div className="container py-6">{laps}</div>
            </Fragment>
        );
    }
}

export default Timer;