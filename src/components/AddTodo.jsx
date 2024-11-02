import React, { useEffect, useRef } from "react";
import { auth, db } from "../configs/firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

const AddTodo = ({ todoInput, setTodo, todo, setShow, show }) => {
  //* push data in todo

  async function insertDataToFireStore() {
    if (todoInput.current.value) {
      try {
        const docRef = await addDoc(collection(db, "todo"), {
          title: todoInput.current.value,
          user: auth.currentUser.uid,
        });

        //pushing vals in todo array || clear input field when open again | change state for hide newTodo compo
        setTodo([...todo, todoInput.current.value]);
        todoInput.current.value = "";
        setShow(!show);

        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  }

  return (
    <div className="max-w-96 min-h-72 mx-auto grid border-2 border-slate-500 rounded-xl mt-16">
      <div className="grid max-h-24">
        <h2 className="card-title mx-auto">New Note</h2>
        <input
          type="text"
          placeholder="Enter Task Here"
          className="input input-bordered w-4/5 max-h-8 mx-auto"
          maxLength={50}
          ref={todoInput}
        />
      </div>
      <div className="w-4/5 self-end flex justify-between mx-auto mb-2">
        <button
          onClick={() => setShow(!show)}
          className="bg-[#F7F7F7] text-[#6C63FF] rounded-sm justify-self-end py-1 px-4 text-md box-content border-[1px] border-[#6C63FF]"
        >
          Cancel
        </button>
        <button
          className="bg-[#6C63FF] text-[#F7F7F7] rounded-sm justify-self-end py-1 px-4 text-md box-content"
          // onClick={addTodo}
          onClick={insertDataToFireStore}
        >
          Apply
        </button>
      </div>
      {/* <button onClick={insertTodo}>sdlfjsdl</button> */}
    </div>
  );
};

export default AddTodo;
