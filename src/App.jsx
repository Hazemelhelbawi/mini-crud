import { useEffect, useRef, useState } from "react";
import Container from "./Container/Container";
import UserForm from "./components/Form/UserForm";
import Card from "./components/Card/Card";
import Modal from "./components/Modal/Modal";
import Button from "./components/Button/Button";
import axios from "axios";
import Inputs from "./components/Inputs/Inputs";
function App() {
  // getter , setter in destructing data[] .. hook useState
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const selectUser = useRef({});

  // function handleSearch(id) {
  //   console.log(id);
  //   return users.filter((user) =>
  //     user.name.toLowerCase().includes(id.toLowerCase())
  //   );
  // }
  function handleDelete(id) {
    console.log(id);
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);

    axios
      .delete(`http://localhost:3000/users/${id}`)
      .then((response) => {
        console.log("User deleted successfully!", response);
      })
      .catch((error) => {
        console.error("Error deleting user", error);
      });
  }

  const handleOperationUser = (formData) => {
    if (formData.type === "add") {
      delete formData.type;
      setUsers([...users, formData]);

      // add new users to backend

      axios
        .post(`http://localhost:3000/users`, formData)
        .then((response) => {
          console.log("User added successfully!", response);
        })
        .catch((error) => {
          console.error("Error adding user", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      delete formData.type;
      const updatedUser = users.map((el) => {
        if (el.id === formData.id) {
          return { ...el, ...formData };
        }
        return el;
      });
      setUsers(updatedUser);

      // update user to backend using patch not put coz put take the data that will change

      axios
        .patch(`http://localhost:3000/users/${formData.id}`, formData)
        .then((response) => {
          console.log("User updated successfully!", response);
        })
        .catch((error) => {
          console.error("Error updating user", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    modalHandler();
  };

  function modalHandler() {
    setShowModal(!showModal);
  }
  function selectHandler(id) {
    selectUser.current = users.find((user) => user.id === id);
    modalHandler();
  }

  useEffect(() => {
    if (!showModal) {
      selectUser.current = {};
    }
  }, [showModal]);

  // fetch data from backend use case then and catch

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3000/users`)
  //     .then((res) => {
  //       setUsers(res.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching users: ", error);
  //     });
  // }, []);

  // fetch data from backend use async await with try and catch
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3000/users`);
        setUsers(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users: ", error);
        setLoading(false);
      }
    };
    getData();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Container style={{ backgroundColor: "#fae378" }}>
        <Button
          onClick={modalHandler}
          // onClick={() => {
          //   selectUser.current = {}; // Clear previous user data
          //   modalHandler();
          // }}
          hambozo={{ color: "white", backgroundColor: "darkblue" }}
        >
          Add New User
        </Button>
        <h2>Users Data</h2>

        <Inputs
          type="search"
          value={search}
          placeholder="Search by name..."
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* <Inputs
          type="search"
          onChange={() => {
            handleSearch();
          }}
        /> */}
        <Modal showModal={showModal} modalHandler={modalHandler}>
          <UserForm
            userOperationHandler={handleOperationUser}
            selectUser={selectUser}
          />
        </Modal>
        {loading ? (
          <span>loading .....</span>
        ) : (
          filteredUsers.map((user) => (
            <Card
              key={user.id}
              {...user}
              handleDelete={handleDelete}
              selectHandler={selectHandler}
            />
          ))
        )}
      </Container>
    </>
  );
}

export default App;
