import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { mediaPlayer } from './reducers'


let middlewares = [];
middlewares.push(thunkMiddleware);

const rootReducer = combineReducers({
  mediaPlayer: mediaPlayer,
})

export const store = createStore(rootReducer, applyMiddleware(...middlewares));