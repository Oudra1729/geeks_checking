import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>📝 Redux Todo List</h1>
      <TodoInput />
      <TodoList />
    </div>
  );
}

export default App;
