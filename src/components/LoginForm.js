import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import {onSubmit} from "../actions";






export default function LoginForm() {
  const loginErr = useSelector(state => state.loginError);
  const accept = useSelector(state => state.accept);
  const dispatch = useDispatch();
  
  const logIn = (e) =>{
    onSubmit(e,loginErr,dispatch);
  }

  
  return (
    <div className="main__inner">
    <form  className={"sign__form"} onSubmit={e => logIn(e)}>
        <TextField
          className={"input"}
          label="Name"
          name="login"
        />
        <TextField
          className={'input'}
          label="Password"
          name="password"
          type="password"
        />
        <Button
          className={"signIn"}
          variant="contained"
          type="submit"
          color="primary"
        >
          Sign In
        </Button>
        {accept === true ? <Redirect push to="/list" /> : loginErr}
    </form>
    </div>
  );
}
