import "./styles.css";
import React, { useRef, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
import AuthContext from "./auth-context";

function AuthForm() {
  // const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  //{this just toggles login mode}
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    // console.log(enteredEmail, enteredPassword);

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD4IDg0EDEf1UlSv1QXg13l-D_3B5Jhy70";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD4IDg0EDEf1UlSv1QXg13l-D_3B5Jhy70";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
         // alert("login/signup successful");
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }

            throw new Error(errorMessage);
          });
        }
      }) 
      .then((data) => {
        // console.log(data);
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString());
        // history.replace('/');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className="customForm ">
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form className="customInput" onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Your Email</label>
          <input
            className="form-control"
            type="email"
            id="email"
            required
            ref={emailInputRef}
          />
        </div>
        <div>
          <label htmlFor="exampleInputPassword1">Your Password</label>
          <input
            className="form-control"
            type="password"
            id="exampleInputPassword1"
            required
            ref={passwordInputRef}
          />
        </div>
        <div>
          {!isLoading && (
            <button className="btn btn-primary customButton">
              {isLogin ? "Login" : "Create Account"}
            </button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            className="btn btn-primary customButton"
            type="button"
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
