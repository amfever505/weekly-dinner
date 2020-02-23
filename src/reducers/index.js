import { combineReducers } from 'redux';

import menuReducer from './menu';

const rootReducer = combineReducers({ menuReducer });

export default rootReducer;
