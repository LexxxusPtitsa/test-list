import React from "react";
import "./App.css";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import MainTable from "./components/MainTable";
import Header from "./components/Header";
import AdresDescription from "./components/AdresDescription";

function App() {

  return (
   
    <BrowserRouter>
    <div className="root__inner">
    {/* <Router> */}
    {console.log(window.location.href)}
      <Header />
      <Route exact path="/">
        <LoginForm />
      </Route>
      {/* </Router> */}
      <Route path="/list">
        <MainTable />
      </Route>
      <Route path="/address/:id">
        <AdresDescription />
      </Route>
      </div>
     </BrowserRouter>
    
  );
}

export default App;
