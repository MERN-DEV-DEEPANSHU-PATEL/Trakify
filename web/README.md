# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

```code

interface Task {
    title: string;
    description: string;
    startDate: Date;
    endDate?: Date;
    status: 'Pending' | 'In Progress' | 'Completed' | 'Deployed' | 'Deferred';
    assignee: string;
    priority: 'P0' | 'P1' | 'P2';
}

const tasks: Task[] = [];

// Function to add a new task
const addTask = (newTask: Task) => {
    tasks.push(newTask);
};

// Function to delete a task by index
const deleteTask = (index: number) => {
    if (tasks[index].status !== 'Completed') {
        tasks.splice(index, 1);
    }
};

// Function to sort tasks by priority
const sortTasksByPriority = () => {
    tasks.sort((a, b) => a.priority.localeCompare(b.priority));
};

// Function to sort tasks by start date
const sortTasksByStartDate = () => {
    tasks.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
};

// Function to sort tasks by end date
const sortTasksByEndDate = () => {
    tasks.sort((a, b) => (a.endDate || new Date()).getTime() - (b.endDate || new Date()).getTime());
};

// Function to filter tasks based on criteria
const filterTasks = (filters: { assignee?: string, priority?: string, startDateFrom?: Date, startDateTo?: Date }) => {
    return tasks.filter(task =>
        (!filters.assignee || task.assignee === filters.assignee) &&
        (!filters.priority || task.priority === filters.priority) &&
        (!filters.startDateFrom || task.startDate >= filters.startDateFrom) &&
        (!filters.startDateTo || task.startDate <= filters.startDateTo)
    );
};

// Example usage
const newTask: Task = {
    title: 'Implement Feature X',
    description: 'Add feature X to the project',
    startDate: new Date(),
    status: 'Pending',
    assignee: 'John Doe',
    priority: 'P1'
};

addTask(newTask);
sortTasksByPriority();
const filteredTasks = filterTasks({ assignee: 'John Doe', priority: 'P1' });


```
