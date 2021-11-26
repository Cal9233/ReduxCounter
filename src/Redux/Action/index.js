import { INCREMENT, DECREMENT, COUNTDOWN, COUNTDOWN_AT_ZERO, RESET, CREATE_LAP, RESET_LAPS, REMOVE_LAP } from "../Action/action-types";

const mapDispatchToProps = (dispatch) => {
  return {
      onIncrement: (fn) => dispatch({ type: INCREMENT, secToTime: fn }),
      onDecrement: (fn) => dispatch({ type: DECREMENT, secToTime: fn }),
      onCountDown: (fn) => dispatch({ type: COUNTDOWN, secToTime: fn }),
      onCountDownAtZero: () => dispatch({ type: COUNTDOWN_AT_ZERO }),
      onCreateLap: (time) => dispatch({ type: CREATE_LAP, time: time }),
      onRemoveLap: (id) => dispatch({ type: REMOVE_LAP, id: id }),
      onReset: () => dispatch({ type: RESET }),
      onResetLaps: () => dispatch({ type: RESET_LAPS }),
  };
};

const mapStateToProps = (state) => {
  return {
      time: state.tmr.time,
      seconds: state.tmr.seconds,
      laps: state.lpr.laps,
  };
};