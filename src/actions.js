export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCSESS = "LOGIN_SUCSESS";
export const LOG_OUT = "LOG_OUT";
export const PUSH_TABLE = "PUSH_TABLE";
export const DATA_ERROR = "DATA_ERROR";
export const PUSH_ROW = "PUSH_ROW";

export const loginSucsess = user => ({
  type: LOGIN_SUCSESS,
  userName: user,
  accept: true
});

export const loginError = error => ({
  type: LOGIN_ERROR,
  loginError: error
});
export const logOut = () => ({
  type: LOG_OUT
});
export const pushTable = table => ({
  type: PUSH_TABLE,
  mainTable: table
});
export const pushRow = (table, id) => ({
  type: PUSH_ROW,
  newTable: table,
  id: id
});
export const dbErr = error => ({
  type: DATA_ERROR,
  dbError: error
});

export const saveChange = (e, id) => {
  e.preventDefault();
  const data = e.target;
  let obj = {
    [id]: {
      id: id,
      country: data.country.value,
      region: data.region.value,
      city: data.city.value,
      street: data.street.value,
      build: data.build.value,
      notes: data.build.value
    }
  };

  fetch("../fakeBackEnd/file.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  })
    .then(response => {
      //Обработка ответа от сервера и работа с данными будет где-то тут
      alert(
        "Успешно сохранено(Было бы, но серверной части нет, по этому, запрос отправлен, а ответ 404)"
      );
      console.log(response); //консолим ответ
      window.history.go(-1); //для наглядности добавил возврат к таблице
    })
    .catch(error => console.error(error));
};

export const onSubmit = (e,loginErr,dispatch) => {
  console.log(e.target.login);
  e.preventDefault();
  const user = e.target.login.value;
  const password = e.target.password.value;
  fetch(`./fakeBackEnd/users/${user}.json`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  }).then(response => {
    if (response.ok) {
      if (loginErr !== "") {
        dispatch(loginError(""));
      }
      response
        .json()
        .then(json => {
          if (json.username === user && json.password === password) {
            dispatch(loginSucsess(user));
          } else {
            dispatch(loginError("Incorrect Password!"));
          }
        })
        .catch(err => {
          console.log("Error Reading data " + err);
        });
    } else {
      dispatch(loginError("Login not found!"));
    }
  });
};
