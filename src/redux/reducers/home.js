import * as types from '../actions/types';
const initialState = {
  homeData: [],
  selectedImage: [],
  homeLoading: false,
};
export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HOME_DATA: {
      return {
        ...state,
        homeData: action.payload,
      };
    }
    case types.HOME_LOADING: {
      return {
        ...state,
        homeLoading: action.payload,
      };
    }
    case types.SELECTED_IMAGE: {
      return {
        ...state,
        selectedImage: action.payload,
      };
    }
    default:
      return state;
  }
};
