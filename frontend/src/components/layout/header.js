import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/users";

export class Header extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.user;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <strong>{user ? `Hey ${user.username}` : ""}</strong>
        </li>
        <li className="nav-item">
          <button onClick={this.props.logout} className="nav-link">
            <strong>logout</strong>
          </button>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <div className="nav-container">
        <nav className="navbar navbar-expand-sm fixed-top">
          <div className="container">
            <a className="navbar-brand mx-4" href="#">
              <img src="/static/frontend/images/logo.png" alt="logo" />
            </a>

            <button
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon" id="nav-toggle-button">
                =
              </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);
