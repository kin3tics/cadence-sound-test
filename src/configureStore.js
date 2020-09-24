import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { mediaPlayer, ui } from './reducers'


let middlewares = [];
middlewares.push(thunkMiddleware);

const rootReducer = combineReducers({
  mediaPlayer: mediaPlayer,
  ui: ui
})

export const store = createStore(rootReducer, applyMiddleware(...middlewares));