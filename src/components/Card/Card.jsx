import Button from "../Button/Button";

const Card = ({
  id,
  name,
  age,
  gender,
  location,
  nationality,
  handleDelete,
  selectHandler,
}) => {
  return (
    <div className="card" style={{ position: "relative" }}>
      <p style={{ fontWeight: "bold", color: "red" }}>Name : {name}</p>
      <p>Age : {age}</p>
      <p>Gender : {gender}</p>
      <p>Location : {location}</p>
      <p>Nationality : {nationality}</p>
      <Button
        hambozo={{
          color: "white",
          backgroundColor: "red",
          position: "absolute",
          right: "10px",
          top: "10px",
        }}
        onClick={() => handleDelete(id)}
      >
        Delete
      </Button>
      <Button
        hambozo={{
          color: "white",
          backgroundColor: "green",
          position: "absolute",
          right: "10px",
          top: "50px",
        }}
        onClick={() => selectHandler(id)}
      >
        Edit
      </Button>
    </div>
  );
};

export default Card;
