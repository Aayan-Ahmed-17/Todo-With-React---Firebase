import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../configs/firebaseConfig";
// importing to get the data from collection
import { where, query, collection, getDocs } from "firebase/firestore";
import AddTodo from "../components/AddTodo";

const Todo = () => {
  /************* Tasks *******************
   * enter todo field and get value
   * show to in a list
   * create todo button
   * edit and del todo
   */
  const todoInput = useRef();
  const [todo, setTodo] = useState([]);
  const [addCompo, setAddCompo] = useState(true);
  const [editCompo, setEditCompo] = useState(false);
  const [checkedItem, setCheckedItem] = useState(false);
  const [inputDefaultVal, setInputDefaultVal] = useState("");

  const navigate = useNavigate();

  // for authn check if user login or not
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        navigate("/todo");
        getDataFromFireStore();
      } else {
        navigate("/login");
      }
    });
  }, []);

  //* to get data with an id
  async function getDataFromFireStore() {
    try {
      // if (auth.currentUser.uid) {
      const q = query(
        collection(db, "todo"),
        where("user", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const tempTodoArr = [];
      querySnapshot.forEach((doc) => {
        tempTodoArr.push(doc.data().title);
      });
      setTodo(tempTodoArr);
    } catch (error) {
      console.warn(error);
    }
  }

  function handleCheckox() {
    setCheckedItem(!checkedItem);
  }

  function showAddCompo() {
    setAddCompo(true);
  }

  // TO EDIT A TODO
  function editTodo(item) {
    setEditCompo(true);
    setInputDefaultVal(item);
    console.log("todoUpdated");
  }

  return (
    <>
      {addCompo ? (
        <AddTodo
          todoInput={todoInput}
          todo={todo}
          setTodo={setTodo}
          setShowCompo={setAddCompo}
          name={"New Todo"}
          buttonText={"Apply"}
        />
      ) : (
        editCompo && (
          <AddTodo
            todoInput={todoInput}
            todo={todo}
            setTodo={setTodo}
            setShowCompo={setEditCompo}
            name={"Edit Todo"}
            buttonText={"Save"}
            inputVal={inputDefaultVal}
          />
        )
      )}

      {!addCompo && !editCompo && (
        <div className="grid w-4/5  mx-auto">
          <div>
            <h2 className="text-center font-semibold text-2xl mt-12">
              TODO LIST
            </h2>

            {todo && (
              <ul className="grid gap-2 w-4/5 mx-auto px-4 mt-3">
                {todo.map((e, i) => (
                  <li key={i} className="border-b-2 leading-6 py-2 flex justify-between group px-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name={`task${i + 1}`}
                        onChange={handleCheckox}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />

                      <span className={`ml-2 ${checkedItem && "line-through"}`}>
                        {e}
                      </span>
                    </label>
                      <button type="button" className="bg-[#ffc30d] text-xs py-1 px-2 rounded-md hidden group-hover:inline-flex" onClick={() => editTodo(e , i)}>EDIT</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            onClick={showAddCompo}
            className="bg-[#6C63FF] text-[#F7F7F7] rounded-sm justify-self-end py-2 px-4 text-2xl box-content mt-10"
          >
            +
          </button>
        </div>
      )}
    </>
  );
};

export default Todo;
