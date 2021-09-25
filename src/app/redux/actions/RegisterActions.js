import FirebaseAuthService from "../../services/firebase/firebaseAuthService";
import history from "@history.js";

export const REGISTER_ERROR = "REGISTER_ERROR";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_LOADING = "REGISTER_LOADING";

export function firebaseSignUpClient(payload) {
  return dispatch => {
    const { email, password, username } = payload

    FirebaseAuthService.signUpWithEmailAndPassword(email, password)
      .then(user => {
        const uid = user.user.uid
        return FirebaseAuthService.registerUser({ uid, firstName: username, role: 'client', email })
      })
      .then(() => {

        history.push({
          pathname: "/session/signin"
        });

        return dispatch({
          type: REGISTER_SUCCESS
        });
      })
      .catch(error => {
        return dispatch({
          type: REGISTER_ERROR,
          payload: error
        });
      });
  };
}

export function firebaseSignUpConsultant(payload) {
  return dispatch => {
    const { email, password, username, category } = payload

    FirebaseAuthService.signUpWithEmailAndPassword(email, password)
      .then(user => {
        const uid = user.user.uid
        return FirebaseAuthService.registerUser({ uid, firstName: username, category, role: 'consultant', email })
      })
      .then(() => {

        history.push({
          pathname: "/session/signin"
        });

        return dispatch({
          type: REGISTER_SUCCESS
        });
      })
      .catch(error => {
        return dispatch({
          type: REGISTER_ERROR,
          payload: error
        });
      });
  };
}