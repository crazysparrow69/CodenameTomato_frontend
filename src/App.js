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
  const [avatar, setAvatar] = useState(null);

  const userRequestCallback = useCallback((data) => {
    console.log(data);
    setUser(data);
  }, []);

  const taskRequestCallback = useCallback((data) => {
    console.log(data.foundTasks);
    setTasks(data.foundTasks);
  }, []);

  const avatarRequestCallback = useCallback((data) => {
    console.log(data[0]);
    setAvatar(data[0].file);
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
  const {
    isLoading: isAvatarLoading,
    error: avatarError,
    sendRequest: fetchAvatar,
  } = useHttp(avatarRequestCallback);

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
      fetchAvatar({
        url: "http://localhost:3500/image",
        headers: {
          authorization: `Bearer ${token}`
        }
      })

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
          avatar: avatar
        }}
      >
        <Header />
        <Main />
      </AppContext.Provider>
    </Wrapper>
  );
}

export default App;
