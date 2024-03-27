// TaskForm.tsx

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../../store/taskSlice";
import { toast } from "react-toastify";
import "./TaskForm.scss";
type Props = {
  setShowTaskForm: Dispatch<SetStateAction<boolean>>;
  isUpdate: boolean;
  oldInputs: any;
};
const TaskForm = ({ setShowTaskForm, isUpdate, oldInputs }: Props) => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    id: 0,
    title: "",
    description: "",
    status: "Pending",
    assignee: "",
    priority: "P0",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.title || !inputs.description || !inputs.assignee) {
      console.log(inputs);
      toast.error("You need to provide all fields related to Task");
    } else {
      if (isUpdate) {
        if (inputs.status == "Completed") {
          dispatch(
            updateTask({
              ...oldInputs,
              priority: inputs.priority,
              status: inputs.status,
              endDate: new Date().getTime(),
            })
          );
        } else {
          dispatch(
            updateTask({
              ...oldInputs,
              priority: inputs.priority,
              status: inputs.status,
            })
          );
        }
        toast.success("Task Updated");
      } else {
        dispatch(
          addTask({
            ...inputs,
            id: Math.floor(Math.random() * 1000),
            startDate: new Date().getTime(),
          })
        );
        toast.success("Task Created");
      }
      setInputs({
        id: 0,
        title: "",
        description: "",
        status: "Pending",
        assignee: "",
        priority: "P0",
      });
    }
  };

  const handleChange = (e: any) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (isUpdate) {
      setInputs(oldInputs);
    }
  }, [isUpdate]);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <button
          onClick={() => setShowTaskForm(false)}
          type="button"
          className="closeBtn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="svg-icon"
            style={{
              width: "1em",
              height: "1em",
              verticalAlign: "middle",
              fill: "currentColor",
              // overflow: "hidden",
            }}
            viewBox="0 0 1024 1024"
            version="1.1"
          >
            <path d="M810.65984 170.65984q18.3296 0 30.49472 12.16512t12.16512 30.49472q0 18.00192-12.32896 30.33088l-268.67712 268.32896 268.67712 268.32896q12.32896 12.32896 12.32896 30.33088 0 18.3296-12.16512 30.49472t-30.49472 12.16512q-18.00192 0-30.33088-12.32896l-268.32896-268.67712-268.32896 268.67712q-12.32896 12.32896-30.33088 12.32896-18.3296 0-30.49472-12.16512t-12.16512-30.49472q0-18.00192 12.32896-30.33088l268.67712-268.32896-268.67712-268.32896q-12.32896-12.32896-12.32896-30.33088 0-18.3296 12.16512-30.49472t30.49472-12.16512q18.00192 0 30.33088 12.32896l268.32896 268.67712 268.32896-268.67712q12.32896-12.32896 30.33088-12.32896z" />
          </svg>
        </button>
        <div className="form-row">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter task title"
            name="title"
            value={inputs.title}
            onChange={handleChange}
            disabled={isUpdate}
            className={isUpdate ? "cursor-not-allowed" : ""}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Enter task description"
            name={"description"}
            onChange={handleChange}
            value={inputs.description}
            disabled={isUpdate}
            className={isUpdate ? "cursor-not-allowed" : ""}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="assignee">Assignee</label>
          <input
            id="assignee"
            type="text"
            placeholder="Enter task assignee"
            name={"assignee"}
            disabled={isUpdate}
            className={isUpdate ? "cursor-not-allowed" : ""}
            value={inputs.assignee}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name={"priority"}
            onChange={handleChange}
            value={inputs.priority}
            required
          >
            <option value="">Select Priority</option>
            <option value="P0">P0</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="priority">Priority</label>
          <select
            id="status"
            name={"status"}
            onChange={handleChange}
            required
            value={inputs.status}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Deployed">Deployed</option>
            <option value="Deferred">Deferred</option>
          </select>
        </div>
        <div className=" w-full flex items-end justify-end">
          <button className="submitBtn" type="submit">
            {isUpdate ? "Update" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
