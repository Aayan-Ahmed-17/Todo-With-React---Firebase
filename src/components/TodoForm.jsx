import React, { useState } from "react";
import TodoInput from "./TodoInput";

const TodoForm = ({ onSubmit, initialValue = "", mode = "add", onCancel }) => {
  const [input, setInput] = useState(initialValue);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      alert("Task cannot be empty");
      return;
    }

    await onSubmit(input);
    setInput("");
    setError("");
  };

  return (
    //   <div className="">
    <form
      onSubmit={handleSubmit}
      className="max-w-96 min-h-72 mx-auto grid border-2 border-slate-500 rounded-xl mt-8"
    >
      <div className="grid max-h-24">
        <h2 className="card-title mx-auto">
          {mode === "add" ? "New Todo" : "Edit Todo"}
        </h2>
        <TodoInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter Task Here"
          defaultValue={initialValue}
        />
      </div>
      <div className="w-4/5 self-end flex justify-between mx-auto mb-2">
        <button
          type="button"
          onClick={onCancel}
          className="bg-[#F7F7F7] text-[#6C63FF] rounded-sm py-1 text-md border-[1px] border-[#6C63FF] w-1/4 text-center"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-[#6C63FF] text-[#F7F7F7] rounded-sm py-1 px-4 text-md w-1/4 text-center"
        >
          {mode === "add" ? "Add" : "Save"}
        </button>
      </div>
    </form>
    //   </div>
  );
};

export default TodoForm;
