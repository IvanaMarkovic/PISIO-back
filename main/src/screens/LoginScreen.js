import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import style from "../styles/Login.module.css";

const LoginScreen = () => {
  const history = useHistory();
  const [signInIndicator, setsignInIndicator] = useState(true);
  let username = "";
  let password = "";
  let fullName = "";
  let email = "";

  const LoginComponent = () => {
    return (
      <div>
        <div>
          <h2>username:</h2>
          <input
            onChange={(input) => (username = input.target.value)}
            type="text"
          ></input>
        </div>
        <div>
          <h2>password:</h2>
          <input
            onChange={(input) => (password = input.target.value)}
            type="password"
          ></input>
        </div>
        <button onClick={() => fetchLoginApi(username, password, history)}>
          Log in
        </button>
        <div>
          {" "}
          <u onClick={() => setsignInIndicator(!signInIndicator)}>
            Registruj se
          </u>{" "}
        </div>
      </div>
    );
  };

  const RegisterComponent = () => {
    return (
      <div>
        <div>
          <h2>fullname:</h2>
          <input
            onChange={(input) => (fullName = input.target.value)}
            type="text"
          ></input>
        </div>
        <div>
          <h2>username:</h2>
          <input
            onChange={(input) => (username = input.target.value)}
            type="text"
          ></input>
        </div>
        <div>
          <h2>password:</h2>
          <input
            onChange={(input) => (password = input.target.value)}
            type="password"
          ></input>
        </div>
        <div>
          <h2>email:</h2>
          <input
            onChange={(input) => (email = input.target.value)}
            type="text"
          ></input>
        </div>
        <button
          onClick={() =>
            fetchRegisterApi(username, password, fullName, email, history)
          }
        >
          Register
        </button>
        <div>
          {" "}
          <u onClick={() => setsignInIndicator(!signInIndicator)}>Prijavi se</u>
        </div>
      </div>
    );
  };

  const fetchLoginApi = (username, password, history) => {
    console.log(String(username) + "    " + password.toString());
    fetch("http://localhost:3447/member/login", {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      // method: "GET",
      method: "POST",
      body: JSON.stringify({
        username: username.toString(),
        password: password.toString(),
      }),
      // body: JSON.stringify({ password: "test123", username: "test" }), // body data type must match "Content-Type" header
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        localStorage.clear();
        localStorage.setItem("token", data.jwt);

        // history.push("/home");
        // setTest(data[0].title);
        return data;
      })
      .then((value) => {
        // const { token } = value;
        // localStorage.setItem("token", token);
        // // localStorage.setItem("token", { data });
        // // var token = localStorage.getItem("token");

        history.push("/home");
      });
  };

  const fetchRegisterApi = (username, password, fullName, email, history) => {
    console.log(String(username) + "    " + password.toString());
    fetch("http://localhost:3447/member/register", {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      // method: "GET",
      method: "POST",
      body: JSON.stringify({
        username: username.toString(),
        password: password.toString(),
        fullName: fullName.toString(),
        email: email.toString(),
      }),
      // body: JSON.stringify({ password: "test123", username: "test" }), // body data type must match "Content-Type" header
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);

        history.push("/home");
        // setTest(data[0].title);
      });
  };

  useEffect(() => {}, []);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {signInIndicator ? <LoginComponent /> : <RegisterComponent />}
    </div>
  );
};

export default LoginScreen;
