import styles from "./Tasks.module.css";
import Button from "../UI/Button";
import TaskItem from "./TaskItem";
import AppContext from "../../context/app-context";
import { useContext } from "react";

const Tasks = () => {
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

  return (
    <div className={styles.tasks}>
      <div className={styles["tasks__create"]}>
        <Button text="Create new task" />
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