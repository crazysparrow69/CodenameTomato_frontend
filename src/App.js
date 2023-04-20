import Wrapper from "./components/UI/Wrapper";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { useCallback, useEffect, useState } from "react";
import useHttp from "./hooks/use-http";
import AppContext from "./context/app-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);

  localStorage.setItem(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNiZjRlYTYyMTZiYjY2YjJmNzIzMzUiLCJpYXQiOjE2ODE3MzEzMjMsImV4cCI6MTY4NDMyMzMyM30.hvdA_KB5wlJVrxk6xUZWFraiwwjghqODJU7U6J5BHfA"
  );

  const userRequestCallback = useCallback((data) => {
    console.log(data);
    setUser(data);
  }, []);

  const taskRequestCallback = useCallback((data) => {
    console.log(data.foundTasks);
    setTasks(data.foundTasks);
  }, []);

  const {
    isLoading: isUserLoading,
    error: userError,
    sendRequest: fetchUser,
  } = useHttp(userRequestCallback);
  const {
    isLoading: areTasksLoading,
    error: taskError,
    sendRequest: fetchTasks,
  } = useHttp(taskRequestCallback);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchUser({
        url: "http://localhost:3500/auth/me",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      fetchTasks({
        url: "http://localhost:3500/task",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (!userError) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  return (
    <Wrapper>
      <AppContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          userData: user,
          tasks: tasks,
        }}
      >
        <Header />
        <Main />
      </AppContext.Provider>
    </Wrapper>
  );
}

export default App;
