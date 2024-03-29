import { ToastContainer } from "react-toastify";
import "./App.scss";
import TaskForm from "./components/taskForm/TaskForm";
import TaskList from "./components/TaskList";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header/Header";
import { useEffect, useState } from "react";

function App() {
  //State for toggle The Task form
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    // Event listener on refresh state will gone
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      console.log("hello");
      event.returnValue =
        "Are you sure you want to leave? Your changes may not be saved.";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <Header setShowTaskForm={setShowTaskForm} />
      {showTaskForm && (
        <TaskForm
          oldInputs={"null"}
          isUpdate={false}
          setShowTaskForm={setShowTaskForm}
        />
      )}
      <TaskList />
      <ToastContainer />
    </>
  );
}

export default App;
