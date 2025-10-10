import logo from "./logo.svg";
import "./App.css";
import Form from "./components/form";
import Display from "./components/display";
function App() {
  return (
    <div className="flex justify-center items-center h-screen gap-4">
      <div className="w-[600px] flex items-center justify-center gap-4 mx-auto">
        <Form />
        <Display />
      </div>
    </div>
  );
}

export default App;
