import React, { useState } from "react";

function Name() {
  const [name, setName] = useState("");

  function onNameChange(e) {
    setName(e.target.value);
  }

  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={onNameChange} />
    </div>
  );
}

export default Name;
