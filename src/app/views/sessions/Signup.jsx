import React, { Component } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { firebaseSignUpClient, firebaseSignUpConsultant } from "app/redux/actions/RegisterActions";

class Signup extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    repassword: "",
    category: "",
    isClient: true
  };

  componentDidMount() {
    this.validateUser();
  }

  validateUser = () => {
    if (window.location.href.indexOf('client') === -1)
      this.setState({ isClient: false })
  }

  handleSubmit = (values, { setSubmitting }) => {
    if (this.state.isClient) {
      this.props.firebaseSignUpClient(values);
    } else {

      this.props.firebaseSignUpConsultant(values);
    }
  };

  handleChange(event, name) {
    this.setState({ [name]: event.target.value });
  }

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
              <div
                className="col-md-6 text-center "
                style={{
                  backgroundSize: "cover",
                  backgroundImage: "url(/assets/images/photo-long-3.jpg)"
                }}
              >
                <div className="pl-3 auth-right">
                  <div className="auth-logo text-center mt-4">
                    <img src="/assets/images/logo.png" alt="" />
                  </div>
                  <div className="flex-grow-1"></div>
                  <div className="w-100 mb-4">
                    <Link
                      to="/session/signin"
                      className="btn btn-rounded btn-outline-primary btn-outline-email btn-block btn-icon-text"
                    >
                      <i className="i-Mail-with-At-Sign"></i> Iniciar Sesión
                    </Link>

                    <Button className="btn btn-outline-google btn-block btn-icon-text btn-rounded">
                      <i className="i-Google-Plus"></i> Iniciar sesión con Google
                    </Button>
                    <Button className="btn btn-outline-facebook btn-block btn-icon-text btn-rounded">
                      <i className="i-Facebook-2"></i> Iniciar sesión con Facebook
                    </Button>
                  </div>
                  <div className="flex-grow-1"></div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="p-4">
                  <p className="mb-0 text-18">Registrate como</p>
                  <h1 className="mb-3 text-bold">{this.state.isClient ? 'Cliente' : 'Consultor'}</h1>
                  <Formik
                    initialValues={this.state}
                    validationSchema={this.state.isClient ? SignupSchemaClient : SignupSchemaConsultant}
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
                          <label htmlFor="username">Tu nombre</label>
                          <input
                            className="form-control form-control-rounded"
                            name="username"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                          />
                          {errors.username && touched.username && (
                            <div className="text-danger mt-1 ml-2">
                              {errors.username}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input
                            name="email"
                            className="form-control form-control-rounded"
                            type="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                          {errors.email && touched.email && (
                            <div className="text-danger mt-1 ml-2">
                              {errors.email}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="password">Contraseña</label>
                          <input
                            name="password"
                            className="form-control form-control-rounded"
                            type="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                          {errors.password && touched.password && (
                            <div className="text-danger mt-1 ml-2">
                              {errors.password}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="repassword">Repetir contraseña</label>
                          <input
                            name="repassword"
                            className="form-control form-control-rounded"
                            type="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.repassword}
                          />
                          {errors.repassword && touched.repassword && (
                            <div className="text-danger mt-1 ml-2">
                              {errors.repassword}
                            </div>
                          )}
                        </div>

                        {!this.state.isClient ?
                          (<div className="form-group">
                            <label htmlFor="category">Especialidad</label>
                            <select
                              className="form-control form-control-rounded"
                              name="category"
                              onChange={(e) => { handleChange(e); this.handleChange(e, "category") }}
                              onBlur={handleBlur}
                            >
                              <option value="">Seleccionar especialidad</option>
                              <option value="Medicina">Medicina</option>
                              <option value="Leyes">Leyes</option>
                              <option value="Agricultura">Agricultura</option>
                              <option value="Seguridad informática">Seguridad informática</option>
                            </select>
                            {errors.category && touched.category && (
                              <div className="text-danger mt-1 ml-2">
                                {errors.category}
                              </div>
                            )}
                          </div>) : null
                        }

                        <button
                          className="btn btn-primary btn-block btn-rounded mt-3"
                          type="submit"
                        >
                          Registrarme
                        </button>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const SignupSchemaConsultant = yup.object().shape({
  username: yup.string().required("El nombre es requerido"),
  email: yup
    .string()
    .email("Email es invalido")
    .required("Email es requerido"),
  password: yup
    .string()
    .min(2, "La contraseña debe tener 8 caracteres")
    .required("Contraseña es requerido"),
  repassword: yup
    .string()
    .required("Repetir contraseña es requerido")
    .oneOf([yup.ref("password")], "Las contraseñas deben coincidir"),
  category: yup.string().required("La especialidad es requerida"),
});

//this.state. .state.isClient? yup.string().nullable : 

const SignupSchemaClient = yup.object().shape({
  username: yup.string().required("El nombre es requerido"),
  email: yup
    .string()
    .email("Email es invalido")
    .required("Email es requerido"),
  password: yup
    .string()
    .min(2, "La contraseña debe tener 8 caracteres")
    .required("Contraseña es requerido"),
  repassword: yup
    .string()
    .required("Repetir contraseña es requerido")
    .oneOf([yup.ref("password")], "Las contraseñas deben coincidir")
});

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  firebaseSignUpClient,
  firebaseSignUpConsultant
})(Signup);
