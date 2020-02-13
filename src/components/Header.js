import React from "react";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";


export default function Header() {
  const name = useSelector(state => state.userName);
  const accept = useSelector(state => state.accept);
  const dispatch = useDispatch();
  let but = "";
  
  if (accept === true) {
    but = (
      <Button
        variant="contained"
        // color="secondary"
        onClick={e => {
          e.preventDefault();
          dispatch({ type: "LOG_OUT"});
          return <Redirect exact to="/" />;
        }}
      >
        Выйти
      </Button>
    );
  }
  
  return (
    <div className={"header"}>
      <div className={"headerInner"}>
        <div>Привет {name}!</div>
        {but}
      </div>
    </div>
  );
}
