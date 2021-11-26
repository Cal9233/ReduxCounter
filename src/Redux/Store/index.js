import {createStore, combineReducers} from 'redux';
import timeReducer from '../Reducer/timer';
import lapReducer from '../Reducer/laps';

const rootReducer = combineReducers({
  tmr: timeReducer,
  lpr: lapReducer
});

const store = createStore(rootReducer);

export default store;