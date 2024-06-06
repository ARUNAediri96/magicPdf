// reducers/reducers.js
import { combineReducers } from 'redux';
import {CONVERT_FILE_REQUEST,CONVERT_FILE_SUCCESS,CONVERT_FILE_FAILURE} from '../actions/convertActions';


const initialState = {
  uploading: false,
  uploadError: null,
  converting: false,
  convertError: null,
  convertedData: null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONVERT_FILE_REQUEST:
      return {
        ...state,
        converting: true,
        convertError: null
      };
    case CONVERT_FILE_SUCCESS:
      return {
        ...state,
        converting: false,
        convertedData: action.payload
      };
    case CONVERT_FILE_FAILURE:
      return {
        ...state,
        converting: false,
        convertError: action.payload
      };
    default:
      return state;
  }
};

export default rootReducer;
