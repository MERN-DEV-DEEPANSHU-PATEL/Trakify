// TaskCard.tsx

import { useState } from "react";
import TaskForm from "./taskForm/TaskForm";
import { useDispatch } from "react-redux";
import { deleteTask } from "../store/taskSlice";

interface props {
  task: {
    id: number;
    title: string;
    description: string;
    startDate: number;
    endDate?: number;
    status: "Pending" | "In Progress" | "Completed" | "Deployed" | "Deferred";
    assignee: string;
    priority: "P0" | "P1" | "P2";
  };
}

const TaskCard = ({ task }: props) => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation alert

  const dispatch = useDispatch();

  const handleDelete = () => {
    setShowConfirmation(true); // Show confirmation alert
  };

  const confirmDelete = () => {
    dispatch(deleteTask(task.id));
    setShowConfirmation(false);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };
  let statusColor = "";
  switch (task.status) {
    case "Pending":
      statusColor = "yellow";
      break;
    case "In Progress":
      statusColor = "blue";
      break;
    case "Completed":
      statusColor = "green";
      break;
    case "Deployed":
      statusColor = "purple";
      break;
    case "Deferred":
      statusColor = "gray";
      break;
    default:
      statusColor = "gray";
  }

  const getDate = (timeInML: number | undefined) => {
    if (timeInML) {
      let date: number | string | Date = new Date(timeInML);
      date =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      return date;
    } else {
      return "Pending";
    }
  };
  let startDate: number | string | Date = getDate(task.startDate);
  let endDate: number | string | Date = getDate(task.endDate);

  return (
    <>
      {showTaskForm && (
        <TaskForm
          isUpdate={true}
          oldInputs={task}
          setShowTaskForm={setShowTaskForm}
        />
      )}
      {showTaskForm && (
        <TaskForm
          isUpdate={true}
          oldInputs={task}
          setShowTaskForm={setShowTaskForm}
        />
      )}

      {/* Confirmation alert */}
      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center space-y-4">
            <p className="text-2xl font-bold">Confirm Deletion</p>
            <p className="text-xl">{`Are you sure you want to delete task "${task.title}"?`}</p>
            <div className="flex space-x-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring focus:ring-red-200"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors focus:outline-none focus:ring focus:ring-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className="rounded-lg mx-1 lg:mx-auto border card text-card-foreground shadow-sm lg:w-[95%]  basis-[40em] lg:basis-auto flex-shrink-0"
        data-v0-t="card"
      >
        <div className=" space-y-1.5 p-6 flex  items-center justify-between">
          <div className="flex items-center gap-2">
            <ColoredCircle text={task.priority} fill={statusColor} />
            <div className="text-3xl font-medium">{task.title}</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTaskForm(true)}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-3xl font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:accent hover:text-accent-foreground h-10 w-10"
            >
              <PencilIcon />
            </button>
            {task.status !== "Completed" && (
              <button
                onClick={handleDelete}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-3xl font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:accent hover:text-accent-foreground h-10 w-10"
              >
                <TrashIcon />
              </button>
            )}
          </div>
        </div>
        <div className="p-6 flex flex-col gap-1.5">
          <div className="text-2xl">
            <p>{task.description}</p>
          </div>
          <div className="grid grid-cols-2 items-center text-xs gap-1">
            <span className="flex items-center gap-1">
              <CalendarIcon />
              <span className="text-gray dark:text-gray-400 text-2xl">
                {startDate + " - " + endDate}
              </span>
            </span>
            <span className="flex items-center gap-1">
              <UserIcon />
              <span className="text-gray dark:text-gray-400 text-2xl">
                {task.assignee}
              </span>
            </span>
            <span className="flex items-center gap-1">
              <FlagIcon />
              <span className="text-gray dark:text-gray-400 text-2xl">
                {task.status}
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

// SVG ICONS ----------

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="3.5em"
      height="3.5em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function ColoredCircle(props: any) {
  return (
    <button
      className={`w-10 font-bold cursor-default h-10 rounded-full ${props.fill}`}
    >
      {props.text}
    </button>
  );
}

function FlagIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="3.5em"
      height="3.5em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}

function PencilIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="3.5em"
      height="3.5em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

function TrashIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="3.5em"
      height="3.5em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="3.5em"
      height="3.5em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default TaskCard;
