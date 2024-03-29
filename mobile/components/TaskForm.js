import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../store/taskSlice";
import Toast from "react-native-toast-message";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DropdownComponent from "./ui/DropDwon";
import { priority } from "./TaskList";

const status = [
  { label: "Pending", value: "Pending" },
  { label: "In Progress", value: "In Progress" },
  { label: "Completed", value: "Completed" },
  { label: "Deployed", value: "Deployed" },
  { label: "Deferred", value: "Deferred" },
];

const TaskForm = ({ setShowTaskForm, isUpdate, oldInputs }) => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    id: 0,
    title: "",
    description: "",
    status: "Pending",
    assignee: "",
    priority: "P0",
  });

  const handleSubmit = () => {
    if (
      !inputs.title ||
      !inputs.description ||
      !inputs.assignee ||
      !inputs.priority ||
      !inputs.status
    ) {
      Toast.show({
        type: "error",
        text1: "Input can not be blank",
      });
    } else {
      if (isUpdate) {
        const updatedTask = {
          ...oldInputs,
          priority: inputs.priority,
          status: inputs.status,
          endDate: new Date().getTime(),
        };
        dispatch(updateTask(updatedTask));
        Toast.show({
          type: "success",
          text1: "Task Updated",
        });
      } else {
        const newTask = {
          ...inputs,
          id: Math.floor(Math.random() * 1000),
          startDate: new Date().getTime(),
        };
        dispatch(addTask(newTask));
        Toast.show({
          type: "success",
          text1: "Task Created",
        });
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

  useEffect(() => {
    if (isUpdate) {
      setInputs(oldInputs);
    }
  }, [isUpdate]);

  const handleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <View style={styles.formContainer}>
      <TouchableOpacity
        onPress={() => setShowTaskForm(false)}
        style={styles.closeBtn}
      >
        <Text style={styles.closeBtnText}>X</Text>
      </TouchableOpacity>
      <View style={styles.form}>
        <View style={styles.formRow}>
          <Text>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter task title"
            value={inputs.title}
            onChangeText={(value) => handleChange("title", value)}
            editable={!isUpdate}
            required
          />
        </View>
        <View style={styles.formRow}>
          <Text>Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter task description"
            value={inputs.description}
            onChangeText={(value) => handleChange("description", value)}
            editable={!isUpdate}
            multiline
            required
          />
        </View>
        <View style={styles.formRow}>
          <Text>Assignee</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter task assignee"
            value={inputs.assignee}
            onChangeText={(value) => handleChange("assignee", value)}
            editable={!isUpdate}
            required
          />
        </View>
        <View style={styles.formRow}>
          <Text>Priority</Text>
          <DropdownComponent
            data={priority}
            handleChange={handleChange}
            name="priority"
          />
        </View>
        <View style={styles.formRow}>
          <Text>Status</Text>
          <DropdownComponent
            data={status}
            handleChange={handleChange}
            name="status"
          />
        </View>
        <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
          <Text>{isUpdate ? "Update" : "Add Task"}</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    position: "absolute",
    top: 20,
    height: "auto",
    width: "100%",
    zIndex: 0,
    backgroundColor: "#fff",
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    zIndex: 0,
    right: 20,
  },
  closeBtnText: { fontSize: 30 },
  form: {
    backgroundColor: "#fff",
  },
  formRow: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  submitBtn: {
    backgroundColor: "cyan",
    borderRadius: 5,
    fontWeight: 900,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TaskForm;
