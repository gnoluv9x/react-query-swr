import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import ListUsers from "./ListUsers";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(1);

  console.log("Debug_here rerender APP");

  return (
    <QueryClientProvider client={queryClient}>
      <ListUsers count={count} />
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </QueryClientProvider>
  );
}

export default App;
