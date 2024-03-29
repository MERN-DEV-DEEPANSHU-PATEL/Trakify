import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AnimateBtn from "./components/ui/AnimateBtn";
import { useState } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Toast from "react-native-toast-message";

export default function App() {
  const [showTaskForm, setShowTaskForm] = useState(false);
  return (
    <Provider store={store}>
      {/* TO SHOW TASK FORM */}
      <View>
        <Modal visible={showTaskForm}>
          <TaskForm setShowTaskForm={setShowTaskForm} />
        </Modal>
      </View>

      <View style={styles.container}>
        {/* HEADER  */}
        <View style={styles.nav}>
          <Text style={styles.logo}>Trakify</Text>
          <TouchableOpacity style={styles.btn}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
              }}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
        {/* CONTAINER FOR TaskList */}
        <View style={styles.main}>
          <TaskList />
        </View>
        <View style={styles.footer}>
          <AnimateBtn text={"Add Task"} onPress={() => setShowTaskForm(true)} />
        </View>
      </View>
      <Toast />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  nav: {
    flex: 10,
    padding: 50,
    paddingBottom: 0,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  main: {
    flex: 100,
  },
  footer: {
    flex: 10,
    justifyContent: "center",
    textAlign: "center",
    flexShrink: 0,
  },
  logo: {
    fontSize: 30,
    // fontFamily: "FjallaOne-Regular",
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#f5478a",
  },
});
