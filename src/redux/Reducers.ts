import {combineReducers} from 'redux';
import { AuthActionTypes } from './Actions';

let initialState={}

const red_LoginData=(state=initialState, action: AuthActionTypes) => {

    if (action.type === 'login') {
    return {...state, ...action.payload }

  }
    return state;
  };

const rootReducer= combineReducers({
    red_LoginData,
  });

export default rootReducer;