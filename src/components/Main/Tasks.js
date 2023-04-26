import styles from "./Tasks.module.css";
import Button from "../UI/Button";
import TaskItem from "./TaskItem";
import AppContext from "../../context/app-context";
import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import TaskForm from "../Forms/TaskForm";
import useHttp from "../../hooks/use-http";

const Tasks = () => {
  const [showModal, setShowModal] = useState(false);

  const deleteTaskCallback = (data) => {
    document.location.reload();
  };

  const {
    isLoading: isTaskLoading,
    error: taskError,
    sendRequest: deleteTaskRequest,
  } = useHttp(deleteTaskCallback);

  const deleteHandler = (taskId) => {
    console.log(taskId);
    deleteTaskRequest({
      url: `http://localhost:3500/task/${taskId}`,
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem("token")
      }
    });
  };

  const ctx = useContext(AppContext);

  const taskItems = ctx.tasks.map((elem) => (
    <TaskItem
      key={elem._id}
      id={elem._id}
      title={elem.title}
      description={elem.description}
      createdAt={elem.createdAt}
      deadline={elem.deadline}
      onDelete={deleteHandler}
    />
  ));

  const createTask = () => {
    setShowModal(true);
  };

  const handleClosing = () => {
    setShowModal(false);
  };

  const content = (
    <>
      {showModal && (
        <Modal onClose={handleClosing}>
          <TaskForm />
        </Modal>
      )}
      <div className={styles["tasks__create"]}>
        <Button text="Create new task" onClick={createTask} />
      </div>
      <div className={styles["tasks__list"]}>
        <ul>{taskItems}</ul>
      </div>
    </>
  );

  return (
    <div className={styles.tasks}>
      {ctx.isLoggedIn ? content : <p className={styles.warning}>You need to login</p>}
    </div>
  );
};

export default Tasks;