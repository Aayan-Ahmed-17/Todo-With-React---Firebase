import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../configs/firebaseConfig";
import AddTodo from "../components/AddTodo";

const Todo = () => {
  /************* Tasks *******************
   * enter todo field and get value
   * show to in a list
   * create todo button
   * edit and del todo
   */
  const todoInput = useRef();
  const [todo, setTodo] = useState(null);

  const navigate = useNavigate();

  // for authn check if user login or not
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(user);
        navigate("/todo");
      } else {
        navigate("/login");
      }
    });
  }, []);

  return (
    <>
      {/* <AddTodo todoInputValue={todoInput} preTodo={todo} todoArr={setTodo} /> */}
      <div>
        <h2 className="text-center font-semibold text-2xl mt-12">TODO LIST</h2>
        <ul className="grid gap-2 w-3/6 mx-auto px-4 mt-3">
          <li className="border-b-2 leading-6 py-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="option1"
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2">Option 1</span>
            </label>
          </li>
          <li className="border-b-2 leading-6 py-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="option1"
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2">Option 2</span>
            </label>
          </li>
          <li className="border-b-2 leading-6 py-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="option1"
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2">Option 3</span>
            </label>
          </li>
          <li className="border-b-2 leading-6 py-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="option1"
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2">Option 4</span>
            </label>
          </li>
          
          {/* <input type="checkbox" defaultChecked className="checkbox" /> */}
        </ul>
      </div>
    </>
  );
};

export default Todo;
