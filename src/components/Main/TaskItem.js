import styles from "./TaskItem.module.css";

const TaskItem = (props) => {
  return (
    <li>
      <div className={styles.task}>
        <div className={styles["task__main"]}>
          <div>
            <p className={styles["task__title"]}>{props.title}</p>
            <p className={styles["task__description"]}>{props.description}</p>
          </div>
          <div>
            <button className={styles["task__delete-btn"]} onClick={() => props.onDelete(props.id)}>Delete</button>
          </div>
        </div>
        <div className={styles["task__dates"]}>
          <p className={styles["task__deadline"]}>{props.deadline}</p>
          <p className={styles["task__created-at"]}>{props.createdAt}</p>
        </div>
      </div>
    </li>
  );
};

export default TaskItem;