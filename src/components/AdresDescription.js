import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { saveChange } from "../actions";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
  input: {
    paddingBottom: 15
  },
  signIn: {
    paddingTop: 10,
    marginBottom: 30
  }
});

export default function AdresDescription() {
  const { id } = useParams();
  const row = useSelector(state => state.mainTable[id]);
  const table = useSelector(state => state.mainTable);
  const classes = useStyles();

  let countries = [];
  let regions = [];
  let citis = [];
  let streets = [];
  for (let [k, object] of Object.entries(table)) {
    countries[k] = { title: object.country };
    regions[k] = { title: object.region };
    citis[k] = { title: object.city };
    streets[k] = { title: object.street };
  }

  for (var q = 1, i = 1; q < countries.length; q++) {
    if (countries[q].title !== countries[q - 1].title) {
      countries[i++] = countries[q];
    }
  }
  countries.length = i;

  const saveCh = (e, id) => {
    saveChange(e, id);
  };

  const visible = () => {
    const button = document.querySelector(".edit__button");
    const form = document.querySelector(".address__form");
    if (!document.querySelector(".hidden")) {
      form.style.opacity = "1";
      form.style.pointerEvents = "unset";
      button.classList.add("hidden");
    } else {
      form.style.opacity = ".3";
      form.style.pointerEvents = "none";
      button.classList.remove("hidden");
    }
  };

  if (!row || !id) {
    return <Redirect to="/" />;
  }
  return (
    <div className="main__addressDIv">
      <div className="address__card">
        <Grid
          style={{
            width: 230,
            marginBottom: 30,
            borderRadius: 10,
            border: "1px solid black"
          }}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <div className="card__item">{row.country}</div>
          <div className="card__item">{row.region}</div>
          <div className="card__item">{row.city}</div>
          <div className="card__item">{row.street}</div>
          <div className="card__item">{row.build}</div>
          <div className="card__item">{row.notes}</div>
        </Grid>
      </div>
      <div className="edit__form">
        <Fab
          className="edit__button"
          color="secondary"
          aria-label="edit"
          onClick={() => visible()}
        >
          <EditIcon />
        </Fab>
        <div className="address__form">
          <h2>Редактирование</h2>
          <form onSubmit={e => saveCh(e, id)}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Autocomplete
                freeSolo
                id="free-solo-demo"
                options={countries}
                getOptionLabel={option => option.title}
                style={{ width: 230, display: "grid" }}
                renderInput={params => (
                  <TextField
                    {...params}
                    className={classes.input}
                    id="standard-basic"
                    label="Страна"
                    name="country"
                  />
                )}
              />

              <Autocomplete
                freeSolo
                id="free-solo-demo"
                options={regions}
                getOptionLabel={option => option.title}
                style={{ width: 230, display: "grid" }}
                renderInput={params => (
                  <TextField
                    {...params}
                    className={classes.input}
                    id="standard-basic"
                    label="Регион"
                    name="region"
                  />
                )}
              />
              <Autocomplete
                freeSolo
                id="free-solo-demo"
                options={citis}
                getOptionLabel={option => option.title}
                style={{ width: 230, display: "grid" }}
                renderInput={params => (
                  <TextField
                    {...params}
                    className={classes.input}
                    id="standard-basic"
                    label="Город"
                    name="city"
                  />
                )}
              />
              <Autocomplete
                freeSolo
                id="free-solo-demo"
                options={streets}
                getOptionLabel={option => option.title}
                style={{ width: 230, display: "grid" }}
                renderInput={params => (
                  <TextField
                    {...params}
                    className={classes.input}
                    id="standard-basic"
                    label="Улица"
                    name="street"
                
                  />
                )}
              />
              <TextField
                className={classes.input}
                id="standard-basic"
                label="Дом/корпус/квартира"
                name="build"
                style={{ width: 230, display: "grid" }}
              />
              <TextField
                className={classes.input}
                id="outlined-basic"
                label="Примечание"
                name="notes"
                variant="outlined"
                style={{ width: 230, display: "grid" }}
              />
              <Button
                className={classes.signIn}
                variant="contained"
                type="submit"
                color="primary"
              >
                Сохранить
              </Button>
            </Grid>
          </form>
        </div>
      </div>
    </div>
  );
}
