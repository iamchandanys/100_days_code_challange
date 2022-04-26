import React, { Component } from "react";
import Input from "../common/inputs";
import Joi from "joi-browser";

class LoginForm extends Component {
  state = {
    account: {
      userName: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    userName: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  validate() {
    const { error } = Joi.validate(this.state.account, this.schema, { abortEarly: false }); // abortEarly: false to validate all the fields
    if (!error) return null;

    const errors = {};
    error.details.forEach((element) => {
      errors[element.path[0]] = element.message;
    });

    return errors;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;
  };

  handleChange = (e) => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account: account });
  };

  render() {
    const { account } = this.state;

    return (
      <div className="container" style={{ marginTop: 20 }}>
        <form onSubmit={(evt) => this.handleSubmit(evt)}>
          <Input inputType={"email"} name="userName" label="Email address" placeHolder="Enter Email" InputValue={account.userName} handleInputChange={(evt) => this.handleChange(evt)} />
          <br />
          <Input inputType={"password"} name="password" label="Email password" placeHolder="Enter Password" InputValue={account.password} handleInputChange={(evt) => this.handleChange(evt)} />
          <br />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
