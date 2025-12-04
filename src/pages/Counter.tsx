import { useState } from "react";

export default function Counter() {
  const [counter, setCounter] = useState(0);

  function increment() {
    setCounter((prev) => prev + 1);
  }

  return (
    <button onClick={increment} style={{ padding: "10px 20px" }}>
      count is {counter}
    </button>
  );
}
