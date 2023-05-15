import {  useState } from "react";

import { FormControl, Button, Form } from "react-bootstrap";
import trash from "./trash.svg";
import edit from "./edit.svg";
import save from "./save.svg";
import { v4 as uuidv4 } from "uuid";
import { isEditable } from "@testing-library/user-event/dist/utils";
function App() {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState("");
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    setTodoList((prevTodoList) => [
      ...prevTodoList,
      { id: uuidv4(), todo: newTodo, isEditable: false, isCompleted: false },
    ]);
    setNewTodo("");
  };
  const completedTodo = (id) => {
    setTodoList((prevTodoList) =>
      prevTodoList.map((todoItem) =>
        todoItem.id === id
          ? { ...todoItem, isCompleted: !todoItem.isCompleted }
          : todoItem
      )
    );
  };

  const editTodo = (id,oldTodo) => {
    setTodoList((prevTodoList) =>
      prevTodoList.map((todoItem) =>
        todoItem.id === id
          ? { ...todoItem, isEditable: !todoItem.isEditable }
          : todoItem
      )
    );
   
    setTodo(oldTodo)
  };
  const saveTodo=(id)=>{
    setTodoList(prevTodoList=>prevTodoList.map(todoItem=>todoItem.id=== id ?{...todoItem,isEditable:!isEditable,todo:todo}:todoItem))
  }

  const deleteTodo=(id) =>{
    setTodoList(prevTodoList=>prevTodoList.filter(todoItem=>todoItem.id!==id))
  }
  
 

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <h1 className="mt-5">Todo List</h1>
      <div className="d-flex w-50 mt-3 ">
        <FormControl
          className="w-75"
          placeholder="Todo Input"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button className="ms-5 " onClick={() => addTodo()}>
          Add Todo
        </Button>
      </div>
      <div className="mt-5 w-75">
        {todoList.map((todoItem) => (
          <div key={todoItem.id} className="d-flex justify-content-between mt-2 ">
            <div className="d-flex w-75">
              <Form.Check
                type="checkbox"
                className="me-2"
                value={todoItem.isCompleted}
                onChange={() => completedTodo(todoItem.id)}
              />
              {!todoItem.isEditable ? (
                <label>{todoItem.todo}</label>
              ) : (
                <FormControl
                  className="w-75"
                
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
                />
              )}
            </div>
            <div>
              {!todoItem.isEditable ? (
                <img
                  width={25}
                  height={25}
                  style={{ cursor: "pointer" }}
                  className="me-2"
                  onClick={() => editTodo(todoItem.id,todoItem.todo)}
                  src={edit}
                  alt=""
                />
              ) : (
                <img
                  width={25}
                  height={25}
                  style={{ cursor: "pointer" }}
                  className="me-2"
                  onClick={ ()=>saveTodo(todoItem.id)
                  }
                  src={save}
                  alt=""
                />
              )}
              <img
                width={25}
                height={25}
                style={{ cursor: "pointer" }}
                className="me-2"
                onClick={()=> deleteTodo(todoItem.id)}
                src={trash}
                alt=""
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
