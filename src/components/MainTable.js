import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import {pushTable, dbErr} from "../actions";


function createData(id, country, region, city, street, build, notes) {
  return { id, country, region, city, street, build, notes };
}

let rows = [createData(null, null, null, null, null, null, null)];

export default function MainTable() {
  const mainTable = useSelector(state => state.mainTable);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({ country: ""});
  const [data, setData] = useState();
  const [notFound, setNotFound] = useState("");
  const accept = useSelector(state => state.accept);
  let history = useHistory();
  const goToAdres = id => {
    history.push("/address/" + id);
  };
  const Filter = e => {
    e.preventDefault();
    rows = [];
    for (let [k, object] of Object.entries(data)) {
      if(object.country.indexOf(e.target.value) === 0 || object.country.indexOf(e.target.value)===1){
        rows[k] = createData(
          object.id,
          object.country,
          object.region,
          object.city,
          object.street,
          object.build,
          object.notes
        );
      }
    }
    if(rows.length === 0){
      setNotFound("Такой страны нет в списке");
    }else{
      setNotFound("");
    }
    setFilter({
      country: e.target.value}
    )
  };

  if (accept === false) {
    return <Redirect to="/" />;
  }

  if (mainTable.null) {
    fetch(`./fakeBackEnd/adresses/Adresses.json`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(response => {
      if (response.ok) {
        response
          .json()
          .then(json => {
            for (let [k, object] of Object.entries(json)) {
              rows[k] = createData(
                object.id,
                object.country,
                object.region,
                object.city,
                object.street,
                object.build,
                object.notes
              );
            }
            setData(rows);
            //EDIT THIS CODE
            dispatch(pushTable(rows));
          })
          .catch(err => {
            console.log("Error Reading data " + err);
          });
      } else {
        console.log("Error Reading data ");
        dispatch(dbErr("Database not found!") );
      }
    });
  }
  return (
    <div className={"main__tableDiv"}>
      <div className={"tableDiv"}>
      <TextField
          className={"inputFilter"}
          id="outlined-search"  
          type="search" 
          label="Введите страну"
          variant="outlined"
          name="country"
          value={filter.country}
          onChange={e => Filter(e)}
        />
        <TableContainer className={"table"} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Страна</TableCell>
                <TableCell align="right">Регион</TableCell>
                <TableCell align="right">Населенный пункт</TableCell>
                <TableCell align="right">Улица</TableCell>
                <TableCell align="right">Дом/квартира/корпус</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow
                  key={row.id}
                  className="selectRow"
                  onClick={() => goToAdres(row.id)}
                  id={"adresRow" + row.id}
                >
                  <TableCell component="th" scope="row">
                    {row.country}
                  </TableCell>
                  <TableCell align="right">{row.region}</TableCell>
                  <TableCell align="right">{row.city}</TableCell>
                  <TableCell align="right">{row.street}</TableCell>
                  <TableCell align="right">{row.build}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {notFound}
      </div>
    </div>
  );
}
