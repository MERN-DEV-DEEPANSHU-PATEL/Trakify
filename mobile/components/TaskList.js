import React, { useCallback, useEffect, useState } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import TaskCard from "./TaskCard";
import { useSelector } from "react-redux";
import { selectTasks } from "../store/taskSlice";
import DropdownComponent from "./ui/DropDwon";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export const priority = [
  { label: "Priority", value: "" },
  { label: "P0", value: "P0" },
  { label: "P1", value: "P1" },
  { label: "P2", value: "P2" },
];

const sortByOption = [
  { label: "Sort By", value: "" },
  { label: "Priority", value: "Priority" },
  { label: "Start Date", value: "Start Date" },
  { label: "End Date", value: "End Date" },
];

const TaskList = () => {
  const tasks = useSelector(selectTasks);
  const [filteredTasks, setFilteredTasks] = useState(tasks); // STATE  FOR FILTERED TASK
  const [filterOptions, setFilterOptions] = useState({
    byAssigneeName: "",
    byPriority: "",
    startDateFrom: "",
    startDateTo: "",
  });
  const [sortBy, setSortBy] = useState("");
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

  // Memoize callback function for optimization
  const handleChange = useCallback((name, value) => {
    if (name === "sortBy") {
      setSortBy(value);
    } else {
      setFilterOptions((prev) => ({ ...prev, [name]: value }));
    }
  });

  // Memoize callback function for optimization
  const updateFilters = useCallback(() => {
    const filtered = tasks.filter((task) => {
      const assigneeMatch = task.assignee
        .toLowerCase()
        .includes(filterOptions.byAssigneeName.toLowerCase());
      const priorityMatch = filterOptions.byPriority
        ? task.priority === filterOptions.byPriority
        : true;
      const startDateMatch =
        filterOptions.startDateFrom && filterOptions.startDateTo
          ? new Date(task.startDate) >= new Date(filterOptions.startDateFrom) ||
            new Date(task.startDate) <= new Date(filterOptions.startDateTo)
          : true;
      return assigneeMatch && priorityMatch && startDateMatch;
    });
    setFilteredTasks(filtered);
  }, [tasks, filterOptions]);

  useEffect(() => {
    updateFilters();
  }, [tasks, filterOptions]);

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
  }, [sortBy]);

  // color by status
  const getColor = (status) => {
    switch (status) {
      case "Pending":
        return "rgba(255, 215, 0, 0.7)";
      case "In Progress":
        return "rgba(65, 105, 225, 0.7)";
      case "Completed":
        return "rgba(0, 128, 0, 0.7)";
      case "Deployed":
        return "rgba(128, 0, 128, 0.7)";
      case "Deferred":
        return "rgba(128, 128, 128, 0.7)";
      default:
        return "rgba(128, 128, 128, 0.7)";
    }
  };

  const groupedTasks = {};
  filteredTasks.forEach((task) => {
    if (!groupedTasks[task.status]) {
      groupedTasks[task.status] = [];
    }
    //Create an object to arrange task by Status wise
    groupedTasks[task.status].push(<TaskCard key={task.id} task={task} />);
  });

  const showStartDatePicker = useCallback(() => {
    setStartDatePickerVisibility(true);
  });

  const hideStartDatePicker = useCallback(() => {
    setStartDatePickerVisibility(false);
  });

  const handleStartDateConfirm = useCallback((date) => {
    handleChange("startDateFrom", date);
    hideStartDatePicker();
  });

  const showEndDatePicker = useCallback(() => {
    setEndDatePickerVisibility(true);
  });

  const hideEndDatePicker = useCallback(() => {
    setEndDatePickerVisibility(false);
  });

  const handleEndDateConfirm = useCallback((date) => {
    handleChange("startDateTo", date);
    hideEndDatePicker();
  });

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.filterText}>Filter</Text>
          <View
            style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", gap: 5 }}
          >
            <TextInput
              style={styles.input}
              placeholder="Assignee Name"
              value={filterOptions.byAssigneeName}
              onChangeText={(value) => handleChange("byAssigneeName", value)}
            />
            <View style={styles.dateContainer}>
              <TouchableOpacity onPress={showStartDatePicker}>
                <Text style={styles.dateInput}>
                  {filterOptions.startDateFrom
                    ? filterOptions.startDateFrom?.toLocaleDateString()
                    : "Start date"}
                </Text>
              </TouchableOpacity>
              <Text style={styles.dateSeparator}>to</Text>
              <TouchableOpacity onPress={showEndDatePicker}>
                <Text style={styles.dateInput}>
                  {filterOptions.startDateTo
                    ? filterOptions.startDateTo?.toLocaleDateString()
                    : "End date"}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isStartDatePickerVisible}
                mode="date"
                onConfirm={handleStartDateConfirm}
                onCancel={hideStartDatePicker}
              />
              <DateTimePickerModal
                isVisible={isEndDatePickerVisible}
                mode="date"
                onConfirm={handleEndDateConfirm}
                onCancel={hideEndDatePicker}
              />
            </View>
            <DropdownComponent
              data={priority}
              handleChange={handleChange}
              name="byPriority"
              selectWidth={120}
            />
            <DropdownComponent
              data={sortByOption}
              handleChange={handleChange}
              name="sortBy"
              selectWidth={120}
            />
          </View>
        </View>
      </View>
      <ScrollView horizontal style={styles.taskList}>
        {/* Mapping Task by Staus Wise  */}
        {Object.entries(groupedTasks).map(([status, tasks]) => {
          const bg = getColor(status);
          return (
            <ScrollView
              key={status}
              style={[styles.taskGroup, { backgroundColor: bg }]}
            >
              <Text style={styles.statusText}>{status}</Text>
              <ScrollView style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {tasks}
              </ScrollView>
            </ScrollView>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: "column",
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  filterText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  formContainer: {
    margin: "auto",
    flexDirection: "row",
    gap: 15,
  },
  input: {
    height: 25,
    borderRadius: 15,
    borderColor: "gray",
    borderWidth: 1,
    width: 120,
    paddingHorizontal: 10,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  dateSeparator: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    // backgroundColor: "blue",
  },
  sortText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  sortInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  taskList: {
    flex: 80,
    gap: 20,
    padding: 10,
  },
  taskGroup: {
    gap: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
    color: "white",
    borderRadius: 10,
  },
});

export default TaskList;
