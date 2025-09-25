import { TodoList } from "./todo.js";

const todo = new TodoList();

todo.addTask("Learn Node.js");
todo.addTask("Build a project");
todo.completeTask(0);

console.log("All tasks:", todo.listTasks());
