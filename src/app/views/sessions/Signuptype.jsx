import React, { Component } from "react";
import { Link } from "react-router-dom";
class Signuptype extends Component {
  render() {
    return (
      <div className="auth-layout-wrap">
        <div className="">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-4 col-sm-6">

              <div className="card">
                <div className="card-body">
                  <div className="user-profile mb-4">
                    <div className="ul-widget-card__user-info">
                      <p className="m-0 text-24">¿Necesitas asesoría de algún experto?</p>
                    </div>
                  </div>
                  <div className=" mt-2">
                    <Link
                      to="/session/signup-client"
                      className="btn btn-rounded btn-primary btn-block m-1"
                    >
                      !Crea una cuenta y empieza!
                    </Link>
                  </div>
                </div>
              </div>

            </div>
            <div className="col-lg-4 col-sm-6">

              <div className="card">
                <div className="card-body">
                  <div className="user-profile mb-4">
                    <div className="ul-widget-card__user-info">
                      <p className="m-0 text-24">¿Quieres trabajar como consultor?</p>
                    </div>
                  </div>
                  <div className=" mt-2">
                    <Link
                      to="/session/signup-consultant"
                      className="btn btn-rounded btn-primary btn-block m-1"
                    >
                      Regístrate
                    </Link>
                  </div>
                </div>
              </div>

            </div>
            <div className="col-lg-12 col-sm-12">
              <div className="text-center p-5">
                <p>
                  ¿Ya estás registrado? {' '}
                  <Link to="/session/signin">
                    Ingresa
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signuptype;
