import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/users";
import { Link, Redirect } from "react-router-dom";

export class RegisterUser extends Component {
  state = {
    username: "",
    email: "",
    password: ""
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { username, email, password } = this.state;
    const user = { username, email, password };
    this.props.register(
      this.state.username,
      this.state.password,
      this.state.email
    );
    console.log(this.state.username);
    this.setState({
      username: "",
      email: "",
      password: ""
    });
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username, email, password } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-4 mb-4">
          <img
            src="/static/frontend/images/logo.png"
            className="img-thumbnail rounded mx-auto d-block"
          />
          <h2 className="text-center">Add User</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                className="form-control"
                type="text"
                name="username"
                onChange={this.onChange}
                value={username}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                className="form-control"
                type="email"
                name="email"
                onChange={this.onChange}
                value={email}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

export default connect(
  mapStateToProps,
  { register }
)(RegisterUser);
