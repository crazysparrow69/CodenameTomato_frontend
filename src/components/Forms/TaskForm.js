import styles from "./TaskForm.module.css";
import Button from "../UI/Button";
import useHttp from "../../hooks/use-http";
import { useCallback, useReducer } from "react";

const titleReducer = (state, action) => {
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

const descriptionReducer = (state, action) => {
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

const deadlineReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.value,
      isTouched: state.isTouched,
      isValid: state.isTouched ? action.value !== "" : true,
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isTouched: true,
      isValid: action.value !== "",
    };
  }
  return { value: "", isTouched: false, isValid: true };
};

const TaskForm = () => {
  const [titleState, dispatchtitle] = useReducer(titleReducer, {
    value: "",
    isTouched: false,
    isValid: true,
  });

  const [descriptionState, dispatchdescription] = useReducer(descriptionReducer, {
    value: "",
    isTouched: false,
    isValid: true,
  });

  const [deadlineState, dispatchdeadline] = useReducer(deadlineReducer, {
    value: "",
    isTouched: false,
    isValid: true,
  });

  const taskRequestCallback = useCallback((data) => {
    document.location.reload();
  }, []);

  const {
    isLoading: isTaskLoading,
    error: taskError,
    sendRequest: taskRequest,
  } = useHttp(taskRequestCallback);

  const titleChangeHandler = (event) => {
    dispatchtitle({ type: "USER_INPUT", value: event.target.value });
  };

  const descriptionChangeHandler = (event) => {
    dispatchdescription({ type: "USER_INPUT", value: event.target.value });
  };

  const deadlineChangeHandler = (event) => {
    dispatchdeadline({
      type: "USER_INPUT",
      value: event.target.value,
      description: descriptionState.value,
    });
  };

  const titleBlurHandler = () => {
    dispatchtitle({ type: "INPUT_BLUR" });
  };

  const descriptionBlurHandler = () => {
    dispatchdescription({ type: "INPUT_BLUR" });
  };

  const deadlineBlurHandler = () => {
    dispatchdeadline({ type: "INPUT_BLUR", description: descriptionState.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (titleState.value === "") {
      dispatchtitle({ type: "INPUT_BLUR" });
      return;
    } else if (descriptionState.value === "") {
      dispatchdescription({ type: "INPUT_BLUR" });
      return;
    } else if (deadlineState.value === "") {
      dispatchdeadline({ type: "INPUT_BLUR" });
      return;
    }

    // registerRequest({
    //   url: "http://localhost:3500/register",
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: {
    //     title: titleState.value,
    //     description: descriptionState.value,
    //     deadline: deadlineState.value
    //   },
    // });
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.control}>
        <label>Title</label>
        <input
          type="text"
          onChange={titleChangeHandler}
          onBlur={titleBlurHandler}
          autoComplete="enter title"
        ></input>
        {!titleState.isValid && <p>Invalid input</p>}
      </div>
      <div className={styles.control}>
        <label>Description</label>
        <input
          type="description"
          onChange={descriptionChangeHandler}
          onBlur={descriptionBlurHandler}
          autoComplete="enter description"
        ></input>
        {!descriptionState.isValid && <p>Invalid input</p>}
      </div>
      <div className={styles.control}>
        <label>Chose deadline</label>
        <input
          type="date"
          onChange={deadlineChangeHandler}
          onBlur={deadlineBlurHandler}
        ></input>
        {!deadlineState.isValid && <p>descriptions are not the same</p>}
      </div>
      {taskError && <div className={styles.error}>
          {taskError}
        </div>}
      <div className={styles.actions}>
        <Button text="Create" type="submit" />
      </div>
    </form>
  );
};

export default TaskForm;