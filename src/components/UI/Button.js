import styles from "./Button.module.css";

const Button = (props) => {
  const clickHandler = () => {
    
  };

  return <button className={styles.button} onClick={clickHandler} type={props.type}>{props.text}</button>
};

export default Button;
