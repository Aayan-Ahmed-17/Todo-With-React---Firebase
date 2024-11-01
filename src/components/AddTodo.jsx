import React from "react";

const AddTodo = () => {
  return (
    <div className="max-w-96 min-h-72 mx-auto grid border-2 border-slate-500 rounded-xl mt-16">
      <div className="grid max-h-24">
        <h2 className="card-title mx-auto">New Note</h2>
        <input
          type="text"
          placeholder="Enter Task Here"
          className="input input-bordered w-4/5 max-h-8 mx-auto"
        />
      </div>
      <div className="w-4/5 self-end flex justify-between mx-auto mb-2">
        <button className="bg-[#F7F7F7] text-[#6C63FF] rounded-sm justify-self-end py-1 px-4 text-md box-content border-[1px] border-[#6C63FF]">Cancel</button>
        <button className="bg-[#6C63FF] text-[#F7F7F7] rounded-sm justify-self-end py-1 px-4 text-md box-content">Apply</button>
      </div>
    </div>
  );
};

export default AddTodo;
