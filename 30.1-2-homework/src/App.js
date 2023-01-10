import React, { useState } from "react";
import Name from "./Name";
import FavoriteAnimal from "./FavoriteAnimal";
import Display from "./Display";

function App() {
  const [animal, setAnimal] = useState("");

  function onAnimalChange(e) {
    setAnimal(e.target.value);
  }

  return (
    <form>
      <Name />
      <FavoriteAnimal animal={animal} onAnimalChange={onAnimalChange} />
      <Display animal={animal} />
    </form>
  );
}

export default App;
