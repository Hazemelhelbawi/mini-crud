import style from "./styles.module.css";
const Button = ({ children, hambozo, onClick }) => {
  return (
    <>
      <button style={hambozo} onClick={onClick} className={style.button}>
        {children}
      </button>
    </>
  );
};

export default Button;
