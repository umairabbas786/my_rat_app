import * as types from '../actions/types';
import {Platform} from 'react-native';
import {baseUrl} from '../../assets/constants/constants';
import {dollarRate, loginSuccess} from './auth';

export const activeScreen = params => ({
  type: types.ACTIVE_SCREEN,
  payload: params,
});

//HomeScreen APIs
export const getData = (data, success, error) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: data,
        redirect: 'follow',
      };

      fetch(`${baseUrl}/show_all_rats.php`, requestOptions)
        .then(response => response.json())
        .then(response => {
          console.log('..........................');
          dispatch(homeLoad(false));
          console.log(response);
          if (response.state === 'OK') {
            success(response.data);
            dispatch(homeScreenData(response.data.all_rats));
          } else {
            dispatch(homeLoad(false));
            error(response);
          }
        })
        .catch(function (error) {
          dispatch(homeLoad(false));
          console.log(error);
        });
    } catch (err) {
      error(err);
    }
  };
};
export const addRat = (data, success, error) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: data,
        redirect: 'follow',
      };

      fetch(`${baseUrl}/add_rat_details.php`, requestOptions)
        .then(response => response.json())
        .then(response => {
          console.log('..........................');
          dispatch(homeLoad(false));
          console.log(response);
          if (response.state === 'OK') {
            success(response);
          } else {
            dispatch(homeLoad(false));
            error(response);
          }
        })
        .catch(function (error) {
          dispatch(homeLoad(false));
          console.log(error);
        });
    } catch (err) {
      error(err);
    }
  };
};
export const editRat = (data, success, error) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: data,
        redirect: 'follow',
      };

      fetch(`${baseUrl}/edit_rat.php`, requestOptions)
        .then(response => response.json())
        .then(response => {
          console.log('..........................');
          dispatch(homeLoad(false));
          console.log(response);
          if (response.state === 'OK') {
            success(response);
          } else {
            dispatch(homeLoad(false));
            error(response);
          }
        })
        .catch(function (error) {
          dispatch(homeLoad(false));
          console.log(error);
        });
    } catch (err) {
      error(err);
    }
  };
};

export const deleteRat = (data, success, error) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: data,
        redirect: 'follow',
      };

      fetch(`${baseUrl}/delete_rat.php`, requestOptions)
        .then(response => response.json())
        .then(response => {
          console.log('..........................');
          dispatch(homeLoad(false));
          console.log(response);
          if (response.state === 'OK') {
            success(response);
          } else {
            dispatch(homeLoad(false));
            error(response);
          }
        })
        .catch(function (error) {
          dispatch(homeLoad(false));
          console.log(error);
        });
    } catch (err) {
      error(err);
    }
  };
};

// helping functions
export const homeLoad = data => {
  return {
    type: types.HOME_LOADING,
    payload: data,
  };
};

export const homeScreenData = data => {
  return {
    type: types.HOME_DATA,
    payload: data,
  };
};

export const selectImage = data => {
  return {
    type: types.SELECTED_IMAGE,
    payload: data,
  };
};
