// import React from 'react'

const TodoInput = ({ value, onChange, placeholder }) => (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input input-bordered w-4/5 max-h-8 mx-auto"
      maxLength={50}
    />
  );

export default TodoInput
