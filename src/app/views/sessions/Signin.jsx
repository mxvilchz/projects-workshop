import React, { Component } from "react";
import { Formik } from "formik";
import * as yup from "yup";
// import { loginWithEmailAndPassword } from "app/redux/actions/LoginActions";
import { firebaseLoginEmailPassword } from "app/redux/actions/LoginActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const SigninSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email es invalido")
    .required("Email es requerido"),
  password: yup
    .string()
    .min(8, "La contraseña debe tener 8 caracteres")
    .required("Contraseña es requerido")
});

class Signin extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = event => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (value, { isSubmitting }) => {
    this.props.firebaseLoginEmailPassword(value);
  };

  render() {
    return (
      <div
        className="auth-layout-wrap"
        style={{
          backgroundImage: "url(/assets/images/photo-wide-4.jpg)"
        }}
      >
        <div className="auth-content">
          <div className="card o-hidden">
            <div className="row">
              <div className="col-md-6">
                <div className="p-4">
                  <div className="auth-logo text-center mb-4">
                    <img src="/assets/images/logo.png" alt="" />
                  </div>
                  <h1 className="mb-3 text-18">Inicio de sesión</h1>
                  <Formik
                    initialValues={this.state}
                    validationSchema={SigninSchema}
                    onSubmit={this.handleSubmit}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input
                            className="form-control form-control-rounded position-relative"
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                          {errors.email && (
                            <div className="text-danger mt-1 ml-2">
                              {errors.email}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="password">Contraseña</label>
                          <input
                            className="form-control form-control-rounded"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                          {errors.password && (
                            <div className="text-danger mt-1 ml-2">
                              {errors.password}
                            </div>
                          )}
                        </div>
                        <button
                          className="btn btn-rounded btn-primary btn-block mt-2"
                          type="submit"
                        >
                          Iniciar Sesión
                        </button>
                      </form>
                    )}
                  </Formik>

                  <div className="mt-3 text-center">
                    <Link to="/session/forgot-password" className="text-muted">
                      <u>¿Olvidaste tu contraseña?</u>
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className="col-md-6 text-center "
                style={{
                  backgroundSize: "cover",
                  backgroundImage: "url(/assets/images/photo-long-3.jpg)"
                }}
              >
                <div className="pr-3 auth-right">
                  <Link
                    to="/signup/type"
                    className="btn btn-rounded btn-outline-primary btn-outline-email btn-block btn-icon-text"
                  >
                    <i className="i-Mail-with-At-Sign"></i> Crear nueva cuenta
                  </Link>

                  <Button className="btn btn-rounded btn-outline-google btn-block btn-icon-text">
                    <i className="i-Google-Plus"></i> Iniciar sesión con Google
                  </Button>
                  <Button className="btn btn-rounded btn-block btn-icon-text btn-outline-facebook">
                    <i className="i-Facebook-2"></i> Iniciar sesión con Facebook
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  firebaseLoginEmailPassword: PropTypes.func.isRequired,
  user: state.user
});

export default connect(mapStateToProps, {
  firebaseLoginEmailPassword
})(Signin);
