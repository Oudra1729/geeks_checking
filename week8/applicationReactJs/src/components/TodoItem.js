import { useDispatch } from "react-redux";
import { toggleTodo, removeTodo } from "../redux/actions";

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();

  return (
    <li>
      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          cursor: "pointer",
        }}
        onClick={() => dispatch(toggleTodo(todo.id))}
      >
        {todo.text}
      </span>
      <button onClick={() => dispatch(removeTodo(todo.id))}>❌</button>
    </li>
  );
}
