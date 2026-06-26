import { useState } from "react";

function Home() {

  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div className="welcome">

      <h1>Welcome to StudentHub 🚀</h1>

      <p>
        A platform for students to share notes,
        events, and announcements.
      </p>

      <button onClick={handleClick}>
        Create Your First Post
      </button>

      <p>
        Button clicked: {count} times
      </p>

    </div>
  );
}

export default Home;