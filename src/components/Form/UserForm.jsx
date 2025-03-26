import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import Inputs from "../Inputs/Inputs";

const UserForm = ({ id, userOperationHandler, selectUser }) => {
  console.log(selectUser);

  const [form, setForm] = useState({
    name: "",
    age: "",
    location: "",
    nationality: "",
  });

  // function onSubmitHandler(e) {
  //   e.preventDefault();
  //   const newUser = {
  //     id: crypto.randomUUID(),
  //     name: form.name,
  //     age: form.age,
  //     location: form.location,
  //     nationality: form.nationality,
  //   };
  //   userOperationHandler(newUser);

  //   setForm({
  //     name: "",
  //     age: "",
  //     location: "",
  //     nationality: "",
  //   });
  // }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let userData = {};
    if (form.id) {
      userData = { ...form, type: "edit" };
    } else {
      const id = crypto.randomUUID();
      // const id = Math.floor(Math.random() * 100);
      userData = { ...form, type: "add", id: id };
    }
    userOperationHandler(userData);
    setForm({
      name: "",
      age: "",
      location: "",
      nationality: "",
    });
  };

  function inputHandler(e) {
    const inputKey = e.target.name;
    const inputValue = e.target.value;
    setForm((prevForm) => ({ ...prevForm, [inputKey]: inputValue }));
  }

  useEffect(() => {
    if (selectUser.current && Object.keys(selectUser.current).length > 0) {
      setForm({ ...selectUser.current });
      return () => {
        setForm({ name: "", age: "", location: "", nationality: "" });
      };
    }
  }, [selectUser]);

  // useEffect(() => {
  //   if (selectUser.current && Object.keys(selectUser.current).length > 0) {
  //     // Edit mode
  //     setForm({ ...selectUser.current });
  //   } else {
  //     // Add mode — reset form
  //     setForm({
  //       name: "",
  //       age: "",
  //       location: "",
  //       nationality: "",
  //     });
  //   }
  // }, [selectUser]);

  return (
    <div>
      <h3>Add User</h3>

      <form onSubmit={onSubmitHandler}>
        <Inputs
          name="name"
          type="text"
          value={form.name}
          placeholder="Name"
          onChange={inputHandler}
        />
        <Inputs
          name="age"
          type="number"
          value={form.age}
          placeholder="Age"
          onChange={inputHandler}
        />
        <Inputs
          name="location"
          type="text"
          value={form.location}
          placeholder="location"
          onChange={inputHandler}
        />
        <Inputs
          name="nationality"
          type="text"
          value={form.nationality}
          placeholder="Nationality"
          onChange={inputHandler}
        />
        <Button
          hambozo={{ color: "white", backgroundColor: "blue" }}
          onClick={() => userOperationHandler(id)}
        >
          Add
        </Button>
      </form>
    </div>
  );
};

export default UserForm;
