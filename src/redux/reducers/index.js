import {combineReducers} from 'redux';

import {homeReducer} from './home';

export default combineReducers({
  home: homeReducer,
});
