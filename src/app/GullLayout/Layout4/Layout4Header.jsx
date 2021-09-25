import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  setLayoutSettings,
  setDefaultSettings
} from "app/redux/actions/LayoutActions";
import { logoutUser } from "app/redux/actions/UserActions";
import { withRouter } from "react-router-dom";

import MegaMenu from "@gull/components/MegaMenu";

class Layout4Header extends Component {
  state = {};

  render() {
    return (
      <div className="main-header">
        <div className="logo">
          <img src="/assets/images/logo.png" alt="" />
        </div>

        {/* <div className="d-none d-lg-flex align-items-center">
          <Dropdown className="mr-3">
            <Dropdown.Toggle as="span" className="toggle-hidden cursor-pointer">
              Menu
            </Dropdown.Toggle>

            <div className="mega-menu">
              <Dropdown.Menu>
                <MegaMenu></MegaMenu>
              </Dropdown.Menu>
            </div>
          </Dropdown>
        </div> */}

        <div style={{ margin: "auto" }}></div>

        <div className="header-part-right">
          <div className="user col align-self-end">
            <div className="">
              <Link to='/session/signin' className="mr-2">
                <span className="item-name">Iniciar Sesión</span>
              </Link>
              <Link to='/signup/type' className="">
                <span className="item-name">Crear cuenta</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Layout4Header.propTypes = {
  setLayoutSettings: PropTypes.func.isRequired,
  setDefaultSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  setDefaultSettings: PropTypes.func.isRequired,
  setLayoutSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  user: state.user,
  settings: state.layout.settings
});

export default withRouter(
  connect(mapStateToProps, {
    setLayoutSettings,
    setDefaultSettings,
    logoutUser
  })(Layout4Header)
);
