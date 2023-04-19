import Wrapper from "./components/UI/Wrapper";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { useCallback, useEffect, useState } from "react";
import useHttp from "./hooks/use-http";
import AppContext from "./context/app-context";

function App() {
  const [tasks, setTasks] = useState([]);

  localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNiZjRlYTYyMTZiYjY2YjJmNzIzMzUiLCJpYXQiOjE2ODE3MzEzMjMsImV4cCI6MTY4NDMyMzMyM30.hvdA_KB5wlJVrxk6xUZWFraiwwjghqODJU7U6J5BHfA");

  const requestCallback = useCallback((data) => {
    console.log(data.foundTasks);
    setTasks(data.foundTasks);
  }, []);

  const [isLoading, error, sendRequest] = useHttp(requestCallback);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      sendRequest({
        url: "http://localhost:3500/task",
        headers: {
          authorization:
            `Bearer ${token}`,
        },
      });
    }
  }, []);

  return (
    <Wrapper>
      <AppContext.Provider value={{
        isLoggedIn: false,
        userData: {},
        tasks: tasks
      }}>
        <Header/>
        <Main/>
      </AppContext.Provider>
    </Wrapper>
  );
}

export default App;
