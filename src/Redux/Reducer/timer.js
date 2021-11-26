import { INCREMENT, DECREMENT, COUNTDOWN, COUNTDOWN_AT_ZERO, RESET } from "../Action/action-types";
//import { secsToTime } from "../../utilities";

const initialState = { time: { h:0, m:0, s:0 }, seconds: 0 };

const timeReducer = (state = initialState, action) => {
  switch (action.types){
    case INCREMENT: 
      return {
        ...state,
        seconds: state.seconds + 60,
        time: action.secsToTime(state.seconds + 60),
      };
    case DECREMENT: 
    return {
      ...state,
      seconds: state.seconds - 60,
      time: action.secsToTime(state.seconds - 60),
    };
    case COUNTDOWN:
      return {
        ...state,
        seconds: state.seconds - 1,
        time: action.secsToTime(state.seconds - 1),
      };
      case COUNTDOWN_AT_ZERO:
        return {
          ...state,
          seconds: 0,
          time: { h:0, m:0, s:0 },
        };
        case RESET:
          return {
            ...state,
            time: { h:0, m:0, s:0 },
            seconds: 0,
          };
          default:
            return state;
  }
}

export default timeReducer;