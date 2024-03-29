import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Alert,
} from "react-native";
import TaskForm from "./TaskForm";
import { useDispatch } from "react-redux";
import { deleteTask } from "../store/taskSlice";

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            dispatch(deleteTask(task.id));
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };
  const [showTaskForm, setShowTaskForm] = useState(false);

  const getDate = (timeInML) => {
    if (timeInML) {
      let date = new Date(timeInML);
      date =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      return date;
    } else {
      return "Pending";
    }
  };

  let startDate = getDate(task.startDate);
  let endDate = getDate(task.endDate);

  let statusColor = "";
  switch (task.status) {
    case "Pending":
      statusColor = "#FFD700";
      break;
    case "In Progress":
      statusColor = "#4169E1";
      break;
    case "Completed":
      statusColor = "#008000";
      break;
    case "Deployed":
      statusColor = "#800080";
      break;
    case "Deferred":
      statusColor = "#808080";
      break;
    default:
      statusColor = "#808080";
  }

  return (
    <View style={styles.container}>
      <Modal visible={showTaskForm}>
        <TaskForm
          isUpdate={true}
          oldInputs={task}
          setShowTaskForm={setShowTaskForm}
        />
      </Modal>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={[styles.priority, { borderColor: statusColor }]}>
            <Text style={[styles.priorityText, { color: statusColor }]}>
              {task.priority}
            </Text>
          </View>
          <Text style={styles.title}>{task.title}</Text>
          <View style={styles.actions}>
            {task.status !== "Completed" && (
              <TouchableOpacity
                onPress={() => setShowTaskForm(true)}
                style={styles.iconButton}
              >
                <Image
                  source={{
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvR2-4_ItqXsoljkJnPpeL4wuClUuKVN0o5bOIXf49oA&s",
                  }}
                  style={styles.image}
                />
              </TouchableOpacity>
            )}
            {task.status !== "Completed" && (
              <TouchableOpacity
                onPress={handleDelete}
                style={styles.iconButton}
              >
                <Image
                  source={{
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqt5UrL87lhxtfxCLli8OWGPy0jtfG803hNA&usqp=CAU",
                  }}
                  style={styles.image}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.details}>
          <Text>{task.description}</Text>
          <View style={styles.info}>
            <View style={styles.infoItem}>
              <Text>{startDate}</Text>
              <Text>TO</Text>
              <Text>{endDate}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text>Assignee:</Text>
              <Text style={{ fontWeight: 900 }}>{task.assignee}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text>Status:</Text>
              <Text>{task.status}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: 320,
  },
  image: { width: 30, height: 30, resizeMode: "contain" },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  priority: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderRadius: 50,
    padding: 5,
  },
  priorityText: {
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
  },
  iconButton: {
    padding: 5,
    marginLeft: 5,
  },
  details: {
    padding: 10,
  },
  info: {
    marginTop: 10,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default TaskCard;
