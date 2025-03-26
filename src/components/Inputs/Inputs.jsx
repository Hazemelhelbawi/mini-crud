import style from "./styles.module.css";
const Inputs = ({
  type = "text",
  value,
  placeholder,
  onChange,
  hambozo,
  name,
}) => {
  return (
    <>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={style}
        style={hambozo}
      />
    </>
  );
};

export default Inputs;
