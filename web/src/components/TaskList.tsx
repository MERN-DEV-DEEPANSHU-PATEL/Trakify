import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TaskCard from "./TaskCard";
import { selectTasks } from "../store/taskSlice";

const TaskList: React.FC = () => {
  const tasks = useSelector(selectTasks);
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [filterOptions, setFilterOptions] = useState({
    byAssigneeName: "",
    byPriority: "",
    startDateFrom: "",
    startDateTo: "",
  });
  const [sortBy, setSortBy] = useState("");

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    if (name === "sortBy") {
      setSortBy(value);
    } else {
      setFilterOptions((prev) => ({ ...prev, [name]: value }));
    }
  };

  const updateFilters = useCallback(() => {
    const filtered = tasks.filter((task) => {
      const assigneeMatch = task.assignee
        .toLocaleLowerCase()
        .includes(filterOptions.byAssigneeName);
      const priorityMatch = filterOptions.byPriority
        ? task.priority === filterOptions.byPriority
        : true;
      const startDateMatch =
        filterOptions.startDateFrom && filterOptions.startDateTo
          ? new Date(task.startDate) >= new Date(filterOptions.startDateFrom) &&
            new Date(task.startDate) <= new Date(filterOptions.startDateTo)
          : true;
      return assigneeMatch && priorityMatch && startDateMatch;
    });
    setFilteredTasks(filtered);
  }, [tasks, filterOptions]);

  useEffect(() => {
    updateFilters();
  }, [tasks, filterOptions, updateFilters]);

  useEffect(() => {
    if (sortBy) {
      const sorted = [...filteredTasks];
      sorted.sort((a, b) => {
        if (sortBy === "Priority") {
          return a.priority.localeCompare(b.priority);
        } else if (sortBy === "StartDate") {
          return (
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          );
        } else if (sortBy === "EndDate") {
          return (
            new Date(b.startDate || "").getTime() -
            new Date(a.startDate || "").getTime()
          );
        }
        return 0;
      });
      setFilteredTasks(sorted);
    }
  }, [sortBy, filteredTasks]);

  // Group tasks by status
  const groupedTasks: { [status: string]: JSX.Element[] } = {};
  filteredTasks.forEach((task) => {
    if (!groupedTasks[task.status]) {
      groupedTasks[task.status] = [];
    }
    groupedTasks[task.status].push(<TaskCard key={task.id} task={task} />);
  });

  const getColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500";
      case "In Progress":
        return "bg-blue-500";
      case "Completed":
        return "bg-green-500";
      case "Deployed":
        return "bg-purple-500";
      case "Deferred":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="w-full">
      <div className="flex gap-5 flex-col w-full max-w-[1000px] mx-auto px-24 py-14">
        <div className="flex gap-5  items-center ">
          <span className="text-4xl text-bold">Filter</span>
          <form className="flex gap-4 justify-evenly w-full flex-wrap lg:flex-nowrap">
            <input
              type="text"
              id="byAssigneeName"
              name="byAssigneeName"
              onChange={handleChange}
              value={filterOptions.byAssigneeName}
              className="h-[4em] max-w-[20em] bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Assignee Name"
            />
            <select
              id="byPriority"
              name="byPriority"
              onChange={handleChange}
              value={filterOptions.byPriority}
              className="h-[4em] max-w-[20em] bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Priority</option>
              <option value="P0">P0</option>
              <option value="P1">P1</option>
              <option value="P2">P2</option>
            </select>
            <div className="flex gap-5 w-full justify-center items-center text-3xl">
              <input
                id="startDateFrom"
                type="date"
                className=" max-w-[20em] border p-5 rounded-lg"
                placeholder="Enter task assignee"
                name="startDateFrom"
                onChange={handleChange}
                value={filterOptions.startDateFrom}
              />
              to
              <input
                id="startDateTo"
                type="date"
                className=" max-w-[20em] border p-5 rounded-lg"
                placeholder="Enter task assignee"
                name="startDateTo"
                onChange={handleChange}
                value={filterOptions.startDateTo}
              />
            </div>
          </form>
        </div>
        <div className="flex gap-5 lg:w-[80%] items-center">
          <span className="text-4xl text-bold">Sort by</span>
          <select
            className={`w-[20em] h-[4em] max-w-[20em] bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
              !!filterOptions.byPriority && "cursor-not-allowed"
            }`}
            id="sortBy"
            name="sortBy"
            onChange={handleChange}
            value={sortBy}
          >
            <option value="">Sort By</option>
            <option value="Priority" disabled={!!filterOptions.byPriority}>
              Priority
            </option>
            <option value="StartDate">Start Date</option>
            <option value="EndDate">End Date</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg-custom-grid gap-10 lg:gap-4 mx-5 overflow-x-auto">
        {Object.entries(groupedTasks).map(([status, tasks]) => {
          const bg = getColor(status);
          return (
            <div
              key={status}
              className="col-span-1 my-2 ml-2 shadow-custom rounded-lg border-black"
            >
              <h2
                className={`text-4xl font-bold m-1 p-5 text-center text-white rounded-t-lg ${bg}`}
              >
                {status}
              </h2>
              <div className="w-full overflow-x-auto flex lg:flex-col">
                {tasks}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskList;
