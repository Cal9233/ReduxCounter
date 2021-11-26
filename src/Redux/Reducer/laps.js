import { CREATE_LAP, RESET_LAPS, REMOVE_LAP } from "../Action/action-types";

const initialState = { laps: [] };

const lapReducer = (state = initialState, action) => {
  switch(action.type) {
    case CREATE_LAP:
      const newLaps = [...state.laps];
      return {
        ...state,
        laps: newLaps.concat(action.time),
      };
      case REMOVE_LAP:
        return {
          ...state,
          laps: state.laps.filter((item, index) => index !== action.id),
        };
        case RESET_LAPS: {
          return {
            ...state,
            laps: [],
          };
        }
        default:
          return state;
  }
};

export default lapReducer;