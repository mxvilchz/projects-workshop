import jwtAuthService from "../../services/jwtAuthService";
import FirebaseAuthService from "../../services/firebase/firebaseAuthService";
import { setUserData } from "./UserActions";
import history from "@history.js";

export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const RESET_PASSWORD = "RESET_PASSWORD";

export function loginWithEmailAndPassword(payload) {
  return dispatch => {
    dispatch({
      type: LOGIN_LOADING
    });

    jwtAuthService
      .loginWithEmailAndPassword(payload)
      .then(user => {
        dispatch(setUserData(user));

        // if (user.role === 'client') {
        //   history.push({
        //     pathname: "/client/home",
        //   });
        // } else {
        //   history.push({
        //     pathname: "/consultant/home"
        //   });
        // }

        return dispatch({
          type: LOGIN_SUCCESS
        });
      })
      .catch(error => {
        return dispatch({
          type: LOGIN_ERROR,
          payload: error
        });
      });
  };
}

export function resetPassword({ email }) {
  return dispatch => {
    dispatch({
      payload: email,
      type: RESET_PASSWORD
    });
  };
}

export function firebaseLoginEmailPassword({ email, password }) {
  return dispatch => {
    FirebaseAuthService.signInWithEmailAndPassword(email, password)
      .then(user => {
        if (user) {
          const id = user.user.uid
          FirebaseAuthService.getUserData(id, data => {
            const inComingUser = {
              userId: user.user.uid,
              role: data.role,
              displayName: user.user.displayName,
              email: user.user.email,
              photoURL: user.user.photoURL,
              phoneNumber: user.user.phoneNumber,
              token: user.user.refreshToken,
              category: data.role === 'client' ? '' : data.category
            }
            dispatch(
              setUserData(inComingUser)
            );

            if (data.role === 'client') {
              history.push({
                pathname: "/client/home",
                state: inComingUser
              })
            } else {
              history.push({
                pathname: "/consultant/home",
                state: inComingUser
              });
            }

            return dispatch({
              type: LOGIN_SUCCESS
            });
          })
        } else {
          return dispatch({
            type: LOGIN_ERROR,
            payload: "Login Failed"
          });
        }
      })
      .catch(error => {
        return dispatch({
          type: LOGIN_ERROR,
          payload: error
        });
      });
  };
}
