import styles from "./Tasks.module.css";
import Button from "../UI/Button";
import TaskItem from "./TaskItem";
import AppContext from "../../context/app-context";
import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import TaskForm from "../Forms/TaskForm";

const Tasks = () => {
  const [showModal, setShowModal] = useState(false);

  const ctx = useContext(AppContext);

  const taskItems = ctx.tasks.map((elem) => (
    <TaskItem
      key={elem._id}
      title={elem.title}
      description={elem.description}
      createdAt={elem.createdAt}
      deadline={elem.deadline}
    />
  ));

  const createTask = () => {
    setShowModal(true);
  };

  const handleClosing = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.tasks}>
      {showModal && <Modal onClose={handleClosing} >
        <TaskForm />
      </Modal>}
      <div className={styles["tasks__create"]}>
        <Button text="Create new task" onClick={createTask} />
      </div>
      <div className={styles["tasks__list"]}>
        <ul>
          {taskItems}
        </ul>
      </div>
    </div>
  );
};

export default Tasks;