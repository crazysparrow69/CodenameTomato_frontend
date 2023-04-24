import styles from "./RegistrationForm.module.css";
import Button from "../UI/Button";
import useHttp from "../../hooks/use-http";
import { useCallback, useReducer } from "react";

const usernameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.value,
      isTouched: state.isTouched,
      isValid: state.isTouched ? action.value.trim().length > 3 : true,
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isTouched: true,
      isValid: state.value.trim().length > 3,
    };
  }
  return { value: "", isTouched: false, isValid: true };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.value,
      isTouched: state.isTouched,
      isValid: state.isTouched ? action.value.trim().length > 5 : true,
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isTouched: true,
      isValid: state.value.trim().length > 5,
    };
  }
  return { value: "", isTouched: false, isValid: true };
};

const repassReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.value,
      isTouched: state.isTouched,
      isValid: state.isTouched ? action.value === action.password : true,
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isTouched: true,
      isValid: state.value.trim().length > 5,
    };
  }
  return { value: "", isTouched: false, isValid: true };
};

const RegistrationForm = () => {
  const [usernameState, dispatchUsername] = useReducer(usernameReducer, {
    value: "",
    isTouched: false,
    isValid: true,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isTouched: false,
    isValid: true,
  });

  const [repassState, dispatchRepass] = useReducer(repassReducer, {
    value: "",
    isTouched: false,
    isValid: true,
  });

  const registerRequestCallback = useCallback((data) => {
    localStorage.setItem("token", data.token);
    document.location.reload();
  }, []);

  const {
    isLoading: isRegisterLoading,
    error: registerError,
    sendRequest: registerRequest,
  } = useHttp(registerRequestCallback);

  const usernameChangeHandler = (event) => {
    dispatchUsername({ type: "USER_INPUT", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", value: event.target.value });
  };

  const repassChangeHandler = (event) => {
    dispatchRepass({
      type: "USER_INPUT",
      value: event.target.value,
      password: passwordState.value,
    });
  };

  const usernameBlurHandler = () => {
    dispatchUsername({ type: "INPUT_BLUR" });
  };

  const passwordBlurHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const repassBlurHandler = () => {
    dispatchRepass({ type: "INPUT_BLUR", password: passwordState.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (usernameState.value === "") {
      dispatchUsername({ type: "INPUT_BLUR" });
      return;
    } else if (passwordState.value === "") {
      dispatchPassword({ type: "INPUT_BLUR" });
      return;
    } else if (repassState.value === "") {
      dispatchRepass({ type: "INPUT_BLUR" });
      return;
    }

    registerRequest({
      url: "http://localhost:3500/register",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        username: usernameState.value,
        password: passwordState.value,
        repass: repassState.value
      },
    });
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.control}>
        <label>Username</label>
        <input
          type="text"
          onChange={usernameChangeHandler}
          onBlur={usernameBlurHandler}
          autoComplete="enter username"
        ></input>
        {!usernameState.isValid && <p>Invalid input</p>}
      </div>
      <div className={styles.control}>
        <label>Password</label>
        <input
          type="password"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          autoComplete="enter password"
        ></input>
        {!passwordState.isValid && <p>Invalid input</p>}
      </div>
      <div className={styles.control}>
        <label>Repeat password</label>
        <input
          type="password"
          onChange={repassChangeHandler}
          onBlur={repassBlurHandler}
          autoComplete="repeat your password"
        ></input>
        {!repassState.isValid && <p>Passwords are not the same</p>}
      </div>
      {registerError && <div className={styles.error}>
          {registerError}
        </div>}
      <div className={styles.actions}>
        <Button text="Register" type="submit" />
      </div>
    </form>
  );
};

export default RegistrationForm;
