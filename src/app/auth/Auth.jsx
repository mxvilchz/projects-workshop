import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { setUserData } from "../redux/actions/UserActions";
import jwtAuthService from "../services/jwtAuthService";
import localStorageService from "../services/localStorageService";
import firebaseAuthService from "../services/firebase/firebaseAuthService";
import { loginWithEmailAndPassword } from "app/redux/actions/LoginActions";

class Auth extends Component {
  state = {};

  constructor(props) {
    super(props);

    this.props.setUserData(localStorageService.getItem("auth_user"));
    // this.checkJwtAuth();
    this.checkFirebaseAuth();
  }

  checkJwtAuth = () => {
    jwtAuthService.loginWithToken().then(user => {
      this.props.setUserData(user);
    });
  };

  checkFirebaseAuth = () => {
    firebaseAuthService.checkAuthStatus(user => {
      if (user) {
        // console.log(user.uid);
        // console.log(user.email);
        // console.log(user.emailVerified);
        firebaseAuthService.getUserData(user.uid, data => {
          const payload = {
            userId: user.uid,
            role: data.role,
            displayName: data.username,
            email: user.email,
            photoURL: user.photoURL,
            phoneNumber: user.phoneNumber,
            token: user.refreshToken,
            category: data.role === 'client' ? '' : data.category
          }
          this.props.loginWithEmailAndPassword(payload)
        })
      } else {
        console.log("not logged in");
      }
    });
  };

  render() {
    const { children } = this.props;
    return <Fragment>{children}</Fragment>;
  }
}

const mapStateToProps = state => ({
  setUserData: PropTypes.func.isRequired,
  login: state.login
});

export default connect(mapStateToProps, { setUserData, loginWithEmailAndPassword })(Auth);
